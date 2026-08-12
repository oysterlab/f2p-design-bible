---
title: 매치 3의 코드를 어떻게 풀 것인가 — 2부
title_en: How to Crack the Match 3 Code?- Part 2
collection: gameanalytics
author: Om Tandon
published: 2025-03-17
source: https://www.gameanalytics.com/blog/crack-the-match-3-code-part-2
site: gameanalytics.com
words_en: 3100
---

# 매치 3의 코드를 어떻게 풀 것인가 — 2부

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6d85d99e93e31db159_match-3-part-2-cover.jpeg)

## 매치 3 게임이 Classic에서 Meta로 진화해 온 과정을 살펴보고, 이 치열한 장르에서 성공하기 위한 핵심 전략을 짚어 본다.

편집자 주: 이 글은 Eaton의 Innovation & UX Design 매니저 Om Tandon이 처음 게시한 것이다. 원문은 여기에서 읽을 수 있다.

> 매치 3의 변태(變態)는 현실이다. 그런데 새로운 영역에는 새로운 규칙이 따라오지 않던가? 이 미지의 바다에서 판이 어떻게 돌아가고 있는지 더 깊이 들어가 보자.

여러 편으로 이어지는 이 분석 시리즈는 그 새로운 규칙이 무엇일지에 집중한다. 앞선 글에서는 과거 데이터와 함께, 성숙해진 플레이어 행동과 깊어진 게임 디자인이라는 지각 변동의 힘이 어떻게 매치 3 지형을 Classic과 Meta로 갈라 놓았는지 살펴봤다. 각각 King과 Playrix 같은 회사들이 지배하는 영역이다.

![Calssic Match 3 vs Meta Match 3](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafb1_tectonic-game-1024x637.jpeg)

> 그렇다. 우리는 갈림길에 서 있다. 다만 진짜 질문은 앞에 놓인 길이 어떤 모습이냐는 것이다.

## Classic과 Meta 모두에서 이 진화는 아직 끝나지 않았다

### Classic 매치 3 링에서는 무슨 일이 벌어지고 있나

King은 오랜 기간 군림해 온 인기 Classic 매치 3 프랜차이즈 Candy Crush Saga를 되살리고 다시 만들어 내며 자기 영역과 유산을 지키는 데 힘을 쏟고 있다.

> 오늘의 Candy Crush Saga는 8년 전의 원래 모습과는 확연히 다른 존재라고 해도 이견이 없을 것이다.

King은 현재의 메타 흐름을 읽고 다양한 2차 메타 목표와 이벤트를 성공적으로 도입했다. 이는 단순한 재탕이 아니라 게임의 코어와 사용자 경험을 새롭게 하는 일이다. 이 깊이는 새 레벨 디자인에서도 드러난다. 아래에서 플레이어가 캔디를 깨면서 좇을 수 있는 다양한 이벤트와 메타 목표를 볼 수 있다.

![match 3 games meta features](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafd3_candy-crush-events-1024x496.jpeg)

- 실제 플레이어를 내세운 사회적 증명과 커뮤니티 참여 이벤트 (참고: 등장하는 여성 대부분이 35세 이상이라는 점은 가장 몰입도 높은 집단이 30대 이상 엄마들임을 시사한다. 그렇다면 더 어린 이용자층의 유입은 줄고 있는 것일까?)

- 콩나무를 타고 오르는 것 같은 기간 한정 이벤트 레벨

- 제한된 친구 그룹과 겨루는 리더보드 경쟁 (적은 인원으로 구성해 플레이어가 적은 노력으로도 높은 순위에 오를 가능성을 확보한다. 예: 1만 명 중 8,000등보다 20명 중 8등이 훨씬 동기를 준다)

- 특별 오퍼를 얻는 두루마리 수집 이벤트

> 이 기능들은 미드코어와 하드코어 게임에서 보이던 플레이를 부드럽게 바꾼 판본이다. 다만 질문은 이것이다. 이런 임시방편으로 충분한가?

