---
title: Roller Splat 개발에서 얻은 핵심 교훈 — Voodoo & Neon Play
title_en: Key Lessons From Developing Roller Splat - Voodoo & Neon Play
collection: gameanalytics
author: Alexander Shea
published: 2025-02-26
source: https://www.gameanalytics.com/blog/key-lessons-from-developing-roller-splat-voodoo-neon-play
site: gameanalytics.com
words_en: 1395
---

# Roller Splat 개발에서 얻은 핵심 교훈 — Voodoo & Neon Play

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c06e2d4ebb4ebbbe8d2_roller-splat-cover.jpeg)

## Voodoo의 리드 퍼블리싱 매니저 Thomas Dubreuil이 Roller Splat 작업에서 어떤 판단을 내렸는지, 그리고 이 타이틀이 왜 이토록 잘 통하는지 이야기한다.

이 글에서는 Neon Play의 Roller Splat이 왜 이토록 잘 통하는지(현재 전 세계 4,900만 다운로드를 넘겼다) 살펴본다. 그에 앞서 Neon Play 팀 전체에게 큰 축하를 전하고 싶다. 이들은 Voodoo와 함께 여러 게임을 퍼블리싱해 왔고, 우리는 그들이 무척 자랑스럽다. 정말 훌륭하게 해내고 있다.

![Neon Play Team](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c05e2d4ebb4ebbbe879_neon-play-team.jpeg)

우리는 Roller Splat이 정말 흥미롭다고 생각한다. Neon Play가 어떤 스튜디오이고 어떤 사고방식을 가졌는지 그대로 드러내기 때문이다. 오늘 이 게임을 다루기로 한 이유이기도 하다.

## Neon Play의 성공 비결

Roller Splat 같은 게임의 시장이 만만치 않다는 것은 분명하다. 프로토타입 하나를 만들어 그대로 내놓고 성공시키기란 대단히 어렵다. 하지만 Neon Play가 성공하는 이유는 통할 때까지 프로토타이핑을 멈추지 않기 때문이다. 무언가가 붙으면 계속 다듬고, 붙지 않으면 다시 프로토타이핑한다. Neon Play에는 새로운 아이디어를 만들어 내는 훌륭한 문화도 있다. 한 달에 한 번씩 여는 해커톤이 그렇다. 보통 이틀 정도 이어지는데, 개발자와 아티스트가 모여 새 게임 아이디어를 내고 그것을 설계한다. 그런 다음 살아남은 아이디어로 프로토타입을 만들고, 그렇지 못한 것은 접는다.

### Roller Splat 소개

Roller Splat에 관해 가장 먼저 말하고 싶은 것은 이 게임이 그리 복잡하지 않다는 점이다. 보기에도 아주 단순하고 목적도 이해하기 쉽다. 레벨을 페인트로 빈틈없이 덮으면 된다. 그러면서도 우리가 개발자와 스튜디오에게 아이디어와 게임에 꼭 담으라고 요구하는 기본 재료를 모두 갖추고 있다.

![Roller Splat gameplay](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c06e2d4ebb4ebbbe8a8_Voodoo-roller-splat.gif)

Roller Splat은 퍼즐 게임이라는 점에서 우리의 다른 게임들과 비교하면 꽤 독창적이다. Fight List나 Twenty48 Solitaire 같은 것을 빼면 우리에게는 상당히 드문 유형이다. 물론 우리가 전문으로 하는 하이퍼캐주얼 게임이기는 하다. 그런데 Roller Splat을 처음 해 보면 퍼즐 게임처럼 느껴지지 않는다. 페인트를 가지고 장난치며 환경에 흔적을 남기는 느낌에 가깝다. 대단히 만족스럽고, 애초에 그럴 생각이 없었더라도 이걸 끝까지 완성해야겠다는 감각이 곧바로 생긴다. 앞서 말했듯 Roller Splat은 매우 미니멀한 게임이다. .io 게임도 아니고 화면에 공이 수천 개 있지도 않으며, 군더더기나 복잡한 디자인도 없다. 아주 단순해서 바로 이해된다. 몇 초 안에 플레이 방법을 파악할 수 있다. 또한 상당히 여성적인 게임이기도 하다. 분홍색 페인트 때문은 아니다. 이런 퍼즐 게임은 대체로 여성 이용자에게서 더 좋은 성과를 낸다.

## 어떻게 여기까지 왔나

Roller Splat이 시간에 걸쳐 어떻게 발전했는지 살펴보자.

![Roller Splat development Voodoo](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c06e2d4ebb4ebbbe8a5_Roller-splat-versions.gif)

왼쪽부터 MVP(최소 기능 제품), 버전 2, 버전 3.

### 버전 1

