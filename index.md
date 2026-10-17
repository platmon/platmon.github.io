# platmon

**Jetson부터 Raspberry Pi, Linux PC까지. 장치의 상태를 가볍게 확인하세요.**

platmon은 장치의 시스템 정보를 수집해 터미널, 웹 대시보드, HTTP API로 제공합니다. 한 대의 상태를 확인할 때는 platmon을, 여러 장치를 한곳에서 살펴볼 때는 platmon-hub를 사용하세요.

[platmon 시작하기](https://github.com/platmon/platmon/blob/main/docs/guides/getting-started.md) · [GitHub에서 보기](https://github.com/platmon/platmon)

## 장치에 필요한 모니터링

CPU와 메모리, 네트워크와 디스크 I/O는 물론, 하드웨어가 제공하는 GPU/NPU, 온도, 전력, 팬, 배터리와 Wi-Fi 정보를 확인할 수 있습니다. 지원하지 않는 항목은 사용할 수 없는 상태로 표시합니다.

- **터미널과 웹에서 같은 데이터 확인.** 백그라운드 서비스가 수집한 결과를 여러 화면에서 읽습니다.
- **간결한 실행 환경.** Python 3.9 이상 표준 라이브러리로 실행하며, 장치에 별도 Python 패키지를 설치할 필요가 없습니다.
- **최근 변화와 상세 데이터 확인.** 메모리 기반 추세와 제한된 기간의 발행 기록 조회를 제공합니다.
- **환경에 맞는 설치.** Debian 패키지와 systemd, 소스 설치, 로컬 Docker 이미지 빌드를 지원합니다.

## 여러 장치는 platmon-hub로

platmon-hub는 독립적으로 실행되는 Agent의 정보를 모아 여러 장치의 상태를 한 화면에서 보여줍니다. Windows 또는 Linux에서 실행하고, 필요에 따라 SQLite 기록, 내부 경보, 데이터 내보내기를 사용할 수 있습니다.

각 장치는 자신의 데이터를 수집하고, Hub는 그 결과를 읽습니다. Hub가 중단되어도 Agent의 수집은 계속됩니다. Agent 설치와 원격 제어는 Hub의 역할에 포함되지 않습니다.

| | platmon | platmon-hub |
| --- | --- | --- |
| 역할 | 한 장치의 시스템 정보 수집과 표시 | 여러 Agent의 상태 조회와 집계 |
| 실행 환경 | Linux 장치 | Windows 또는 Linux |
| 주요 인터페이스 | 터미널, 웹 대시보드, HTTP API | 웹 대시보드, HTTP API |
| 기록 | 메모리 기반 추세와 발행 기록 | 선택적 SQLite 기록과 데이터 내보내기 |

[Hub 시작하기](https://github.com/platmon/platmon-hub/blob/main/docs/guides/quick-start.md) · [Hub GitHub](https://github.com/platmon/platmon-hub)

## 숫자와 함께 상태를 전달합니다

측정값이 0인 경우와 측정할 수 없는 경우를 구분합니다. 오래된 값은 현재 값처럼 취급하지 않고, 데이터의 나이와 수집 상태를 함께 제공합니다. 기록에서 누락된 구간을 임의의 0으로 채우지 않습니다.

가벼운 모니터링을 목표로 수집 비용을 측정하고, 결과와 측정 조건을 공개합니다. 실제 비용과 사용 가능한 센서는 장치 및 설정에 따라 달라집니다.

[설계 문서](https://github.com/platmon/platmon/blob/main/docs/development/architecture.md) · [성능 측정 기록](https://github.com/platmon/platmon/blob/main/docs/performance/README.md)

## 시작하기

1. 모니터링할 Linux 장치에 [platmon을 설치](https://github.com/platmon/platmon/blob/main/docs/guides/getting-started.md)합니다.
2. 터미널에서 `platmon`을 실행하거나 브라우저로 `http://<장치 주소>:9797`에 접속합니다.
3. 여러 장치를 함께 보려면 [platmon-hub를 실행하고 Agent를 등록](https://github.com/platmon/platmon-hub/blob/main/docs/guides/setup.md)합니다.

Agent의 HTTP 서비스는 기본적으로 인증 없이 모든 IPv4 인터페이스에서 수신합니다. 신뢰할 수 있는 네트워크에서 운영하거나 바인딩 주소를 제한하세요. Hub는 기본적으로 `127.0.0.1:9787`에서 시작합니다.

## 문서와 소스

- **platmon:** [문서](https://github.com/platmon/platmon/blob/main/docs/README.md) · [소스 코드](https://github.com/platmon/platmon) · [릴리스](https://github.com/platmon/platmon/releases)
- **platmon-hub:** [문서](https://github.com/platmon/platmon-hub/blob/main/docs/README.md) · [소스 코드](https://github.com/platmon/platmon-hub) · [이슈](https://github.com/platmon/platmon-hub/issues)

두 프로젝트의 소스 코드는 Apache-2.0 라이선스로 공개됩니다.