이런 메타 목표의 추가는 신선하고 반가운 변화지만, 새 메커닉과 기능이 시간에 걸쳐 조금씩 쌓이면서 생길 수 있는 문제도 있다.

### 1. 다양하고 충분히 구별되는 보상의 부재

여러 이벤트 유형과 보상 기능이 CCS 안에서 단기·중기·장기 진행의 호를 만들며 플레이어의 경험에 변화를 주는 것은 사실이다. 다만 아쉬운 점이 있다.

> 노력의 대가로 받는 보상이 지나치게 반복적이고, 시간이 지나면 거기서 거기로 느껴질 수 있다.

![candy crush prizes](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafd6_candy-crush-rewards-1024x417.jpeg)

위 이미지는 CCS에서 여러 이벤트와 메타 목표를 완수했을 때 받을 수 있는 보상들이다. 한눈에 봐도 대부분이 너무 익숙한 부스터거나 그 부스터를 묶은 꾸러미임이 분명하다.

> 모든 보상이 부스터이고, Candy Crush Saga에서 모든 부스터는 "어딘가 비슷하게" 느껴진다.

오해하지 마시길. 부스터 자체는 훌륭하다. 특히 부스터가 터뜨리는 화려한 불꽃과 애니메이션 효과를 정말 좋아한다(King 게임의 상징이고 이것을 King보다 잘하는 곳은 없다). 다만 플레이어는 이 부스터에 지나치게 익숙해진다. 일일 보상 룰렛에서 맛보기로 정기적으로 무료로 받게 되고, 초콜릿 폭탄이나 해파리처럼 여럿은 연쇄의 일부로 게임 보드에 흔히 등장하기 때문이다. 실제로 과제를 끝냈을 때 무엇을 받을지 익숙해지고 쉽게 예측할 수 있게 되면, 도파민 분출이 줄고 보상감이 희석된다.

> CCS에서는 이벤트나 수집 기능처럼 단기·중기·장기 목표를 아무리 다르게 파고들어도 받는 보상이 대체로 같다. 시간이 갈수록 보상의 가치가 크게 희석될 수 있다.

예측 가능하고 흔한 보상이 시간에 따라 도파민 분출에 미치는 영향.

![dopamine surge graph](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31daf8b_dopamine-surge.jpeg)

### 2. 소모품과 부스터의 희귀도 체계 부재

현재 CCS의 보상에는 희귀도 체계가 없다.

> 소모품도 좋은 보상 체계가 될 수 있지만, 지금 CCS의 소모품 상당수는 원작 Angry Birds의 "Mighty Eagle"처럼 뚜렷한 정체성이나 희소한 획득성을 갖고 있지 않다.

![Mighty Eagle Game Example](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31daf93_might-eagle.jpeg)

원작 Angry Birds에서 얻기 어려웠던 "Mighty Eagle"을 기억하는가? 희소성과 압도적인 위력 덕분에 진짜 정체성을 가진 부스터였다. CCS의 어떤 부스터도 그 정도의 존재감을 갖지 못한다. 여기에 흔하게 뿌려지는 빈도까지 더해지면, 플레이어의 머릿속에서 체감 가치는 훨씬 평범해진다. 고인물 플레이어에게는 더욱 그렇다.
https://www.youtube.com/watch?v=7Qk-qe75Sns&feature=emb_title

### 3. 낡은 단일 재화 경제가 보상을 "부스터"로만 묶어 둔다

CCS는 시장에서 가장 오래된 매치 3 게임 중 하나여서 단일 프리미엄 재화 경제(골드 바)에 기반한다. 게임의 거의 모든 행동에 대한 보상이 부스터로 수렴하는 이유 중 하나가 이것이다. 반면 새로 등장한 메타 계열 게임은 부스터 외에 최소 두 가지 재화를 두어, 보상 분배와 파밍 요소에 깊이와 다양성을 더한다.

