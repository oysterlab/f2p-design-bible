---
title: 중독성 있는 코어 게임플레이 디자인
title_en: Addictive Core Gameplay Design
collection: bible
chapter: 5
author: Tom Kinniburgh
published: 2017-12-18
source: https://mobilefreetoplay.com/bible/addictive-core-gameplay-design/
site: mobilefreetoplay.com
words_en: 708
---

# 중독성 있는 코어 게임플레이 디자인

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/addictive-core-gameplay-design-3.png)

게임을 개발하고 디자인하는 일은 결국 사람들이 즐거워할 만한 독특한 코어 행동 하나를 찾아내는 데서 출발한다.

그런데 코어 경험을 만드는 일은 게임 디자인에서 가장 어려운 부분에 속하면서도, 진행 구조나 재화, Core Loop에 비해 종종 뒷전으로 밀린다. 플레이어가 코어 게임플레이를 재미없다고 느끼면, 재화 설계가 아무리 영리하고 진행 구조가 아무리 잘 짜여 있어도 소용이 없다. 그들은 남지 않는다.

재미있는 코어 게임을 만드는 일은 하나의 기예에 가깝지만, 그 대부분은 사람들이 무언가를 재미있다고 느끼는 근본 원리를 이해하는 데 달려 있다. 게임을 작동하게 만드는 것이 무엇인지 이해하는 일이다.

『A Theory of Fun』을 쓴 Raph Koster에 따르면, 좋은 게임은 궁극적인 본질까지 걸러 내면 학습의 연쇄와 패턴 매칭으로 수렴한다. 장르가 무엇이든, 어떤 게임이든, 게임에서 재미를 만드는 부분은 패턴을 알아내고 배운 것을 적용해 이기는 과정이다.

- 매치 3 게임에서 가능한 매치를 찾아내고, 무슨 일이 벌어질지 예측하고, 어느 쪽이 가장 좋은 결과를 줄지 선택하는 것

- Hearthstone에서 상대가 낸 카드의 패턴을 읽어 어떤 덱을 쓰는지 파악하고, 그 덱에 관한 지식을 활용해 카운터를 쳐서 이기는 것

게임은 결국 이런 패턴을 익히는 일이 된다. 같은 이치로, 가능한 패턴을 모두 보고 나서 똑같은 문제만 계속 반복해 받게 되면 게임은 언젠가 지루해진다. 플레이어가 그 게임을 "풀어 버렸다"고 느끼는 순간 게임은 낡는다. 틱택토 같은 게임이 그토록 빨리 지루해지는 이유가 여기에 있다. 플레이어가 이 게임을 "이기는" 방법을 금세 익혀 버리기 때문이다. 반대로 Starcraft 같은 게임이 수십 년을 가는 이유도 같다. 매번 플레이할 때마다 상대가 무엇을 들고 나올지, 어떤 패턴을 쓸지가 워낙 불확실해서, 상대를 이기는 법을 배우는 일이 평생에 걸친 추격이 되기 때문이다.

![Addictive Core Gameplay Design 1](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2017/12/addictive-core-gameplay-design-mobile-free-to-play-2.png)

_출처: Raph Koster, "Theory of Fun"_

그러므로 F2P 게임의 코어 게임플레이 디자인이라는 기예는 플레이어가 풀 수 있는 문제를 만드는 데 그치지 않는다. 시간이 흘러도 무한히 풀 수 있는 문제, 언제나 새로운 도전을 주고 새로운 것을 배우게 만드는 문제를 만드는 일이다. (그리고 되도록이면 개발자가 엄청난 양의 작업을 하지 않고도 그렇게 되어야 한다!)

이 "학습의 흐름"을 만들고 관리하는 일은 결국 시간에 걸쳐 플레이어에게 적절한 도전과 피드백을 주는 문제다. 압도당할 만큼 과한 피드백이나 자극을 주지 않는 것, 스스로 멍청하다고 느끼거나 도저히 넘을 수 없다고 느낄 만큼 어려운 문제를 던지지 않는 것. 대신 시간에 걸쳐 도전과 복잡도의 균형을 잡을 방법을 찾아, 플레이어가 계속 배우고 있다고 느끼고 게임 안에 늘 흥미로운 무언가가 벌어지고 있다고 느끼게 만드는 것이다.

이런 종류의 피드백을 어떻게 만드는지는 Stats, Skill and Luck에 관한 글에서 자세히 다뤘다.

![](../../raw/mobilefreetoplay-bible/media.mobilefreetoplay.com/wp-content/uploads/2015/02/mobile-game-design-stats-skill-and-luck-6.jpg)

이 흐름을 관리하는 일은 피드백의 문제다. 게임 속 피드백은 "효과가 굉장했다!" 같은 텍스트일 수도 있고 소리나 파티클 이펙트일 수도 있으며, 그 밖의 여러 형태를 띤다. 플레이어에게 자신이 무언가를 제대로 했는지 잘못했는지를 되돌려 주는 모든 것이 피드백이다. 피드백을 명확하게, 보기 즐겁게, 몰입되게 만들면 코어 게임플레이가 재미있게 느껴진다.

PopCap의 디자이너들이 Bejeweled에서 보석이 떨어지는 애니메이션을 다듬는 데 몇 달을 쏟은 데는 이유가 있다. Call of Duty 같은 게임이 헤드샷의 핏자국을 만드는 데 그토록 공을 들이는 이유도 마찬가지다. 게임이 긍정적 피드백과 부정적 피드백을 전달하는 방식이 게임을 재미있게 만든다. 많은 경우 흥미로운 코어 게임플레이란 그저 피드백의 방법을 더 늘리는 문제이기도 하다. 코어 게임플레이에서 "재미"를 더 짜내고 싶은 사람이라면 이 강연을 보기를 권한다. 플레이어 상호작용을 더 흥미롭게 만드는 미묘한 지점을 훌륭하게 짚어 낸다.

이 일을 제대로 해내려면 수년의 경험이 필요하다. 며칠이 아니라 몇 년 동안 몰입도를 유지할 만한 게임을 만들려면 많은 반복과 시간이 든다. 이제부터 붙잡아 보고 싶다면, 계획을 세우는 데 도움이 될 자료들을 아래에 모아 두었다.

---

원문: [Addictive Core Gameplay Design](https://mobilefreetoplay.com/bible/addictive-core-gameplay-design/) · Tom Kinniburgh · 2017-12-18 · mobilefreetoplay.com
