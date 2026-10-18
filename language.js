// All translations are trusted, repository-owned copy, never user input.
(() => {
  "use strict";
  const messages = {
  "en": {
    "t0": "Skip to content",
    "t1": "Features",
    "t2": "Small devices.<br>A clear view.",
    "t3": "From Jetson and Raspberry Pi to Linux PCs.<br>Monitor your devices in the terminal and on the web.",
    "t4": "Get started <span>↗</span>",
    "t5": "Explore platmon-hub ↓",
    "t6": "Python 3.9+ · Standard library · Apache-2.0",
    "t7": "Collect → Publish snapshots",
    "t8": "Collection runs independently of viewer requests",
    "t9": "Lightweight collection.<br>Meaningful readings.",
    "t10": "One background service collects the data.<br>Every viewer and consumer reads the published results.",
    "t11": "Use the view that fits",
    "t12": "Check readings in the terminal, explore changes in your browser, or connect other tools through the HTTP API.",
    "t13": "Aware of your hardware",
    "t14": "Read CPU, memory, network, disk I/O and hardware-specific sensors. Unsupported readings remain unavailable.",
    "t15": "Context behind every value",
    "t16": "Keep valid zeros distinct from missing values. Data age and collection status help distinguish current readings from stale ones.",
    "t17": "* GPU/NPU, temperature, power and other sensor availability depends on your hardware and operating system.",
    "t18": "More devices.<br>One platmon-hub.",
    "t19": "Bring your agents into one view.<br>Independent collection. Shared visibility.",
    "t20": "Get started with Hub ↗",
    "t21": "Run on Windows or Linux",
    "t22": "Read agent HTTP APIs to bring multiple devices into one dashboard.",
    "t23": "Keep and export useful history",
    "t24": "Enable optional SQLite history, internal alerts and data exports.",
    "t25": "Collection keeps going",
    "t26": "Agents keep running independently when Hub stops. Hub does not install or remotely control agents.",
    "t27": "Start with your first device.",
    "t28": "Install the agent",
    "t29": "Install on Linux from the APT repository, a Debian package file, source code or a locally built Docker image.",
    "t30": "Install commands ↑",
    "t31": "Check your readings",
    "t32": "Run <code>platmon</code> in your terminal or open the device address in your browser.",
    "t33": "http://&lt;device-address&gt;:9797",
    "t34": "Connect more devices",
    "t35": "Start Hub and register your agents to see their status in one place.",
    "t36": "Hub setup guide ↗",
    "t37": "The agent HTTP service listens on all IPv4 interfaces without authentication by default. Use a trusted network or restrict the bind address. Hub starts on loopback by default.",
    "t38": "Documentation ↗",
    "t39": "Performance ↗",
    "t40": "Install",
    "t41": "Install with one package manager.",
    "t42": "The agent comes from a signed APT repository. Hub comes from PyPI.",
    "t43": "platmon on Debian and Ubuntu",
    "t44": "Ubuntu, Debian and their derivatives, including Jetson and Raspberry Pi OS. Requires Python 3.9+ and systemd.",
    "t45": "Before <code>apt update</code>, check that the key fingerprint is:",
    "t46": "Update with <code>sudo apt update &amp;&amp; sudo apt upgrade</code>. Earlier versions stay in the repository, so you can roll back with <code>sudo apt install platmon=&lt;version&gt;</code>.",
    "t47": "APT repository ↗",
    "t48": "Other installation methods ↗",
    "t49": "platmon-hub on Windows or Linux",
    "t50": "Requires Python 3.9+ and pipx. Hub has no third-party runtime dependencies.",
    "t51": "On Linux, start with an empty registry, then open <code>http://127.0.0.1:9787/</code> on the same computer. The Hub installation guide has the PowerShell commands.",
    "t52": "Update with <code>pipx upgrade platmon-hub</code>. For a service, a Windows startup task or an upgrade that keeps history, follow the operations guide.",
    "t53": "Hub installation ↗",
    "t54": "Install and operate ↗",
    "a0": "platmon home",
    "a1": "Main navigation",
    "a2": "An agent collects once and serves published data to the terminal, web and API",
    "a3": "Lightweight monitoring for Jetson, Raspberry Pi and Linux PCs. Explore your devices in the terminal and on the web, and bring them together with platmon-hub."
  },
  "ko": {
    "t0": "본문으로 이동",
    "t1": "기능",
    "t2": "작은 장치부터.<br>한눈에 보는 상태.",
    "t3": "Jetson, Raspberry Pi, Linux PC까지.<br>장치의 상태를 수집하고, 터미널과 웹에서 확인하세요.",
    "t4": "platmon 시작하기 <span>↗</span>",
    "t5": "여러 장치 함께 보기 ↓",
    "t6": "Python 3.9+ · 표준 라이브러리 · Apache-2.0",
    "t7": "수집 → 스냅샷 발행",
    "t8": "화면의 요청과 독립적으로 움직이는 수집 주기",
    "t9": "장치를 읽는 일은 가볍게.<br>상태를 이해하는 일은 분명하게.",
    "t10": "하나의 백그라운드 서비스가 정보를 수집합니다.<br>여러 화면과 프로그램은 같은 발행 데이터를 읽습니다.",
    "t11": "익숙한 화면에서",
    "t12": "터미널에서 빠르게 확인하고, 브라우저에서 변화를 살펴보세요. HTTP API로 다른 도구에 연결할 수 있습니다.",
    "t13": "장치가 제공하는 만큼",
    "t14": "CPU, 메모리, 네트워크, 디스크 I/O와 하드웨어별 센서 정보를 확인합니다. 지원하지 않는 항목은 사용할 수 없는 상태로 남습니다.",
    "t15": "숫자 너머의 상태까지",
    "t16": "유효한 0과 누락된 값을 구분합니다. 데이터의 나이와 수집 상태를 함께 제공해 오래된 값을 현재 값으로 오해하지 않도록 합니다.",
    "t17": "* GPU/NPU, 온도, 전력 등 센서 지원 범위는 하드웨어와 운영체제에 따라 달라집니다.",
    "t18": "한 대를 넘어,<br>platmon-hub.",
    "t19": "여러 Agent의 상태를 한곳에서.<br>각 장치는 독립적으로, 확인은 함께.",
    "t20": "Hub 시작하기 ↗",
    "t21": "Windows 또는 Linux에서 실행",
    "t22": "Agent의 HTTP API를 읽어 여러 장치의 상태를 모읍니다.",
    "t23": "필요한 기록을 보관하고 내보내기",
    "t24": "선택적 SQLite 기록, 내부 경보, 데이터 내보내기를 지원합니다.",
    "t25": "Hub가 멈춰도 수집은 계속",
    "t26": "Agent는 독립적으로 동작합니다. Hub는 Agent의 설치나 원격 제어를 맡지 않습니다.",
    "t27": "첫 장치에서 시작하세요.",
    "t28": "Agent 설치",
    "t29": "Linux 장치에 APT 저장소, Debian 패키지 파일, 소스 또는 로컬 Docker 이미지로 설치합니다.",
    "t30": "설치 명령 보기 ↑",
    "t31": "상태 확인",
    "t32": "터미널에서 <code>platmon</code>을 실행하거나 브라우저로 장치에 접속합니다.",
    "t33": "http://&lt;장치 주소&gt;:9797",
    "t34": "여러 장치 연결",
    "t35": "Hub를 실행하고 Agent를 등록해 장치들의 상태를 한 화면에서 확인합니다.",
    "t36": "Hub 연결 안내 ↗",
    "t37": "Agent HTTP 서비스는 기본적으로 인증 없이 모든 IPv4 인터페이스에서 수신합니다. 신뢰할 수 있는 네트워크에서 운영하거나 바인딩 주소를 제한하세요. Hub는 기본적으로 루프백 주소에서 시작합니다.",
    "t38": "문서 ↗",
    "t39": "성능 측정 ↗",
    "t40": "설치",
    "t41": "패키지 관리자로 설치하세요.",
    "t42": "Agent는 서명된 APT 저장소에서, Hub는 PyPI에서 설치합니다.",
    "t43": "Debian과 Ubuntu에 platmon 설치",
    "t44": "Jetson과 Raspberry Pi OS를 포함한 Ubuntu, Debian 계열에서 사용합니다. Python 3.9 이상과 systemd가 필요합니다.",
    "t45": "<code>apt update</code> 전에 키 지문이 다음과 같은지 확인하세요.",
    "t46": "<code>sudo apt update &amp;&amp; sudo apt upgrade</code>로 업데이트합니다. 이전 버전도 저장소에 남아 있어 <code>sudo apt install platmon=&lt;버전&gt;</code>으로 되돌릴 수 있습니다.",
    "t47": "APT 저장소 ↗",
    "t48": "다른 설치 방법 ↗",
    "t49": "Windows 또는 Linux에 platmon-hub 설치",
    "t50": "Python 3.9 이상과 pipx가 필요합니다. Hub는 외부 런타임 의존성이 없습니다.",
    "t51": "Linux에서는 빈 장치 목록으로 시작한 뒤 같은 컴퓨터에서 <code>http://127.0.0.1:9787/</code>을 엽니다. PowerShell 명령은 Hub 설치 안내에 있습니다.",
    "t52": "<code>pipx upgrade platmon-hub</code>로 업데이트합니다. 서비스 실행, Windows 시작 작업, 기록을 유지하는 업그레이드는 운영 안내를 따르세요.",
    "t53": "Hub 설치 안내 ↗",
    "t54": "설치와 운영 ↗",
    "a0": "platmon 홈",
    "a1": "주 메뉴",
    "a2": "Agent가 한 번 수집한 결과를 터미널, 웹, API로 제공하는 구조",
    "a3": "Jetson, Raspberry Pi, Linux PC를 위한 가벼운 모니터링. 터미널과 웹에서 장치를 확인하고 platmon-hub로 여러 장치를 모아보세요."
  }
};
  const storageKey = "platmon.language";
  const supported = (value) => value === "en" || value === "ko";
  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = messages[language][element.dataset.i18n];
      if (element.dataset.i18nAttr) {
        element.setAttribute(element.dataset.i18nAttr, value);
      } else {
        element.innerHTML = value;
      }
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
  }
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch { /* Storage may be blocked. */ }
  const preferred = navigator.languages?.[0] || navigator.language || "en";
  const initial = supported(saved) ? saved : (/^ko(?:-|$)/i.test(preferred) ? "ko" : "en");
  applyLanguage(initial);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      if (!supported(language)) return;
      applyLanguage(language);
      try { localStorage.setItem(storageKey, language); } catch { /* Switching still works. */ }
    });
  });
  document.querySelector(".language-switch").hidden = false;
})();