![Match 3 games examples](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafc7_match-3-comparison-1024x226.jpeg)

소모품 대 재화. 재화와 소모품을 보상 체계로 쓸 때의 장단점을 보자. 자료 제공: Evtim Treknov

![Currencies vs Consumables](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafca_consumables-1024x528.png)

소모품과 재화 모두 주관적 가치나 인플레이션 같은 장단점이 있지만, 단기·중기·장기 진행의 호를 따라 다양한 기능을 두려 한다면 플레이어에게 더 많은 선택과 다양성을 주어야 한다. 보상 체계는 희귀도(일반, 희귀, 전설)나 재화의 다양성을 통해 잘 확장될 수 있어야 한다. CCS에는 두 방향 모두 개선의 여지가 크다.

> King은 진행의 호를 따라 메타 목표를 계속 확장하겠지만, 희귀도가 없거나 단일 재화 경제에 묶여 보상 체계를 확장하지 못하면 플레이어의 동기를 희석할 소지가 있다.

플레이어가 이런 노력을 장기적으로 어떻게 받아들일지는 시간이 말해 주겠지만, King이 Classic 매치 3를 다시 정의하고 지켜 내기 위해 온 힘을 다하고 있는 만큼, Classic 매치 3의 신규 진입자들은 여전히 정상을 향한 경주에서 힘든 시간을 보낼 것이다. 진입 장벽이 여전히 상당히 높기 때문이다.

## 이제 Meta 링에서는 무슨 일이 벌어지는지 보자

![Meta Ringside Graphic](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31daf8f_meta-ringside.jpeg)

> 이 봉우리의 정상에 오르는 일 역시, 불가능까지는 아니더라도 가파른 등반이다. 초기 진입자들의 공격적인 지배와 인수합병의 각축장이 된 장르 상황을 감안하면 더욱 그렇다.

## Meta 매치 3의 진입 장벽

1. Playrix처럼 공격적인 마케팅과 UA 실탄을 갖춘 초기 진입자들의 극도로 경쟁적인 성향. 예: 최근 Playrix 경쟁사들의 UA 지출이 늘자 그 이상으로 과한 대응이 돌아왔다.

Deconstructor of Fun이 짚었듯, 러시아 곰을 건드리지 마라

![Russian Bear Image](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31db04e_russian-bear-1024x568.png)

![Playrix description of Match 3 Games](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafae_playrix-1024x107.png)

![App Annie - Playrix spike](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31daf9d_app-annie-1024x286.jpeg)

출처: Deconstructor of Fun

모바일 게임을 자주 하거나 페이스북을 둘러본다면 아래 광고를 봤을 가능성이 크다.

![Gardenscapes banner](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31daf87_gadrenscapes.jpeg)

> Playrix의 공격적이고 과할 만큼 빠른 대응을 보면, 앞으로의 시도 역시 비슷한 대응에 맞닥뜨릴 것이 분명하다.

2. AppLovin이 데이터 애널리틱스 플랫폼과 게임 스튜디오(Belka, Firecraft) 사이의 수직 통합을 택하면서, 업계의 360도 파노라마 데이터와 그 학습을 자사 게임에서 실행하는 능력을 결합한 강력한 동맹이 만들어졌다. 큰 배당을 안겨 줄 수 있는 강력한 전략이다. 3. Zynga의 Peak Games(Toon Blast, Toy Blast) 인수는 Frank Gibeau가 언급했듯 특히 데이터 사이언스 영역에서 Zynga의 넓은 네트워크를 통해 Peak에 더 큰 힘과 확장 능력을 더한다.

> 위 그림이 암울해 보인다면 걱정할 필요 없다. 개발자들이 미지의 영역에 발을 담그고 섞고 비비고 실험하며 매치 3의 코드를 푸는 길은 언제나 있다.

