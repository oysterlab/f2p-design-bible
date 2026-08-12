# 한글 번역본

아카이빙한 원문 49편(영문 약 69,805단어)을 한국어로 옮긴 판본입니다.

## 번역 원칙

- 직역하지 않고 한국어로 자연스럽게 읽히도록 옮겼습니다. 문체는 문어체 평서문으로 통일했습니다.
- Core Loop, Retention, Monetization, LTV, CPI, Gacha, Live Ops, DAU, ARPPU처럼 업계에서 원어 그대로 쓰는 용어는 번역하지 않고 그대로 두었습니다.
- 게임·회사·인물 이름과 인용된 지표는 원문 표기를 유지했습니다.
- 문단과 소제목, 목록, 인용, 이미지의 위치와 순서는 원문 구조를 그대로 따릅니다.
- 이미지는 `raw/` 아래 아카이빙된 원본 파일을 그대로 가리킵니다.
- 각 문서 맨 아래에 원문 링크와 저자, 날짜, 출처 사이트를 밝혔습니다.

## 파일 구성

```
translated/
  _manifest.json   원문 메타데이터 (제목, 저자, 날짜, 원문 URL, 이미지 경로)
  README.md        이 문서
  bible/                  15편
  deconstructor-of-fun/    1편
  gameanalytics/          33편
```

## 검증

```bash
node scripts/prepare-translation.mjs    # 원문에서 메타데이터와 대조본 추출
node scripts/check-translation.mjs      # 번역본 검증
node scripts/build-translation-index.mjs # 이 문서 갱신
```

`check-translation.mjs`는 원문 대비 누락된 문서, 프론트매터 불일치, 이미지 링크 깨짐과 순서 어긋남, 번역이 빠진 문단을 검사합니다.

## 제1부. The Bible — mobilefreetoplay.com

Tom Kinniburgh가 쓴 15개 장. Core Loop에서 시작해 세션, Retention, 경제, Gacha, Monetization, 광고, 마케팅, 라이브 운영까지 순서대로 쌓아 올린다.

| 장 | 제목 | 원제 | 저자 |
|---|---|---|---|
| 1 | [모바일 게임 디자인 시작하기](bible/getting-started-mobile-game-design.md) | Getting Started in Mobile Game Design | Tom Kinniburgh |
| 2 | [성공하는 모바일 F2P 게임 만들기](bible/creating-successful-mobile-free-play-game.md) | Creating a Successful Mobile Free to Play Game | Tom Kinniburgh |
| 3 | [F2P 게임 시장](bible/free-play-gaming-market.md) | The Free to Play Gaming Market | Tom Kinniburgh |
| 4 | [강한 Core Loop 만들기](bible/crafting-strong-core-loop.md) | Crafting a Strong Core Loop | Tom Kinniburgh |
| 5 | [중독성 있는 코어 게임플레이 디자인](bible/addictive-core-gameplay-design.md) | Addictive Core Gameplay Design | Tom Kinniburgh |
| 6 | [습관을 만드는 세션 디자인](bible/creating-habit-forming-session-design.md) | Creating Habit-Forming Session Design | Tom Kinniburgh |
| 7 | [게임의 Retention 개선하기](bible/improving-games-retention.md) | Improving your Game’s Retention | Tom Kinniburgh |
| 8 | [오래가는 F2P 경제 만들기](bible/building-lasting-free-play-economy.md) | Building a Lasting Free to Play Economy | Tom Kinniburgh |
| 9 | [루트박스와 Gacha 시스템 디자인하기](bible/design-loot-boxes-gacha-systems.md) | How to Design Loot Boxes and Gacha Systems | Tom Kinniburgh |
| 10 | [F2P Monetization을 위한 디자인](bible/designing-free-play-monetization.md) | Designing for Free to Play Monetization | Tom Kinniburgh |
| 11 | [UX 디자인(UI/UX)과 온보딩](bible/user-experience-design-uiux-onboarding.md) | User Experience Design (UI/UX) & Onboarding | Tom Kinniburgh |
| 12 | [F2P 모바일 게임 (소프트) 론칭하기](bible/soft-launching-free-play-mobile-game.md) | (Soft) Launching a Free to Play Mobile Game | Tom Kinniburgh |
| 13 | [광고로 돈 벌기](bible/making-money-ads.md) | Making Money with Ads | Tom Kinniburgh |
| 14 | [모바일 게임 마케팅과 성장](bible/mobile-game-marketing-growth.md) | Mobile Game Marketing and Growth | Tom Kinniburgh |
| 15 | [모바일 라이브 운영 모범 사례](bible/mobile-live-operations-best-practices.md) | Mobile Live Operations Best Practices | Tom Kinniburgh |

