---
title: 모바일 라이브 운영 모범 사례
title_en: Mobile Live Operations Best Practices
collection: bible
chapter: 15
author: Tom Kinniburgh
published: 2017-12-18
source: https://mobilefreetoplay.com/bible/mobile-live-operations-best-practices/
site: mobilefreetoplay.com
words_en: 1053
---

# 모바일 라이브 운영 모범 사례

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/mobile-live-operations-best-practices.png)

Live Ops는 훌륭한 게임을 수십 년 동안 번창하게 만들 수 있다. 차트 상위권에 오른 게임 하나에 탄탄한 Live Ops 전략을 더하면 F2P 개발사에 5년 이상 안정적인 매출을 안겨 줄 수 있다.

Live Ops에 다시 집중한 것이 최근 Zynga와 Rovio 같은 회사가 되살아난 배경으로 꼽힌다. Zynga의 포커 게임은 새로운 성장을 찾았고, 특히 Rovio의 Angry Birds 2는 Games as a Service의 파국에서 구조되었다. 많은 개발사가 게임 매출의 50% 이상이 이벤트와 프로모션에서 나온다고 말한다. 다만 Live Ops를 제대로 해내기란 대단히 어렵다. 프로덕트 매니저가 최소한의 노력으로 게임을 "신선하게" 유지할 수 있도록 효과적인 도구를 갖추는 일이고, 몇 년치 추가 콘텐츠가 쌓여도 코어가 무너지지 않도록 게임의 핵심 시스템을 충분히 유연하게 만들어 두는 일이다.

라이브 운영(Live Ops)은 보통 게임이 서비스 중일 때 팀이 가하는 모든 개선을 가리킨다. 소프트 론칭 MVP에서 빠져 있던 기능과 개선을 추가하는 일일 수도 있고, 출시 이후 새 레벨을 공급하는 일일 수도 있다. 게임을 꾸준히 업데이트하면 DAU가 안정되고 Engagement가 올라가며 Monetization이 개선된다는 사실은 몇 번이고 확인되었다. 다만 게임을 끊임없이 업데이트하는 일에는 비용이 든다. Live Ops란 바로 그 지점을 다룬다. 유지 비용은 최대한 낮게 유지하면서 제품을 장기적으로 어떻게 끌고 갈지 정의하고 개선하는 일이다.

Live Ops는 다섯 가지 핵심 영역으로 나눌 수 있다.

- 콘텐츠 공급: 제작 비용을 관리하면서도 플레이어의 몰입과 기대를 유지하기 위해 새 콘텐츠를 게임에 전달하는 방식

- 오퍼와 프로모션: 전체 매출을 끌어올리기 위해 재화 전환과 인앱 결제를 업셀링하는 일

- 이벤트: 기간 한정 이벤트를 통해 플레이어가 새로운 방식으로 플레이하도록 유도해 더 높은 Engagement 또는 매출을 만들어 내는 일

- 커뮤니티 관리: 고객 지원, 소셜 미디어를 비롯한 모든 플레이어 접점. 플레이어가 피드백을 남길 수 있고 문제를 빠르게 해결할 수 있도록 하는 일

- 지속적인 제품 개선: 애널리틱스, A/B 테스트, 피드백을 근거로 신규 기능과 다듬기를 결정해 시간에 걸쳐 제품 전반을 개선하는 일

이 다섯 영역은 라이브 운영을 해내는 데 모두 중요하다. 각 영역마다 대개 상시적인 작업과 관리해야 할 파이프라인, 만들어야 할 도구가 따른다. 그래서 팀 차원에서는 이 도구들을 직접 만드는 데 얼마나 힘을 쏟을지, 아니면 이미 나와 있는 서드파티 도구를 쓸지 판단해야 한다. A/B 테스트, 애널리틱스, 이벤트 관리, 프로모션 관리, 고객 응대와 피드백을 위한 믿을 만한 도구는 얼마든지 있다. 상당수는 이런 영역의 기본기를 제공해 준다. 다만 이벤트, 오퍼, 프로모션, 콘텐츠 공급은 모두 팀이 직접 만든 맞춤 해법을 필요로 한다.

### Live Ops의 전제 조건

도구를 만드는 데 뛰어들고 Live Ops가 게임에 가져다줄 것에 기대를 부풀리기 전에, 모든 게임이 라이브 운영의 이점을 누리도록 만들어지지는 않는다는 점을 알아야 한다. 새 콘텐츠와 이벤트를 낸다고 해서 모든 게임의 Engagement나 Monetization이 몇 배로 뛰지는 않는다.