아래 분석에서는 파이가 어떻게 더 잘게 나뉘고 있는지, 그리고 IP와 Classic 매치 3 바깥의 이용자층과 결합했을 때 매치 3의 메타를 어디까지 밀어붙일 수 있는지 살펴본다. 그 사례 중 하나가 이것이다.

## Property Brothers — 더 성숙한 이용자층을 겨냥한 장르 혼합

최고 매출 퍼즐 게임 차트에서 느리지만 눈에 띄게 올라오고 있는 것이 Storm 8의 Property Brothers Home Design이다.

![Sensor Tower - Property Towers Ranking](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafd0_property-brothers-1024x601.jpeg)

출처: Sensor Tower

### Storm 8의 이력

Storm 8이 내놓은 Property Brothers는 "메타를 얹은 매치 3"의 또 다른 해석으로, 조용히 차트를 올라왔다. 지금 유행하는 꾸미기 메타와 서사 중심 게임플레이, 콜랩스 코어라는 재료를 모두 갖췄지만, 겨냥하는 이용자층은 Homescapes와 Gardenscapes, Lily's Garden과 다르다. 이 게임들이 모두 캐주얼한 픽션 기반의 만화적 서사 스타일을 쓰는 반면, Property Brothers는 현실적인 꾸미기와 사실에 기반한 서사, 그리고 실제 세계라는 배경에 무게를 둔다.

> Property Brothers는 더 현실적인 꾸미기 메타를 인기 있는 실제 IP와 결합해 겨냥한다.

### IP 요인

Property Brothers Home Design은 캐나다의 인기 리얼리티 TV 쇼에 기반한다. 쌍둥이 형제 Jonathan과 Drew Scott이 기술적 전문성을 발휘해 주택 구매 희망자가 정해진 예산 안에서 원하는 대로 집을 개조하도록 돕는 프로그램이다. 이 대목에서 짚을 것이 있다.

> 과거의 시도들에도 불구하고, 매치 3와 IP 게임의 결합은 대규모로 차트를 뒤흔든 사례를 만들지 못했다. Frozen Adventures나 Temple Run 같은 IP 기반 퍼즐 게임은 매치 3 장르에서 제한적인 성공에 그쳤다.

![Match 3 games examples](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafd9_match-3-games-1024x353.jpeg)

IP와 프랜차이즈 제휴는 팬층에서 더 많은 오가닉 다운로드를 얻을 가능성이 있지만, 그것을 성공 공식으로 착각해서는 안 된다. 지난 15년 넘게 차트를 뒤흔든 수많은 IP 기반 게임(Star Trek, Ice Age, My Little Pony, Hardy Boys, Wizard of Oz, Alice in Wonderland 등)을 작업해 온 사람으로서 확실히 말할 수 있다. IP만으로 게임이 차트 정상에 오르지는 않는다.

> 코어 게임플레이가 빛나야 하고 IP의 세계관과 조화롭게 녹아들어, 프랜차이즈 팬과 그렇지 않은 플레이어 모두를 붙잡아야 큰 결실을 거둘 수 있다.

## Property Brothers의 타깃 이용자 — 융합의 잔치

> Property Brothers로 Storm 8은 현실적인 홈 데코를 좋아하는, Glu Mobile의 Design Home이 확보한 거대한 이용자층을 겨냥하고 있다. 어쩌면 Glu Mobile의 밥그릇을 빼앗고 있는지도 모른다.

![Sensor Tower Daily Rankings](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafcd_sensor-tower-graph-1024x495.png)

출처: Sensor Tower

위 데이터는 Property Brothers가 2019년 출시 이후 최고 매출 차트에서 Design Home과의 격차를 어떻게 좁혀 왔는지 보여 준다.

> Storm 8은 이 IP를 고를 때 숙제를 제대로 했다. 여성과 베이비붐 세대에게 대단히 인기 있는 프랜차이즈이기 때문이다.

![Property Brothers TV Show](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafc4_property-brothers-ratings-1024x332.png)

![Property Brothers Demographic](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafba_property-brothers-demo-1024x340.png)

