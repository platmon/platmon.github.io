#!/usr/bin/env bash
# Add published platmon releases to the APT repository and regenerate its index.
#
#   apt/tools/update.sh [--unsigned] [TAG...]
#
# Each TAG must be a published (not draft, not pre-release) GitHub release of
# platmon/platmon, with either one Architecture: all .deb (1.3.0 and earlier) or
# one .deb for each of amd64 and arm64 (from 1.4.0). Each .deb must match the
# release's SHA256SUMS and either carry a build provenance attestation from the
# release workflow for that tag, or be listed in apt/legacy-sha256.txt (releases
# made before attestations existed).
# A file already in the pool is never replaced.
#
# Without --unsigned, the secret key of apt/platmon-archive-keyring.gpg must be
# in the GnuPG keyring; InRelease and Release.gpg are signed and checked with it.
# Needs gh, jq, dpkg-deb, apt-ftparchive (apt-utils), gpg and gpgv.
set -euo pipefail

repo=platmon/platmon
suite=stable
arches="all amd64 arm64 armhf"
root=$(cd "$(dirname "$0")/.." && pwd)
pool=pool/main/p/platmon
keyring=$root/platmon-archive-keyring.gpg

sign=1
if [ "${1:-}" = --unsigned ]; then
    sign=0
    shift
fi

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fail() {
    echo "error: $*" >&2
    exit 1
}

add_release() {
    local tag=$1 expected dir found unpublished
    if [[ $tag =~ ^v([0-9]+\.[0-9]+\.[0-9]+)(-([1-9][0-9]*))?$ ]]; then
        expected=${BASH_REMATCH[1]}-${BASH_REMATCH[3]:-1}
    else
        fail "$tag is not a release tag"
    fi
    unpublished=$(gh release view "$tag" -R "$repo" --json isDraft,isPrerelease -q '.isDraft or .isPrerelease') ||
        fail "$tag is not a release of $repo"
    [ "$unpublished" = false ] || fail "$tag is a draft or pre-release"

    dir=$work/$tag
    gh release download "$tag" -R "$repo" -D "$dir" -p '*.deb' -p SHA256SUMS
    found=$(cd "$dir" && find . -maxdepth 1 -name '*.deb' -printf '%f\n' | sort | tr '\n' ' ')
    if [ "$found" = "platmon_${expected}_all.deb " ]; then
        add_deb "$tag" "$dir" all
    elif [ "$found" = "platmon_${expected}_amd64.deb platmon_${expected}_arm64.deb " ]; then
        add_deb "$tag" "$dir" amd64
        add_deb "$tag" "$dir" arm64
    else
        fail "$tag has [${found% }]; expected platmon_${expected}_all.deb, or _amd64.deb and _arm64.deb"
    fi
}

# The release's .deb for one architecture; $expected is the caller's version.
add_deb() {
    local tag=$1 dir=$2 arch=$3 deb name sum
    name=platmon_${expected}_$arch.deb
    deb=$dir/$name
    grep -q "  $name\$" "$dir/SHA256SUMS" || fail "$name is not in $tag's SHA256SUMS"
    (cd "$dir" && grep "  $name\$" SHA256SUMS | sha256sum -c --strict --quiet -) || fail "$name does not match SHA256SUMS"
    [ "$(dpkg-deb -f "$deb" Package)" = platmon ] || fail "$name is not the platmon package"
    [ "$(dpkg-deb -f "$deb" Version)" = "$expected" ] || fail "$name has the wrong package version"
    [ "$(dpkg-deb -f "$deb" Architecture)" = "$arch" ] || fail "$name is not Architecture: $arch"

    sum=$(sha256sum "$deb" | cut -d' ' -f1)
    if grep -qx "$sum  $name" "$root/legacy-sha256.txt"; then
        echo "$name: matches legacy-sha256.txt"
    else
        gh attestation verify "$deb" -R "$repo" \
            --signer-workflow "$repo/.github/workflows/release.yml" \
            --source-ref "refs/tags/$tag" > /dev/null || fail "$name has no valid provenance attestation"
        echo "$name: provenance attestation verified"
    fi

    mkdir -p "$root/$pool"
    if [ -e "$root/$pool/$name" ]; then
        cmp -s "$deb" "$root/$pool/$name" || fail "$pool/$name already exists with different content"
        echo "$name: already in the pool"
    else
        cp "$deb" "$root/$pool/$name"
        echo "$name: added"
    fi
}

for tag in "$@"; do
    add_release "$tag"
done

# Regenerate the index from the pool. Each architecture's index lists its own
# packages and the Architecture: all ones (Debian's layout; an armhf host sees
# only the latter, 1.3.0 and earlier); binary-all lists the Architecture: all ones.
cd "$root"
dist=dists/$suite
rm -rf "$dist"
# APT verifies with SHA256; MD5 and SHA1 are left out of both indexes.
hashes=(-o APT::FTPArchive::MD5=false -o APT::FTPArchive::SHA1=false)
for arch in $arches; do
    mkdir -p "$dist/main/binary-$arch"
    # -a ARCH takes the pool's _ARCH.deb and _all.deb files.
    apt-ftparchive "${hashes[@]}" -a "$arch" packages pool > "$dist/main/binary-$arch/Packages"
    gzip -9 -n -k "$dist/main/binary-$arch/Packages"
done
apt-ftparchive "${hashes[@]}" \
    -o APT::FTPArchive::Release::Origin=platmon \
    -o APT::FTPArchive::Release::Label=platmon \
    -o APT::FTPArchive::Release::Suite="$suite" \
    -o APT::FTPArchive::Release::Codename="$suite" \
    -o APT::FTPArchive::Release::Architectures="$arches" \
    -o APT::FTPArchive::Release::Components=main \
    -o APT::FTPArchive::Release::Description="platmon packages from GitHub releases" \
    release "$dist" > "$work/Release"
mv "$work/Release" "$dist/Release"

if [ "$sign" = 1 ]; then
    fingerprint=$(gpg --show-keys --with-colons "$keyring" | awk -F: '$1 == "fpr" { print $10; exit }')
    [ -n "$fingerprint" ] || fail "cannot read $keyring"
    gpg --batch --list-secret-keys "$fingerprint" > /dev/null 2>&1 || fail "the secret key $fingerprint is not available"
    gpg --batch --yes --digest-algo SHA512 --local-user "$fingerprint" --clearsign -o "$dist/InRelease" "$dist/Release"
    gpg --batch --yes --digest-algo SHA512 --local-user "$fingerprint" --detach-sign -o "$dist/Release.gpg" "$dist/Release"
    gpgv --keyring "$keyring" "$dist/InRelease"
    gpgv --keyring "$keyring" "$dist/Release.gpg" "$dist/Release"
fi
for arch in $arches; do
    echo "index $arch: $(grep -c '^Package:' "$dist/main/binary-$arch/Packages" || true) package versions"
done
