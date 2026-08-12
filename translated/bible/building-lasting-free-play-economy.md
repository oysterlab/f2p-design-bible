---
title: 오래가는 F2P 경제 만들기
title_en: Building a Lasting Free to Play Economy
collection: bible
chapter: 8
author: Tom Kinniburgh
published: 2017-12-18
source: https://mobilefreetoplay.com/bible/building-lasting-free-play-economy/
site: mobilefreetoplay.com
words_en: 497
---

# 오래가는 F2P 경제 만들기

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/building-a-lasting-free-to-play-economy-2.png)

가상 경제의 설계와 밸런싱은 지난 10년 사이 게임 디자이너에게 가장 중요한 기술 중 하나가 되었다.

이렇게 중요해진 이유는 게임이 더 이상 10~20시간짜리 플레이로 끝나지 않고 몇 년을 버텨야 하기 때문이다. 확장 가능한 시스템을 만드는 열쇠가 바로 경제다. 경제 디자이너의 책임은 게임에 등장하는 재화가 언제나 빠듯한 상태를 유지하도록, 즉 플레이어가 언제나 그것을 갖고 싶어 하도록 만드는 데 있다.

경제 디자이너의 적은 인플레이션이다. 인플레이션을 피하고 Source와 Sink를 관리하는 일은 F2P 게임 디자이너의 핵심 업무다. 재화가 지나치게 흔해지면 크게 두 가지 문제가 생긴다.

- 플레이어가 콘텐츠를 너무 빠르게 소모하거나, 반대로 너무 느리게 진행하다 게임을 떠난다

- 플레이어가 특정 재화를 너무 많이 갖게 되어 그것을 어떻게 쓸지에 관한 흥미로운 선택이 사라지거나, 반대로 재화를 얻기가 너무 어려워 보상이 수지에 맞지 않는다고 판단하고 게임을 그만둔다

경제를 확장하고 인플레이션을 관리하는 기술은 아래 글들에서 다뤘다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2016/06/mobile-monetization-101-the-first-steps.jpg)

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/03/gdc-2017-on-monetization-monetization-1.jpg)

경제 설계라는 흑마술을 익히는 첫걸음은 Excel을 비롯한 스프레드시트 소프트웨어에 익숙해지는 것이다. 다음은 반드시 할 줄 알아야 한다.

- 합계나 평균 같은 기본 수식 다루기

- VLOOKUP, MATCH, INDEX, INDIRECT 같은 함수로 수식 안에서 설정 데이터를 참조하기

- SUMIF, SUMIFS 같은 함수로 가정에 기반한 수치 계산하기

- 간단한 게임 경제 모델링하기. 몇 가지 가정이 주어졌을 때 평균적인 플레이어가 레벨업에 필요한 XP를 모으려면 전투를 몇 번 해야 하는지 계산할 수 있어야 한다

- 방치형 게임에서 플레이어가 다음 업그레이드를 구매하기까지 시간이 얼마나 걸리는지 계산하기

- 간단한 RPG 경제나 방치형 경제를 모델링하고, 그것이 시간에 따라 어떻게 변하는지 파악하기

- 파라미터를 조정해 가며 그것이 플레이어 진행 곡선에 어떤 영향을 주는지 확인하기

- 목표가 주어졌을 때 기본적인 게임플레이 시스템 밸런싱하기 (예: 평균적인 플레이어가 하루 20회 플레이할 수 있게 하려면 경제를 어떻게 맞춰야 하는가)

- 예: 매치 3 게임의 에너지 시스템 (에너지가 다 차기까지 걸리는 시간, 최대 보유량)

- 예: RPG 게임에서 무기 가격 책정하기

- 예: RPG 게임의 XP 공식 만들기

Excel이라는 실무 기술을 익힌 다음에는 진짜 어려운 부분이 남는다. 새로운 재화와 새로운 메커닉을 언제 어떻게 만들지 판단하고, 이런 파라미터를 조정했을 때 게임에 무슨 일이 벌어질지 예측하는 일이다.

![Building a Lasting Free to Play Economy](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/building-a-lasting-free-to-play-economy-mobile-free-to-play.png)

_출처: Both Guns Blazing_

재화의 종류는 매우 다양하고 게임마다 크게 다르다. 경쟁작과 그 경제를 직접 플레이하며 해체할 수 있는 능력은 내 게임을 어떻게 개선할지 이해하는 데 중요하다. 오늘날 모바일에서 가장 좋은 성과를 내는 경제들을 우리가 어떻게 뜯어봤는지 이어서 읽어 보기 바란다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2016/04/galaxy_of_heroes_banner-e1492179444939.jpg)

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/04/3-reasons-how-dokkan-battle-reached-1-top-grossing-uncategorised-23.png)

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/07/uncategorised.png)

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2015/06/deconstructing-marvel-contest-of-champions-5.png)

경제 설계와 밸런싱에 관해 더 알고 싶다면 이어서 읽어 보기 바란다.

---

원문: [Building a Lasting Free to Play Economy](https://mobilefreetoplay.com/bible/building-lasting-free-play-economy/) · Tom Kinniburgh · 2017-12-18 · mobilefreetoplay.com