위의 Property Brothers(TV 쇼) 시장조사 인구통계 데이터는 여성(47%)과 밀레니얼(26~40세), 베이비붐 세대(45세 이상)에게 인기가 높다는 점을 분명히 보여 준다. 이제 이 데이터를 아래 GameRefinery의 메타 매치 3 게임 "Thinker" 플레이어 원형과 비교해 보자.

![GameRefinery Property Brothers Demographic](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafb7_player-archetypes-1024x409.jpeg)

출처: GameRefinery

Property Brothers IP의 이용자층은 Classic과 Meta 매치 3 게임의 인구통계와 아주 잘 겹치고, 그래서 이 장르에 잘 맞는다.

### Core Loop

Property Brothers는 탄탄한 캐릭터와 강한 서사, 꾸미기 과제 같은 Meta 매치 3의 성공 재료를 모두 가져와, 더 현실적인 아트 스타일과 꾸미기 중심 이용자층에 맞게 다듬는다.

> Property Brothers는 팬들에게 익숙한 TV 쇼라는 심적 모형을 활용하면서도, 프랜차이즈를 모르는 플레이어에게는 온보딩을 단순하고 매력적으로 유지한다.

![Core loop](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6a85d99e93e31dafa8_match-3-meta-1010x1024.jpeg)

Core Loop는 플레이어를 Property Brothers의 입장에 세우고 다양한 고객을 소개하는 것을 중심으로 돌아간다. 플레이어의 일은 이 집들을 꾸미는 것이고, 이때 제시되는 이상적인 청사진이 어느 정도 길잡이가 되어 주되 창의적 선택을 가로막지는 않는다. 여기까지는 다른 꾸미기 메타 게임과 같아 보이지만 차이가 있다.

> Property Brothers는 꾸미기 메타에서 훨씬 많은 선택지를 제공하고 UX도 새롭다. 플레이어가 집 하나나 정원 하나를 단선적으로 업그레이드하는 데 갇히지 않기 때문이다. 이 게임은 서로 다른 고객을 위해 꾸밀 수 있는 다양한 집을 제공한다. 거실부터 침실, 아기 방까지 어지러울 만큼 다채롭다.

![property brothers gameplay](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6b85d99e93e31dafb4_home-game-1024x249.jpeg)

### 서사

서사는 Property Brothers에서 큰 비중을 차지하는데, 순전히 허구의 이야기에 몰입하는 것과 비교하면 한 가지 단서가 붙는다. Property Brothers는 고객이라는 형태로 다양한 인물을 소개한다. 두 번째 큰 차별점은 이것이다.

> 서사가 순수한 허구가 아니다. 대화 곳곳에 인테리어 디자인 지식의 알맹이가 섞여 있어 꽤 교육적이다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db10a_interior-designs-game-1024x286.jpeg)

인테리어 디자인의 사실과 서사적 허구를 이렇게 섞으면 인테리어와 이 장르를 좋아하는 플레이어에게 자연스럽게 가닿는다.

### 매치 3 코어 메커닉 — 콜랩스 게임플레이

이 시리즈 1부에서 우리는 메타를 얹고 출시된 새 매치 3 게임들이 지난 2년간 스와이프보다 콜랩스에서 더 큰 성공을 거두고 있는 흐름을 짚었다. Property Brothers도 이 흐름을 따르는 사례다. 이 게임은 콜랩스 코어를 쓸 뿐 아니라, 다른 매치 3 게임에 흔한 플레이어 성장이나 트로피 레벨도 놀랍게도 없다. 플레이어의 진행은 지금 있는 퍼즐 레벨, 그리고 더 중요하게는 완수한 고객 의뢰의 수로 측정된다. 이는 다음 사실을 더욱 뚜렷이 보여 준다.

> Meta 매치 3 게임은 매치 3를 목적이 아니라 수단으로 쓴다. 플레이어가 꾸미기 과제라는 더 만족스러운 목표를 좇게 만들기 위한 수단이다.

