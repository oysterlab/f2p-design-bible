---
title: 히트 캐주얼 게임의 프로토타입 단계 — Purple Diver
title_en: Prototype Phases For A Hit Casual Game - Purple Diver
collection: gameanalytics
author: Alexander Shea
published: 2025-02-26
source: https://www.gameanalytics.com/blog/prototype-phases-for-hit-casual-game-purple-diver-voodoo
site: gameanalytics.com
words_en: 1460
---

# 히트 캐주얼 게임의 프로토타입 단계 — Purple Diver

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c079303acf4428cc06c_purple-diver-cover-image.jpeg)

## Voodoo의 퍼블리싱 매니저 Alexander Shea가 Purple Diver를 만들며 밟은 단계와 각 단계에서 무엇을 바꿨는지 들려준다.

Voodoo Games는 최근 Purple Diver를 출시했다. Viatcheslav Tarasov(Ragdoll Archer, Truck Traffic Control, Snake Loves numbers를 만든 개발자)와 함께 개발한 게임이다. 다행히도 이 게임은 빠르게 차트 상위권으로 뛰어올랐고, 현재 전 세계 1,500만 다운로드를 기록하고 있다. 이 글에서는 이 게임이 어떻게 만들어졌고 그 과정에서 무엇을 배웠는지 이야기하려 한다. (하이퍼캐주얼 게임이 처음이라면 히트작을 만들기 위한 세 가지 스낵 가능성 조언을 꼭 확인해 보기 바란다.)

![Voodoo casual games publishing](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c069303acf4428cc006_Voodoo-Publishing.gif)

## 우리가 Purple Diver를 좋아하는 이유

우리에게 Purple Diver의 가장 좋은 점 중 하나는 Monetization 잠재력이다. 이런 게임에서는 광고를 많이 보여 줄 수 있다. 일부 플레이어에게는 성가실 수 있다는 것을 안다. 하지만 게임의 성격과 게임플레이의 깊이가 사람들을 몰입하게 만들어 짜증을 최소한으로 유지해 준다고 본다. 게다가 광고 단가도 그리 비싸지 않다. 자, 그러면 최종 버전에 이르기까지 Purple Diver가 거친 여러 이터레이션을 살펴보자.

## 버전 1 — 영감과 초기 지표

이 게임은 2018년 12월쯤 우리에게 왔다. Viatcheslav는 늘 점프 게임을 만들고 싶어 했는데, Lion Studios가 퍼블리싱한 Flip Trickster의 성공에서 자극을 받아 실행에 옮겼다. 물론 두 게임은 시각적으로 매우 다르고 챌린지 구간에 들어가면 더욱 그렇지만, Flip Trickster가 Purple Diver의 탄생에 한몫한 것은 분명하다.

### 좋았던 점

첫 형태의 Purple Diver는 시각적으로 지금 버전과 그리 다르지 않았다. 오히려 더 복잡했고 플레이하기도 꽤 더 어려웠다. 그렇지만 우리는 버전 1의 난이도에 상당히 만족했다. 첫 프로토타입을 집어 들고 플레이해 보면 수영장 가장자리에 부딪히는 일이 아주 잦았을 것이다. 그래서 다음 레벨로 넘어가기가 꽤 어려웠다. 하지만 플레이어들은 금세 실력이 늘었고, 그 난이도가 오히려 숙달하고 싶은 마음을 부추겼다. 우리는 이것을 Ball Blast 같은 게임에 비유했다. 좌절스럽기는 하지만 실력 기반 게임이라, 마침내 이겨 냈을 때 기분이 아주 좋아지는 부류다. 버전 1의 지표도 유망했다. D1 Retention이 약 45%, D7이 약 15%였으니 이 게임은 분명히 밀어붙일 가치가 있었다.

### 나빴던 점

버전 1의 CPI는 우리에게 다소 부담스러웠다. 0.30~0.40달러 사이였다. 나쁘지는 않지만 개선의 여지가 분명히 있었다.

