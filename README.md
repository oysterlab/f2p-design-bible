# 모바일 F2P 게임 디자인 바이블

Core Loop, Session, Retention, Economy, Gacha, Monetization, LiveOps를 다루는 한국어 웹 ebook입니다.
세 곳의 공개 분석 49편을 전문 번역하고 해석을 붙인 5부 49장 구성이며, A5 기준 565쪽입니다.

**읽기: https://oysterlab.github.io/f2p-design-bible/**

## 구성

| 부 | 장 | 원문 |
|---|---|---|
| 1부. F2P 바이블 | 1~15장 | Mobile Free To Play, The Free to Play Bible (Tom Kinniburgh) |
| 2부. 하이브리드캐주얼 | 16장 | Deconstructor of Fun, HABBY 분석 (Mishka Katkoff·Jared Gibbons) |
| 3부. 시스템 해체분석 | 17~29장 | GameAnalytics, 게임·장르 해체분석 |
| 4부. 제작과 퍼블리싱 | 30~41장 | GameAnalytics, 프로토타입·퍼블리싱·개발사 인터뷰 |
| 5부. 디자인과 플랫폼 | 42~49장 | GameAnalytics, 디자인·플랫폼·시장 |

GameAnalytics의 `Game Deconstructions` 33편을 모두 실었습니다. 이전 판본이 제외했던
인터뷰와 신작 소개, 콘솔 게임 리뷰도 각각 4부와 5부로 편성했습니다.

## 각 장의 구성

| 절 | 내용 |
|---|---|
| 원문 | 원저자의 글 전문 번역. 문단과 이미지, 수치를 각색 없이 옮겼다 |
| 해석 | 그 주장을 시스템 언어로 다시 쓰고, 다른 장과 연결한다 |
| 사례 | 그 주장이 실제 게임에서 어떻게 구현됐고 어디서 어긋났는지 |
| 적용 체크리스트 | 자기 게임에 대입해 볼 질문과 표 |

`원문` 절에는 옮긴이의 판단이 들어가지 않습니다. 본문 분량의 74%가 원문 번역이고
나머지 26%가 해설입니다. 각 장 끝의 각주에 원문 링크와 저자, 게시일을 밝혔습니다.

## 원고 파이프라인

`content/chapters/`는 직접 편집하지 않는 생성 결과물입니다. 두 개의 소스에서 조립됩니다.

```
translated/<collection>/<slug>.md          원문 1편 = 파일 1개, 충실 번역
content/commentary/<collection>-<slug>.md  deck + 해석 + 사례 + 적용 체크리스트
        │
        └─ scripts/build-chapters-from-translation.mjs
                   └─ content/chapters/*.md → scripts/build-book-data.mjs → lib/generated-book.json
```

장끼리 참조할 때는 번호 대신 `{{ch:슬러그}}`를 씁니다. 생성 단계에서 실제 장 번호로
치환되므로 부 순서나 수록 편수를 바꿔도 참조가 깨지지 않습니다.

```bash
npm install
npm run translate:prepare   # 아카이브 → 번역 메타데이터와 대조본
npm run translate:check     # 번역본 49편 검증 (누락·프론트매터·이미지·미번역)
npm run translate:index     # translated/README.md 목차 갱신
node scripts/build-chapters-from-translation.mjs
npm run lint
npm test
npm run build:pages
```

## 이미지

`npm run images:stage`가 아카이브에서 이미지 335장을 `public/images/<collection>/<slug>/`로
복사하고 JPEG로 재인코딩합니다(93MB → 61MB). 본문에서는 페이지를 독차지하지 않고
글과 함께 흐르는 그림으로 렌더링됩니다.

## 검증과 배포

- `npm test` — 서버 렌더링 결과에서 5부 49장, 인라인 그림 335장, 각 장의 네 절을 확인합니다.
- `npm run build:pages` — `docs/`에 정적 판본을 생성합니다. 565쪽이 상한 640쪽을 넘으면 실패합니다.
- GitHub Pages는 `main` 브랜치의 `/docs` 폴더를 게시합니다.

## 출처

본문은 아래 세 곳의 글을 옮긴 것이며, 저작권은 각 원저자에게 있습니다. 각 장 끝의 각주와
`translated/` 아래 각 파일의 프론트매터에 원문 URL·저자·게시일을 남겼습니다.

- [Mobile Free To Play](https://mobilefreetoplay.com/bible/) — Tom Kinniburgh
- [Deconstructor of Fun](https://www.deconstructoroffun.com/) — Mishka Katkoff, Jared Gibbons
- [GameAnalytics Blog](https://www.gameanalytics.com/blog) — 각 글의 저자 표기 참조

원본 HTML 아카이브(`raw/`, 약 113MB)는 저장소에 포함하지 않습니다.