왼쪽 이미지는 Neon Play가 2018년 12월에 만든 MVP(이후 개발에 필요한 피드백을 얻기 위한 게임의 첫 버전)로, 해커톤에서 나온 결과물이다. 이 첫 버전에는 롤러 아바타가 있었고 카메라 각도가 최종 버전보다 조금 더 가깝고 낮았다. 그래서 때때로 아바타가 가려지는 상황이 생겼고, 목표가 무엇이고 아바타가 무엇을 하고 있는지 알아보기가 더 어려웠다. 명료함이 조금 부족했던 것이다. 그럼에도 이 프로토타입은 상당히 잘 다듬어져 있었고 테스트 결과도 좋았다. 다만 CPI가 꽤 높고 D1이 꽤 낮았는데, 바로 그 명료함 부족 때문이라고 판단했다. Neon Play는 무엇이 통하고 무엇이 통하지 않는지 알아보기 위해 제대로 테스트하기로 했다. 그다음 우리는 작은 변경을 가했다. 기본적으로 카메라 각도를 바꾸고 조작의 지연을 없앴다. 아바타도 롤러에서 공으로 바꿨다. 페인트 롤러보다 공이 속도와 힘을 더 효과적으로 표현한다고 봤기 때문이다. 어떤 이들에게는 이야기 전달력이 조금 떨어질 수 있지만, 우리는 이 변경이 게임의 물리감을 크게 개선했다고 느꼈다. 공이 벽에 부딪힐 때 정말로 짓눌리는 감각이 살아나고, 그것을 조종할 때 실제로 힘이 느껴진다. 또 하나 중요한 변경은 공의 속도를 높인 것이다. 위아래좌우로 스와이프하면 공이 거의 즉각 움직인다. 이전 버전에서는 반응 시간이 조금 더 길었다. 이 시간을 줄이자 게임플레이의 만족감과 보상감이 크게 올라갔다. MVP 버전 1과 최종 출시 버전을 가른 가장 큰 차이는 바로 이 이용자와 게임 사이의 상호작용이었다.

### 버전 2

CPI가 나아진 뒤에는 두 번째 이터레이션에서 개선하기 쉬운 것들에 집중했다. 조작 지연, 더 빠른 아바타에서 오는 힘의 감각, 롤러 대신 공을 쓰는 것이 여기에 해당한다. 마지막으로 이용자 온보딩을 살폈다. 초반 레벨을 짧고 경쾌하며 쉽게 통과할 수 있게 만들었다. 그러면 플레이어가 더 퍼즐답고 깊이 있는 게임플레이가 나오는 다음 구간으로 빠르게 넘어간다.

### 버전 3

출시 전 마지막 이터레이션은 게임을 본격적으로 살찌우는 작업이었다. 우리가 한 일은 다음과 같다.

- 맵을 더 만들었다

- 난이도를 쉬움에서 어려움으로, 그러다 이따금 다시 쉬움으로 돌아오도록 밸런싱을 조정했다

- 어려운 레벨의 깊이와 도전 강도를 높였다

- 이용자가 온보딩을 마친 뒤에는 퍼즐적 측면에 집중했다

## Roller Splat 개발에서 배운 것

우선 이터레이션의 순서가 중요하다. CPI를 먼저 손보고, 그다음 UX를, 마지막으로 깊이와 장기 Retention을 쌓는 방식은 게임의 모든 요소를 한꺼번에 담은 로드맵을 세우는 대신 각 스프린트를 짧게 가져가는 훌륭한 방법이다. 이 단계 중 하나를 건너뛰면 지표상 아슬아슬하게 눈에 띄지 않는 게임이 되어 버릴 수 있다. 반면 효과가 크고 품이 적게 드는 수정에 집중하고 그것을 올바른 순서로 해내면 지표가 훨씬 빠르게 개선되는 것을 보게 된다. 이를 그래프로 정리했다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67bf3c06e2d4ebb4ebbbe885_Voodoo-Sprint-1024x573.png)

요지는 이렇다. 잠재력이 있다고 판단해 프로토타입을 개선하고 반복할 때, 예컨대 D1이 40%이고 D7이 10%이며 CPI가 0.50달러 이하라고 하자. 이때 정말 중요한 것은 각 스프린트를 효과가 크고 품이 적게 드는 수정으로 시작하는 것이다. Roller Splat의 경우에는 비주얼과 기본 조작, 아바타의 움직임이 차이를 만들었다. 이틀이나 사흘쯤 걸린 어떤 수정 이후 지표가 개선되는 것을 봤다고 하자. 그러면 다음 단계로 넘어가는데, 여기서는 게임플레이에 더 깊은 변경을 가하게 된다. 그다음 세 번째 이터레이션으로 넘어가면 이 사례에서는 맵을 더 만들고 깊이를 더하는 작업이 된다.

## 당신도 할 수 있다

우리와 함께 일하는 모든 스튜디오와 파트너에게는 이런 게임을 만들 능력이 충분히 있다. Neon Play가 두드러지는 이유는 그것을 몇 번이고 반복해 해낼 수 있기 때문이다. 그렇다고 그들만 할 수 있다는 뜻은 아니다. 처음부터 제대로 해내기 위한 우리의 핵심 조언은 이렇다.

- 하이퍼캐주얼 게임은 단순해야 한다

- 단순한 아이디어가 이긴다. 전달하기 쉽기 때문이다

- 잠재력이 큰 프로토타입이라면, 올바른 순서로 짧은 스프린트를 돌릴 때 게임을 훨씬 빨리 완성하고 퍼블리싱할 수 있다

하이퍼캐주얼 게임을 가볍게 즐길 수 있게 유지하는 세 가지 원칙도 따로 정리해 두었으니 참고하기 바란다.

## 마지막으로…

다시 한번 Neon Play에 큰 축하를 보낸다. Roller Splat은 단 몇 주 만에 전 세계 1,000만 다운로드를 넘긴 훌륭한 게임이다. 우리는 최근 GameAnalytics가 연 행사 Making Hit Casual Games에서 하이퍼캐주얼 게임을 퍼블리싱하는 우리 방식이 정확히 무엇인지 이야기했다. 영상으로도 볼 수 있으니 편하게 확인하기 바란다(발표 자료를 받고 행사에 관해 더 알아볼 수도 있다).

---

원문: [Key Lessons From Developing Roller Splat - Voodoo & Neon Play](https://www.gameanalytics.com/blog/key-lessons-from-developing-roller-splat-voodoo-neon-play) · Alexander Shea · 최종 수정 2025-02-26 · gameanalytics.com