![Purple Diver Voodoo 1](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c069303acf4428cc011_Voodoo-version-1-combined.gif)

UI도 꽤 복잡했다. 예를 들어 레벨 종료 애니메이션에는 온갖 정보가 담긴 큰 메뉴가 떴다. 받아들이기 어려웠고 딱히 유용하지도 않았다. 그래서 플레이어의 관심을 붙잡으려면 게임의 규칙과 보상을 단순화해야 한다는 것을 알았다. 버전 1의 온보딩(게임 메커닉을 플레이어에게 가르치는 과정) 역시 지금 수준과는 거리가 있었다. 제대로 된 튜토리얼이 없었다. 게임 난이도에는 대체로 만족했지만, 초반 몇 레벨은 필요 이상으로 어려웠다. 예컨대 빨간 링에 닿으면 즉사했는데, 지금은 그렇지 않다.

### 요컨대 우리가 배우고 개선해야 했던 것은 다음과 같다.

- D1과 D7 Retention이 강했으므로 좋은 게임을 손에 쥐고 있다는 것을 알았다

- 게임 난이도는 꽤 적절했다(살짝 어려운 편이기는 했다)

- CPI는 좋지 않았고 개선이 필요했다

- UI가 더 나아져야 했다. 게임이 충분히 직관적이지 않았고 이용자에게 너무 빨리 많은 것을 쏟아부었다

## 버전 2 — 게임플레이 단순화하기

Purple Diver의 두 번째 이터레이션에서 가장 하고 싶었던 일은 모든 것을 더 명료하게 만드는 것이었다. 각 월드에 목표를 하나씩만 두었다. 오리를 맞히든 아주 깊이 잠수하든, 할 일은 하나뿐이고 그것이 무엇인지 분명히 알 수 있게 했다.

![Purple Diver Voodoo 2](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c059303acf4428cbfed_voodoo-comparison-min-1024x423.png)

종료 화면에서 복잡한 평가 요소를 없애 UI도 단순화했다. 덕분에 플레이어가 하나의 목표에 집중하기 쉬워졌다. 마지막으로 튜토리얼을 추가했다. KPI(게임의 성과를 측정하는 지표)는 이 변경들이 분명한 개선임을 보여 주었다. D1이 약 50%, D7이 약 18%까지 올라갔다.

![Purple Diver Voodoo 3](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c069303acf4428cc003_Voodoo-version-2-combined.gif)

아쉽게도 이 버전의 CPI는 여전히 너무 높았다. Retention이 훌륭한 좋은 게임을 갖고 있었지만, 퍼블리싱하기에는 여전히 비용이 너무 컸다. 그래서 Voodoo 내 여러 팀을 더 끌어들이기로 했다. 마케팅 팀과 함께 이터레이션을 병행했다. 덕분에 더 큰 예산으로 더 적극적으로 게임을 손볼 수 있었고, 비주얼과 게임플레이를 달리한 크리에이티브로 더 낮은 CPI를 찾아 나설 수 있었다.

## 버전 3 — 배운 것을 적용하기

버전 3에서는 다른 게임에서 얻은 몇 가지 기본 교훈을 적용했다. 마케팅 팀과 함께 CPI를 낮추는 작업을 이어 가는 동시에, 게임을 더 너그럽고 보상감 있게 만드는 방향도 살펴봤다. 시험해 본 것들은 다음과 같다.

- 링에 닿아도 죽지 않는 버전

- 레벨 목표를 달성하지 않아도 다음 레벨로 넘어갈 수 있는 버전

- 수집 요소를 넣고 수영장 바닥에 더 쉬운 착지 지점을 둔 버전 등

그런데 전혀 마음에 들지 않았다. 오히려 게임 성과를 해쳤다.

![Purple Diver Voodoo 4](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c069303acf4428cbffb_Voodoo-version-3-combined.gif)

