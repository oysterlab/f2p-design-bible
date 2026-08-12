# 모바일 F2P 게임 디자인 바이블

Core Loop, Session, Retention, Economy, Gacha, Monetization, LiveOps를 다루는 한국어 웹 ebook입니다.
세 곳의 공개 분석을 바탕으로 한 31장 구성이며, A5 기준 369쪽입니다.

**읽기: https://oysterlab.github.io/f2p-design-bible/**

## 구성

| 부 | 장 | 원문 |
|---|---|---|
| 1부. F2P 바이블 | 1~15장 | Mobile Free To Play, The Free to Play Bible (Tom Kinniburgh) |
| 2부. 하이브리드캐주얼 | 16장 | Deconstructor of Fun, HABBY 분석 (Mishka Katkoff) |
| 3부. 게임 해체분석 | 17~31장 | GameAnalytics, Game Deconstructions |

3부는 GameAnalytics의 `Game Deconstructions` 33편 가운데 개별 게임·장르의 시스템을 실제로
분해한 15편입니다. 인터뷰, 신작 소개, 콘솔 게임 리뷰는 제외했습니다.

## 각 장의 구성

| 절 | 내용 |
|---|---|
| 원문의 논지 | 원저자가 무엇을 주장하고 어떤 수치를 근거로 드는지. 결정적 표현은 인용으로 살립니다 |
| 사례와 풀이 | 그 주장을 실제 게임에 대입하고, 계산하고, 설계 판단으로 옮기는 부분 |

**주해 (註解)** 는 옮긴이가 붙인 것으로, 용어의 배경과 장 사이의 연결, 원문이 쓰인 뒤
달라진 사실을 설명합니다. 본문과 주해가 어긋나 보이면 본문이 원문의 주장입니다.

본문의 매출·다운로드·순위·단가는 모두 그 글이 쓰인 시점의 값입니다. 1부는 2017년 전후,
2부는 2025년, 3부는 2019~2025년에 걸쳐 있습니다.

## 읽기 기능

- 데스크톱 연속 읽기와 검색 가능한 목차
- 글자 크기, 다크 모드, 읽던 페이지 저장
- 모바일 페이지·스크롤 모드, 좌우 탭·스와이프와 밝기 조절
- A5 페이지 단위 인쇄와 PDF 저장
- 키보드 탐색과 동작 줄이기 설정 지원

## 개발

```bash
npm install
npm run dev          # 개발 서버
npm test             # 렌더링 + 원고 구조 검사
npm run lint
npm run build:pages  # docs/ 로 정적 출판
```

원고는 `content/chapters`의 Markdown이며 번호 순으로 정렬됩니다.
`npm run content:build`가 원고를 검증해 `lib/generated-book.json`을 만듭니다.

GitHub Pages는 `main` 브랜치의 `/docs` 폴더를 게시합니다.

## 원고 형식

````md
# 제1부. F2P 바이블

# 4장. 강한 Core Loop 만들기

> [deck] 장을 한 줄로 요약한다.

## 절 제목

본문 문단

![대체 텍스트](images/gameanalytics/coin-master-social-casino/03.png "캡션")

> [callout:주해 (註解)] 옮긴이의 설명. 반드시 한 줄로 쓴다.

| 항목 | 값 |
|---|---|
| 예시 | 1 |
````

이미지는 전용 페이지로 렌더링됩니다. 원문 사이트의 관련 글 썸네일처럼 정보를 담지 않는
이미지는 싣지 않고, 도식·차트·게임 화면만 그것을 설명하는 자리에 배치했습니다.
페이지 상한은 `scripts/build-book-data.mjs`에서 560으로 설정되어 있습니다.

## 이미지 파이프라인

원문 사이트를 `raw/`에 미러링해 두고 다음 순서로 처리합니다. `raw/`는 gitignore 대상입니다.

```bash
node scripts/extract-raw-sources.mjs   # 미러 HTML → extracted/sources.json
node scripts/stage-ebook-images.mjs    # 본문 이미지 → public/images/
python3 scripts/compress-ebook-images.py  # JPEG 변환·축소, extracted/renames.json 기록
```

`extract-raw-sources.mjs`는 미러링한 HTML에서 사이트 크롬(브레드크럼, 장 목차, 관련 글 카드,
푸터)을 잘라내고 본문 블록만 남깁니다. 경계 규칙은 컬렉션별로 스크립트 안에 있습니다.

`stage-ebook-images.mjs`의 `selection` 상수가 3부에 실을 15편을 정합니다.

압축은 실제로 투명도를 쓰는 PNG만 PNG로 남기고 나머지는 JPEG로 바꿉니다. 애니메이션 GIF는
건드리지 않습니다. 파일 이름이 바뀌면 `extracted/renames.json`에 기록되므로 원고의 참조를
그에 맞게 고쳐야 합니다.

## 저작권

각 장의 본문과 이미지의 저작권은 원저자와 원 매체에 있습니다. 이 저장소는 개인 학습과 참고를
위한 번역본이며 원문을 대체할 목적이 아닙니다. 인용할 때는 원문을 확인하고 원문을 출처로
적어야 합니다.

| 출처 | 링크 |
|---|---|
| Mobile Free To Play | https://mobilefreetoplay.com/bible/ |
| Deconstructor of Fun | https://www.deconstructoroffun.com/ |
| GameAnalytics | https://www.gameanalytics.com/category/game-deconstructions |