### "콜랩스" 게임의 아킬레스건

잘 설계하면 콜랩스 메커닉은 플레이어의 정신적·전술적 노력을 줄여 세션 시간을 조절하는 데 도움이 된다. 다만 태생적인 게임 디자인 문제가 있다. "보드 교착"이다. 플레이어가 잘못된 수를 여러 번 두면 보드의 어느 영역이 색이 맞지 않아 멈춰 버리는 교착 상태가 생길 수 있고, 그러면 보드를 정리하지 못하게 된다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db100_board-stalemate.jpeg)

> 그렇다면 이 아킬레스건은 어떻게 다뤄야 할까?

성공적인 콜랩스 게임은 무작위 "슈퍼 젬"을 많이 만들어 이 교착을 최소화하려 한다. 수를 둘 수 없을 때 보드를 열어 줄 수 있는 장치인데, 결국 레벨 디자인과 세밀한 조정의 문제이기도 하다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db112_achilles-heel.jpeg)

가장 성공한 콜랩스 게임들이 이 문제를 어떻게 다루는지 보자. Lily's Garden 같은 대형 콜랩스 게임은 더 큰 보드 크기를 쓴다. Toon Blast는 보통 100레벨을 넘기기 전까지 어려운 레벨을 내놓지 않아, 플레이어가 벽에 부딪히기 전에 메커닉에 충분히 익숙해지게 한다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db11c_lilys-garden-1024x485.jpeg)

Property Brothers도 상당 부분 이런 "교착 해소" 장치를 조합해 플레이어의 마찰을 덜어 준다.

- 더 큰 보드 크기

- 폭탄과 다이너마이트, 드럼통 같은 무작위 "슈퍼 젬"을 후하게 떨어뜨려 블록 덩어리를 크게 날릴 수 있게 한다. 플레이어는 이 슈퍼 젬을 서로 붙여 터뜨려 더 강력한 폭발 조합을 만드는 전략도 세울 수 있다.

- 어려운 레벨은 보통 60레벨을 넘겨야 등장한다

## 그런데 Storm 8은 Property Brothers에서 스와이프를 버리고 콜랩스를 택한 것일까?

스와이프 대 콜랩스 논쟁을 한층 흥미롭게 만드는 사실이 있다. Storm 8은 Property Brothers를 내놓기 전에 이미 같은 꾸미기 메타를 가진, 그러나 스와이프 매치 3 메커닉을 쓴 사실상 동일한 게임을 갖고 있었다.

![Match 3 games comparison](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db12a_match-3-examples.jpeg)

> Property Brothers는 완전히 같은 꾸미기 메타와 비슷한 서사 스타일로 출시되었지만, 개발진은 스와이프 메커닉을 콜랩스로 바꿨다.

![](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db124_sensor-tower-graph-2-1024x441.png)

출처: Sensor Tower

차트를 보면 콜랩스 판본이 사실상 동일한 스와이프 사촌보다 최고 매출 차트에서 훨씬 큰 성공을 거두고 있음이 분명하다. 콜랩스 대 스와이프 논쟁의 결론이 났다고 하기는 어렵지만, 개발자 관점에서 눈여겨볼 만한 관찰이다.

## 메타 루프와 이벤트 시스템

메타는 실내외 꾸미기를 중심으로 하되, 다중 재화 접근이라는 영리한 장치가 더해져 있다. 기간 한정 이벤트 설계가 대단히 흥미로운데, 실내 꾸미기라는 코어 게임플레이를 수영장 파티와 여름 바비큐, 결혼식 장식 같은 야외 이벤트로 확장해 이제는 흔해진 홈 데코 테마에 깊이를 더한다.

![Meta-loop example](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db10e_core-gameplay-1024x189.jpeg)

