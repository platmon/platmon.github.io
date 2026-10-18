# platmon.github.io

platmon과 platmon-hub의 한국어 프로젝트 소개 페이지입니다.

- `index.html`: 실제 소개 페이지
- `styles.css`: 반응형 스타일
- `copy.js`: 명령 블록의 복사 버튼 (홈과 `apt/index.html`)
- `assets/`: 프로젝트의 공식 로고와 파비콘 (Apache-2.0)
- `index.md`: 소개 문안 참고 자료

빌드나 패키지 설치 없이 정적 서버에서 실행할 수 있습니다.

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

저장소 디렉터리에서 실행하고 http://127.0.0.1:8080 을 엽니다. GitHub Pages는 `main` 브랜치의 루트(`/`)를 게시 소스로 사용하도록 준비했습니다. `.nojekyll`로 정적 파일을 그대로 제공합니다. 저장소는 공개이며 GitHub Pages가 활성화되어 있습니다. `main`에 푸시하면 자동으로 배포됩니다. 사이트 주소: https://platmon.github.io/

## APT 저장소

`apt/`는 platmon `.deb`의 서명된 APT 저장소이며 https://platmon.github.io/apt 로 게시됩니다. 설치 방법은 [apt/index.html](apt/index.html)과 platmon 문서에 있습니다.

- `apt/pool/`의 `.deb`는 platmon GitHub 릴리스의 파일 그대로입니다. 한 번 올린 파일은 교체하지 않습니다.
- `apt/dists/stable/`의 인덱스는 `apt/tools/update.sh`가 다시 만들고 `InRelease`와 `Release.gpg`로 서명합니다. 손으로 고치지 않습니다.
- 릴리스를 추가할 때는 [apt 워크플로](.github/workflows/apt.yml)를 수동 실행합니다(`gh workflow run apt -f tags=v1.4.0`). `apt` 환경의 승인 후에 서명 키를 읽습니다. 스크립트는 다음 조건을 모두 확인한 경우에만 `.deb`를 추가합니다.
  - 게시된 릴리스(초안·사전 릴리스 아님)이고, 패키지 이름·버전·아키텍처가 태그와 맞습니다.
  - 릴리스의 `SHA256SUMS`와 일치합니다.
  - platmon 릴리스 워크플로가 그 태그로 만든 빌드 출처 증명(attestation)이 있습니다. 증명이 도입되기 전에 게시된 1.0.0-1부터 1.3.0-1까지는 대신 `apt/legacy-sha256.txt`의 해시와 일치해야 합니다.
- 서명 키: `apt/platmon-archive-keyring.gpg`(`.asc`), 지문 `6D42 C14A BFB9 412F 34BA 4BEF F38B 9BB5 26A3 B0C6`, Ed25519, 2028-10-17 만료. 비밀키는 `apt` 환경 시크릿 `APT_SIGNING_KEY`와 소유자의 오프라인 백업에만 있습니다. 만료 전에 기한을 연장한 공개키를 다시 커밋하고, 사용자는 키링 파일을 다시 받습니다.

## 언어

한국어·영어를 지원합니다. 기본 언어는 저장된 사용자 선택을 우선하고, 없으면 브라우저의 첫 번째 선호 언어가 한국어(`ko`, `ko-KR` 등)일 때 한국어, 그 외에는 영어를 사용합니다. 실제 위치나 IP는 조회하지 않습니다.

헤더의 EN / 한국어 버튼으로 바꿀 수 있으며, 선택은 해당 브라우저의 localStorage에 저장됩니다. 저장이 차단된 환경에서도 현재 페이지의 언어 전환은 동작합니다. JavaScript가 꺼져 있으면 기본 HTML인 영어로 표시됩니다. 번역 문구는 `language.js`에서 관리하며 영어 문구를 바꾸면 `index.html`의 기본 문구도 함께 갱신합니다. `index.md`는 한국어 문안 참고 자료입니다.