## 제2부. 하이브리드캐주얼 — deconstructoroffun.com

HABBY의 하이브리드캐주얼 모델을 데이터로 해부한 글.

| 제목 | 원제 | 저자 |
|---|---|---|
| [HABBY의 하이브리드캐주얼 제국 — 강자를 만들어 낸 템플릿](deconstructor-of-fun/habbys-hybridcasual-empire-the-template-that-built-a-powerhouse.md) | HABBY’s Hybridcasual Empire: The Template That Built a Powerhouse | Jared Gibbons |

## 제3부. 해체분석과 인터뷰 — gameanalytics.com

게임 해체분석, 개발사 인터뷰, 장르 분석 33편. 원문 슬러그 순으로 배열했다.

| 제목 | 원제 | 저자 |
|---|---|---|
| [모바일로 즐기는 최고의 디지털 보드게임 10선](gameanalytics/10-best-digital-board-games.md) | The 10 Best Digital Board Games For Your Mobile | Alex Sonechkina |
| [11월에 출시된 흥미로운 인디 게임 다섯 편](gameanalytics/5-indie-games-released-november.md) | Five Exciting Indie Games Released in November | Jupiter Hadley |
| [콘솔에서 주머니 속으로 — 게임을 모바일에 맞게 옮기는 법](gameanalytics/adapting-games-for-mobile.md) | From console to pocket: How to adapt your game for mobile | Sarah Impey |
| [게임 개발에 뛰어들다 — Beasts of Burden 인터뷰](gameanalytics/beasts-of-burden.md) | Taking The Plunge Into Game Dev - Beasts Of Burden Interview | Sarah Impey |
| [Marvel Snap, Marvel Contest, CoD Mobile — 대중 시장 히트작의 조건](gameanalytics/blog-marvel-snap-marvel-contest-cod-mobile-mass-market-hit.md) | Marvel Snap, Marvel Contest, CoD Mobile: What makes them a mass market hit? | Om Tandon |
| [저예산으로 크게 성공한 스토리 게임 14선](gameanalytics/budget-games-top-the-charts-by-focusing-on-story.md) | 14 low-budget, highly successful story games | Chay Hunter |
| [Claws of Furry — Terahard와 나눈 Rezzed 2018 인터뷰](gameanalytics/claws-of-furry-rezzed-interview-2.md) | Claws of Furry - Rezzed 2018 Interview With Terahard | Edward Price |
| [VR 시장에 뛰어들려는 이들에게 — Cloudhead Games의 조언](gameanalytics/cloudhead-games-advice-jumping-to-vr.md) | Cloudhead Games' advice on jumping into the VR Market | Chay Hunter |
| [Coin Master는 어떻게 소셜 카지노를 뒤흔들고 1억 달러를 벌었나](gameanalytics/coin-master-social-casino.md) | How Coin Master Disrupted Social Casino And Pocketed $100M | Om Tandon |
| [매치 3의 코드를 어떻게 풀 것인가 — 2부](gameanalytics/crack-the-match-3-code-part-2.md) | How to Crack the Match 3 Code?- Part 2 | Om Tandon |
| [Disco Elysium — Rezzed 2018 인터뷰](gameanalytics/disco-elysium-rezzed-2018-interview.md) | Disco Elysium - Rezzed 2018 Interview | Edward Price |
| [Sugartown 들여다보기 — Zynga의 NFT 기반 유니버스](gameanalytics/everything-we-know-about-sugartown.md) | Exploring Sugartown: Zynga's NFT-Powered Universe | Sarah Impey |
| [Fall Guys: Ultimate Knockdown에서 배울 수 있는 모든 것](gameanalytics/everything-you-can-learn-from-fall-guys-ultimate-knockdown.md) | Everything You Can Learn From Fall Guys: Ultimate Knockdown | Jupiter Hadley |
| [VR 전환을 제대로 해낸 모바일 게임 다섯 편](gameanalytics/five-mobile-games-that-nailed-shifting-to-vr.md) | Five mobile games that nailed shifting to VR | Nicolas Estrem |
| [UX 인사이트 — Golfclash의 성공을 만든 스윙](gameanalytics/golfclash-swing-success.md) | UX Insights: Golfclash's Swing To Success! | Om Tandon |
| [Noor Games는 Lumbercraft로 어떻게 D1 Retention 62%에 도달했나](gameanalytics/how-noor-games-reached-a-d1-retention-of-62-with-the-game-lumbercraft.md) | How Noor Games reached a D1 Retention of 62% with the Game Lumbercraft | Beth Jones |
| [Stumble Guys는 어떻게 2억 2,500만 다운로드를 달성했나](gameanalytics/how-stumble-guys-hit-225m-downloads.md) | How Stumble Guys hit 225m downloads | Chay Hunter |
| [Tennis Clash는 어떻게 골든 세트를 따냈나](gameanalytics/how-tennis-clash-scored-a-golden-set.md) | How Tennis Clash scored a golden set | Sarah Impey |
| [HTML5 게임의 바이럴 잠재력 — Black Snowflake 인터뷰](gameanalytics/html5-games-viral-potential.md) | The Viral Potential Of HTML5 Games - Black Snowflake Interview | Chay Hunter |
| [놀라운 게임 디자인 사례 7선과 그것이 통하는 이유](gameanalytics/incredible-game-design-examples.md) | 7 Incredible Game Design Examples And Why They Work | Sarah Impey |
| [모바일 게임에 관한 생각 — PocketGamer 인터뷰](gameanalytics/interview-ric-cowley-pocketgamer.md) | Thoughts On Mobile Gaming - An Interview With PocketGamer | Edward Price |
| [Roller Splat 개발에서 얻은 핵심 교훈 — Voodoo & Neon Play](gameanalytics/key-lessons-from-developing-roller-splat-voodoo-neon-play.md) | Key Lessons From Developing Roller Splat - Voodoo & Neon Play | Alexander Shea |
| [Lifeline의 성공 뒤에는 — 3 Minute Games 인터뷰](gameanalytics/lifeline-3-minute-games-interview.md) | Behind Lifeline's Success: An Interview with 3 Minute Games | Sarah Impey |
| [소셜 카지노 게임의 메타 기능 해체하기 (사례 포함)](gameanalytics/meta-features-social-casino-games.md) | Deconstructing Meta Features In Social Casino Games (With Examples) | Chay Hunter |
| [히트 캐주얼 게임의 프로토타입 단계 — Purple Diver](gameanalytics/prototype-phases-for-hit-casual-game-purple-diver-voodoo.md) | Prototype Phases For A Hit Casual Game - Purple Diver | Alexander Shea |
| [프로처럼 퍼블리싱하기 — GameFam 조명](gameanalytics/publishing-pro-gamefam-roblox.md) | Publishing Like a Pro: GameFam Spotlight | Sean Parmenter |
| [캐주얼 게임의 PvP 모드 — Disney, Harry Potter, Board Kings, Love Nikki](gameanalytics/pvp-modes-in-casual-games-disney-harry-potter-board-kings-love-nikki.md) | PvP Modes in Casual Games - Disney, Harry Potter, Board Kings & Love Nikki | Wilhelm Voutilainen |
| [0에서 DAU 200만까지 — FRVR 인터뷰](gameanalytics/reaching-2-million-dau-interview-frvr.md) | From 0 to 2 Million DAU: An Interview with FRVR | Chay Hunter |
| [메타 메커닉을 성공적으로 얹은 여섯 게임](gameanalytics/six-games-that-successfully-layer-in-meta-mechanics.md) | 6 games that successfully layer in meta mechanics | Sarah Impey |
| [모바일 게임 개발자가 Candy Crush에서 배울 수 있는 세 가지](gameanalytics/three-things-mobile-game-developers-can-learn-candy-crush.md) | 3 Things Mobile Game Developers Can Learn From Candy Crush | Kelly Clay |
| [모바일 앱의 게이미피케이션 사례 모음](gameanalytics/top-gamification-app-examples.md) | Top gamification examples in mobile apps | Sarah Impey |
| [Vainglory가 해내지 못하면 아무도 해내지 못한다](gameanalytics/vainglory-doesnt-make-one-will.md) | If Vainglory Doesn't Make it, No One Will | Michail Katkoff |
| [Zelda: Tears of the Kingdom — 속편 디자인의 마스터클래스](gameanalytics/zelda-tears-of-the-kingdom-review.md) | Zelda: Tears of the Kingdom - A Masterclass in Sequel Design | Cristian Bercu |