이 이벤트들은 플레이어가 더 유능해진 기분을 느끼게 한다. 코어 게임플레이에서 아마추어 홈 데코레이터에 머무는 것과 달리, 전문 데코레이터가 된 것처럼 느낄 수 있기 때문이다.

> 기간 한정 재화(코인과 기간 한정 토큰)라는 두 가지 소프트 커런시는, 이벤트를 하지 않을 이유가 없게 만드는 정말 영리한 장치다.

![Limited time events and core loop](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db106_limited-events-1024x542.jpeg)

일반 코인은 평상시 게임플레이의 실내 꾸미기에만 쓸 수 있고 이벤트에서는 쓸 수 없다. 반대로 기간 한정 토큰은 진행 중인 특정 이벤트에서만 쓸 수 있다. 그러니 이벤트는 이중의 가치를 갖는다. 플레이어는 이벤트를 진행하면서 동시에 평상시 게임플레이용 코인을 파밍하게 된다. 그 결과 이벤트 자체의 결과가 어떻든 평상시 꾸미기에서도 충분히 진전을 볼 수 있으니, 자연스럽게 이벤트에 참여할 유인이 생긴다.

## 2020년 메타 매치 3의 결론과 전망

- King이 대표작 Candy Crush Saga를 메타 목표 중심 프랜차이즈로 전환하며 장르를 발전시키려 하고 있어, Classic 매치 3의 진입 장벽은 높다.

- Meta 매치 3 쪽 역시 Playrix 같은 초기 진입자가 공격적인 UA 태세를 취하고 있어 장벽이 높아질 것이다. AppLovin의 수직 통합 전략과 Zynga의 최근 인수(Peak Games)는 이 작은 스튜디오들에 자금이 유입되고 있음을 뚜렷이 보여 주며, 그만큼 자기 영역을 방어할 준비가 되었다는 뜻이다.

- 이 장르에서 발판을 마련할 열쇠는 다른 캐주얼 게임의 새로운 이용자층을 찾아, 패션과 드레스업, 메이크업, 요리, 농장, 서사 픽션 같은 게임플레이를 Meta 매치 3와 결합하는 데 있을 수 있다.

- 메타 기능이 쌓일수록 보상을 확장할 수 있도록, 낡은 단일 재화 경제와 소모품 일변도에서 벗어나야 한다.

> 높은 진입 장벽에도 불구하고, 실험과 새로운 이용자층 발굴, 장르 혼합이 이 장르를 발전시키고 큰 결실을 거두는 열쇠가 될 것이다.

## 2020년 12월 1일 업데이트 — 예측 검증!

2020년 4월과 7월에 두 편의 글을 발행한 뒤, 11월에 출시된 새로운 Meta 매치 3 "Project Makeover"가 최고 매출 차트 12위까지 올라오는 것을 보고 있다. 패션과 메이크업, 드레스업, 인테리어 꾸미기라는 메타 요소를 결합해, 이 시리즈에서 예측한 대로 다른 캐주얼 장르의 이용자층에 가닿으며 지금까지 큰 성공을 거두고 있다. (출시 열기가 가라앉은 뒤 어떻게 될지 지켜보는 중이다!)

![Project Makeover](../../raw/gameanalytics-deconstructions/cdn.prod.website-files.com/67334a66848d90a25f82bdce/67d80a6c85d99e93e31db127_project-makeover-1024x1009.jpeg)

이 시리즈의 다음 편에서 더 깊이 파고들 예정이니 기대해 주기 바란다. 앞으로 어떤 글을 보고 싶은지 알려 주고 싶다면 45초짜리 설문에 참여해 주기 바란다. 이 글이 마음에 들었다면 https://www.uxreviewer.com/ 에서 다른 게임 해체분석을 확인하거나 컨설팅 문의로 연락 주기 바란다.

---

원문: [How to Crack the Match 3 Code?- Part 2](https://www.gameanalytics.com/blog/crack-the-match-3-code-part-2) · Om Tandon · 최종 수정 2025-03-17 · gameanalytics.com