버전 3은 이런 종류의 어려운 게임, 즉 결과를 플레이어의 실력이 결정하고(운의 비중이 크지 않고) 시간이 지나며 실력을 끌어올릴 수 있는 게임을 쉽게 만들면 오히려 Retention이 나빠질 수 있다는 것을 가르쳐 주었다. 게임 디자인에 모두에게 통하는 단순한 정답은 없다는 사실을 다시 일깨워 준 셈이다.

## 버전 4 — 제대로 맞추기

버전 4에 이를 무렵 마케팅 팀은 CPI를 훌륭하게 낮춰 놓았다. 0.30~0.40달러에서 출시 KPI 수준까지 내려왔다.

![Purple Diver Voodoo 5](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c069303acf4428cc01f_Voodoo-version-4-combined.gif)

그래서 우리는 가장 좋았던 버전, 즉 버전 2로 돌아가기로 했다. 물론 밸런싱과 온보딩을 개선하는 몇 가지 수정을 가하고 햅틱도 추가했다. 그것과 CPI 개선이 맞물린 덕분에, 오늘날 우리의 최고 성과 게임 중 하나를 출시할 수 있었다.

## 그래서 무엇을 배웠나

Purple Diver를 개발하고 출시하며 다른 곳에도 적용할 수 있는 몇 가지를 얻었다.

- 이미 시장에 나와 있는 아이디어를 쓰더라도 새 게임에서 탄탄한 CPI를 얻을 수 있다. 여기서 말하는 것은 복제가 아니다. 상위 차트에 복제작이 흔하기는 하지만, 우리는 우리 스튜디오에 누군가를 베끼라고 요구한 적이 없다. 다만 이미 시장에 있는 것을 본떠 개선하는 일은, 게임플레이를 비틀 수만 있다면 훌륭한 아이디어의 원천이 될 수 있다.

- 때로는 게임플레이를 너무 너그럽고 보상감 있게 만들라는 기본 원칙을 무시해야 한다. 모든 게임에 적용되는 규칙이 아니기 때문이다. 어렵더라도 효과적인 게임을 손에 쥐고 있다고 판단했다면, 온보딩과 실력 향상 경로를 제대로 잡는 편이 오히려 더 중요할 수 있다.

- KPI에 도달하기 전에 게임을 출시하는 것도 통할 수 있다. 이것은 더 많은 게임을 더 일찍 내놓기 위해 우리가 추진 중인 방향의 일부이며, 여러 팀을 함께 투입하는 것도 같은 맥락이다. 출시 첫날에 큰 수익을 보지는 못하더라도, 최소한 우리와 개발자의 비용은 충당할 수 있다. 그리고 퍼블리싱한 게임에서 보통 얻는 인상적인 지표에 도달하기 전부터 개발자에게 정산을 시작할 수 있다. 그렇다고 이터레이션과 코칭을 뒤로 미룬다는 뜻은 아니다. 우리는 여전히 D1 40%, D7 10%, CPI 0.50달러 이하를 내는 게임에서 개발자 및 스튜디오와 함께 일하고 싶다. 다만 그 지표에 도달했을 때, 우리 역량을 활용해 A/B 테스트를 진행하고 더 빨리 퍼블리싱한 다음 KPI에 도달하겠다는 뜻이다.

## 이야기를 나누고 싶다면

Purple Diver 사례를 보고 자신의 게임을 완성하고 싶어졌다면, 지금 만들고 있는 것을 편하게 보여 주기 바란다. 우리는 언제나 게임 개발자가 결승선을 넘도록 돕고 싶다. 더 읽을거리를 원한다면 Voodoo가 게임 제품 KPI를 다변화하고 낮춘 이야기를 읽어 보기 바란다.

---

원문: [Prototype Phases For A Hit Casual Game - Purple Diver](https://www.gameanalytics.com/blog/prototype-phases-for-hit-casual-game-purple-diver-voodoo) · Alexander Shea · 최종 수정 2025-02-26 · gameanalytics.com