라이브 운영의 기본 전제는 이벤트와 세일, 프로모션, 콘텐츠를 얹을 수 있는 확장 가능한 시스템을 갖추는 것이다.

프로모션으로 쏟아져 들어오는 추가 재화를 경제가 감당할 수 있는가?

이벤트의 보상이 플레이어의 핵심 진행에 충분히 중요해서 참여하고 결제할 의사가 생기는가?

기본 메커닉을 여러 방식으로 변형할 수 있는가? 그 위에 새 메커닉을 얹어 몇 년치 새 콘텐츠와 이벤트를 지탱할 수 있는가?

시스템을 처음부터 어떻게 구성하고 평가할지는 아래 글에서 다뤘다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2016/06/mobile-monetization-101-the-first-steps.jpg)

### 콘텐츠 러닝머신 피하기 (Lean Live Ops)

라이브 운영에 앞선 두 번째 단계는 콘텐츠 제작 비용과 그 콘텐츠의 가치 사이의 균형이 회사 입장에서 수지에 맞는지 확인하는 일이다. 이용자의 기대를 유지하기 위해 새 레벨, 새 캐릭터, 새 모드를 만드는 데 20명이 매달려야 하는데 그 팀의 운영 비용이 감당하기에 너무 크다면, 그 게임은 서비스형 게임으로 성공하지 못한다. 라이브 운영에서 성공하지 못한다는 뜻이다.

콘텐츠를 더 반복 활용할 수 있고 더 저렴하게 만들 방법을 찾는 일은 라이브 운영에 반드시 필요하다. 물론 그러면서도 품질을 놓치지 않도록 비용의 균형을 잡아야 한다. Live Ops가 작동하려면 콘텐츠가 기대를 자아내야 하기 때문이다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/03/content.jpg)

### 이벤트와 프로모션의 페이싱

확장 가능한 튼튼한 핵심 시스템과 효율적인 콘텐츠 러닝머신을 갖췄다면, 다음은 이벤트와 프로모션을 계획하고 준비하는 일이다. 언제 아이템을 세일할 것인가? 얼마에 할 것인가? 플레이어가 무관심해지기 전까지 이벤트를 얼마나 자주 할 수 있는가? 평소 판매를 잠식하지 않는 선에서 아이템 세일을 얼마나 자주 할 수 있는가?

이런 질문의 상당수는 게임마다 따로 답해야 하지만, 큰 틀에서 지킬 만한 원칙은 있다.

다양성이 핵심이다. 프로모션과 이벤트가 지겨워지거나 효과가 떨어지는 것을 막으려면 그 안에 충분한 다양성을 확보해야 한다. 이벤트는 온갖 형태와 규모로 만들 수 있다. 단순한 "주말 XP 2배"일 수도 있고 완전히 새로운 모드를 도입하는 일일 수도 있다. 이벤트의 목표는 그저 재미(다양성 확보, Engagement 창출)일 수도 있다.

계획과 커뮤니케이션은 그보다 더 중요하다. 효과가 최대치에 이르도록 쌓아 올린다는 관점으로 생각해야 한다. 세일이 이벤트와 맞물려 벌어지도록 계획하고, 커뮤니케이션 채널(소셜 미디어, 포럼, 인게임 메시지 등)을 통해 대형 이벤트에 대한 기대를 미리 키운 다음, 프로모션과 세일을 배치해 다가올 이벤트에 대비하게 만드는 식이다.

계획은 이벤트와 세일의 큰 박자를 조절할 수 있게 해 준다. 플레이어가 지치지 않고, 새 이벤트에 무감해지지 않으며, 세일만 기다리다 결제하는 습관에 빠지지 않도록 하는 수준까지 말이다.

![Mobile Live Operations Best Practices](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/mobile-live-operations-best-practices-mobile-free-to-play.png)

_출처: Space Ape Live Ops Boot Camp_

정교하게 설계된 이벤트 하나를 뜯어본 글은 아래에 있다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/04/3-reasons-how-dokkan-battle-reached-1-top-grossing-uncategorised-23.png)

훌륭한 회사들이 라이브 운영으로 어떤 성과를 냈는지 더 알고 싶다면 Space Ape의 부트캠프를 꼭 읽어 보기를 권한다. 린한 라이브 운영 관리에 관한 마스터클래스를 정리해 두었다.

---

원문: [Mobile Live Operations Best Practices](https://mobilefreetoplay.com/bible/mobile-live-operations-best-practices/) · Tom Kinniburgh · 2017-12-18 · mobilefreetoplay.com
