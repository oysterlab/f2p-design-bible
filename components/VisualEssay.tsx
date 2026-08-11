"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Coins,
  Database,
  Eye,
  FileCode2,
  FlaskConical,
  Gamepad2,
  Gem,
  Gift,
  HelpCircle,
  Layers3,
  ListChecks,
  LockKeyhole,
  MousePointerClick,
  PackageCheck,
  PlayCircle,
  RefreshCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  TimerReset,
  TrendingUp,
  Trophy,
  Users,
  WalletCards,
  XCircle,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { VisualKey } from "../lib/book-types";

type Props = { visual: VisualKey; description?: string };
type IconType = ComponentType<{ "aria-hidden"?: boolean }>;

function FigureShell({
  eyebrow,
  title,
  children,
  note,
  editorialSpec,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  note?: string;
  editorialSpec?: string;
}) {
  return (
    <figure className="visual-essay f2p-visual" aria-label={`${eyebrow}: ${title}`}>
      <figcaption>
        <span>{eyebrow}</span>
        <h3>{title}</h3>
      </figcaption>
      <div className="visual-body">{children}</div>
      {note ? <p className="visual-source">{note}</p> : null}
      {editorialSpec ? <span className="sr-only">{editorialSpec}</span> : null}
    </figure>
  );
}

function Flow({
  items,
}: {
  items: Array<{ icon: IconType; label: string; detail: string; tone?: string }>;
}) {
  return (
    <div className="visual-flow">
      {items.map(({ icon: Icon, label, detail, tone }, index) => (
        <div className={`visual-flow-item tone-${tone ?? "default"}`} key={`${label}-${index}`}>
          <div>
            <Icon aria-hidden="true" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <strong>{label}</strong>
          <small>{detail}</small>
          {index < items.length - 1 ? <ArrowRight className="visual-flow-arrow" aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function SystemMap({ editorialSpec }: { editorialSpec?: string }) {
  const systems = [
    { icon: Gamepad2, label: "Core Gameplay", detail: "입력 · 판정 · 즉시 결과", tone: "action" },
    { icon: Database, label: "Meta Progression", detail: "계정 상태 · 강화 · 해금", tone: "state" },
    { icon: Coins, label: "Game Economy", detail: "획득처 · 소비처 · 잔액", tone: "economy" },
    { icon: CalendarClock, label: "Retention / LiveOps", detail: "복귀 조건 · 갱신 · 이벤트", tone: "retention" },
    { icon: BadgeDollarSign, label: "Monetization", detail: "광고 · 상품 · 결제 결과", tone: "money" },
  ];

  return (
    <FigureShell eyebrow="시스템 구조" title="한 기능의 출력값이 다른 기능의 입력값이 된다" editorialSpec={editorialSpec}>
      <div className="system-map">
        {systems.map(({ icon: Icon, label, detail, tone }, index) => (
          <div className={`system-map-step tone-${tone}`} key={label}>
            <div className="system-map-index">{String(index + 1).padStart(2, "0")}</div>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
      <div className="system-map-state">
        <TrendingUp aria-hidden="true" />
        <div>
          <strong>공유 상태</strong>
          <span>진행도 · 재화 · 아이템 · 시간 · 구매·광고 결과</span>
        </div>
      </div>
    </FigureShell>
  );
}

function EvidenceLevels({ editorialSpec }: { editorialSpec?: string }) {
  const levels = [
    { icon: Eye, label: "확인된 실행", detail: "실행 코드가 값을 읽고 상태를 변경하는 경로까지 확인", mark: "사실로 기술" },
    { icon: FileCode2, label: "지원 구조", detail: "구현과 저장 형식은 있으나 현재 서비스 활성화는 불명", mark: "활성 여부 분리" },
    { icon: Layers3, label: "복구 자산", detail: "이미지·애니메이션과 연결 설정이 남아 있음", mark: "재구성 표시" },
    { icon: HelpCircle, label: "미확인", detail: "서버 응답, 실제 계정 또는 사용자 데이터가 필요", mark: "가설로 유지" },
  ];
  return (
    <FigureShell eyebrow="증거 수준" title="확인 범위가 다르면 문장의 단정 수준도 달라진다" editorialSpec={editorialSpec}>
      <div className="evidence-levels">
        {levels.map(({ icon: Icon, label, detail, mark }, index) => (
          <div className="evidence-card" key={label}>
            <div className="evidence-card-head"><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
            <strong>{label}</strong><p>{detail}</p><b>{mark}</b>
          </div>
        ))}
      </div>
      <p className="visual-thesis">기능이 존재한다는 사실만으로 재방문율이나 매출 효과를 확정하지 않는다.</p>
    </FigureShell>
  );
}

function TransactionTimeline({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="원자적 처리" title="판정과 저장을 끝낸 뒤 화면 연출을 실행한다" editorialSpec={editorialSpec}>
      <Flow items={[
        { icon: MousePointerClick, label: "입력", detail: "드래그·제출·구매 요청" },
        { icon: ListChecks, label: "조건 검사", detail: "대상·수량·비용·중복 확인" },
        { icon: LockKeyhole, label: "상태 예약", detail: "동시 입력과 이중 지급 차단" },
        { icon: Database, label: "상태 변경", detail: "차감·제거·보상·진행 기록" },
        { icon: Save, label: "저장", detail: "성공 결과를 기준 기록에 확정" },
        { icon: PlayCircle, label: "연출", detail: "애니메이션·숫자·다음 목표 표시" },
      ]} />
      <div className="status-strip"><b>실패 시</b><span>예약 해제 → 원래 상태 복원 → 재시도 가능 상태 표시</span></div>
    </FigureShell>
  );
}

function LoopHorizons({ editorialSpec }: { editorialSpec?: string }) {
  const horizons = [
    ["10초", "행동", "입력과 즉시 결과"],
    ["3분", "목표", "주문·스테이지 완료"],
    ["20분", "세션", "자원 소비와 종료"],
    ["1일", "일일", "갱신·과제·회복"],
    ["2주", "이벤트", "기간 점수와 정산"],
    ["90일", "장기", "지역·수집·계정 상태"],
  ];
  return (
    <FigureShell eyebrow="시간 범위" title="각 범위마다 시작·완료·보상·초기화 조건이 필요하다" editorialSpec={editorialSpec}>
      <div className="horizon-axis">
        {horizons.map(([time, label, detail]) => (
          <div key={time}><b>{time}</b><strong>{label}</strong><span>{detail}</span></div>
        ))}
      </div>
      <p className="visual-thesis">표시 시간은 고정 공식이 아니라 설계 범위를 비교하기 위한 예시다.</p>
    </FigureShell>
  );
}

function GameStateComparison({ editorialSpec }: { editorialSpec?: string }) {
  const rows = [
    ["Core 입력", "생산·Merge", "이동·정지·회피"],
    ["한 번의 목표", "활성 주문 제출", "전투 구간 통과"],
    ["세션 상태", "보드·에너지·주문", "체력·임시 능력"],
    ["영구 상태", "지역·건물·수집", "장비·캐릭터·강화"],
  ];
  return (
    <FigureShell eyebrow="상태 비교" title="Core가 달라도 저장 상태의 역할은 같은 표로 비교할 수 있다" editorialSpec={editorialSpec}>
      <div className="comparison-grid">
        <b>구분</b><b>Tasty Travels</b><b>Archero</b>
        {rows.flatMap((row) => row.map((cell, index) => <span className={index === 0 ? "row-label" : ""} key={`${row[0]}-${cell}`}>{cell}</span>))}
      </div>
      <p className="visual-thesis">같은 장르라는 뜻이 아니라, 상태를 분류하는 설계 문서가 재사용된다는 뜻이다.</p>
    </FigureShell>
  );
}

function EnergyOptions({ editorialSpec }: { editorialSpec?: string }) {
  const options = [
    { icon: Clock3, label: "기다리기", cost: "시간", result: "자연 회복" },
    { icon: Gift, label: "무료 수령", cost: "횟수 제한", result: "설정 지급량" },
    { icon: PlayCircle, label: "광고 완료", cost: "시청 시간", result: "에너지 25" },
    { icon: Gem, label: "보석 사용", cost: "게임 안 재화", result: "상품별 지급량" },
    { icon: BadgeDollarSign, label: "현금 상품", cost: "실제 화폐", result: "표시된 구성품" },
  ];
  return (
    <FigureShell eyebrow="에너지 부족" title="같은 부족 상태에 시간·광고·재화·결제 경로를 분리한다" editorialSpec={editorialSpec} note="Tasty Travels의 에너지·보석 복구 자산과 로컬 기본값을 이용한 설명용 재구성. 무료 슬롯과 상품의 현재 라이브 값은 미확인.">
      <div className="resource-heading">
        <img src="images/tasty/energy.png" alt="복구된 에너지 아이콘" />
        <strong>에너지 부족 상태</strong>
        <img src="images/tasty/gem.png" alt="복구된 보석 아이콘" />
      </div>
      <div className="option-rows">
        {options.map(({ icon: Icon, label, cost, result }) => (
          <div key={label}><Icon aria-hidden="true" /><strong>{label}</strong><span>{cost}</span><b>{result}</b></div>
        ))}
      </div>
    </FigureShell>
  );
}

function EnergyCurve({ editorialSpec }: { editorialSpec?: string }) {
  const points = [0, 25, 50, 75, 100];
  return (
    <FigureShell eyebrow="시간 계산" title="에너지는 일정 간격으로 증가하고 상한에서 멈춘다" editorialSpec={editorialSpec} note="복구된 로컬 기본값: 상한 100, 120초마다 1 회복, 광고 완료 시 25 지급. 현재 라이브 값은 서버 설정에 따라 달라질 수 있음.">
      <div className="energy-chart">
        <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
        <div className="energy-bars">
          {points.map((point, index) => <div key={point}><i style={{ height: `${Math.max(point, 3)}%` }} /><b>{point}</b><span>{index * 50}분</span></div>)}
        </div>
      </div>
      <div className="ad-jump"><PlayCircle aria-hidden="true" /><span>광고 완료 시 현재 잔액에 25를 더한다. 자연 회복 타이머와 별도 거래로 기록한다.</span></div>
    </FigureShell>
  );
}

function OrderPipeline({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="목표 생성" title="후보를 만든 뒤 금지 규칙과 행동량을 검사한다" editorialSpec={editorialSpec}>
      <Flow items={[
        { icon: Database, label: "현재 상태", detail: "해금·보드·보관함·최근 주문" },
        { icon: Layers3, label: "후보 생성", detail: "가능한 음식과 수량 목록" },
        { icon: ShieldCheck, label: "금지 규칙", detail: "미해금·중복·불가능 후보 제거" },
        { icon: TimerReset, label: "행동량 계산", detail: "예상 생산·Merge·공간 비용" },
        { icon: SlidersHorizontal, label: "가중 선택", detail: "난이도 범위 안에서 후보 결정" },
        { icon: Save, label: "주문 저장", detail: "요구량·보상·생성 시점 기록" },
      ]} />
      <div className="status-strip warning"><b>확인 범위</b><span>복구 자료에서 결제 이력을 주문 후보 입력값으로 사용하는 경로는 확인되지 않았다.</span></div>
    </FigureShell>
  );
}

function UnlockGraph({ editorialSpec }: { editorialSpec?: string }) {
  const paths = [
    ["생산", "Merge", "주문 제출", "에너지 부족", "광고·보석 선택"],
    ["생산", "보드 사용", "공간 부족", "보관함 안내", "확장 선택"],
    ["기본 주문", "일일 과제", "이벤트 안내", "기간 진행", "종료 정산"],
  ];
  return (
    <FigureShell eyebrow="해금 순서" title="새 기능은 선행 행동을 이해한 뒤 연결한다" editorialSpec={editorialSpec}>
      <div className="dependency-paths">
        {paths.map((path) => <div key={path.join("-")}>{path.map((item, index) => <span key={item} className={index === path.length - 1 ? "terminal" : ""}>{item}{index < path.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</span>)}</div>)}
      </div>
      <p className="visual-thesis">레벨 번호가 아니라 사용자가 이미 이해한 상태와 다음 기능의 의존 관계를 먼저 쓴다.</p>
    </FigureShell>
  );
}

function ProgressionTypes({ editorialSpec }: { editorialSpec?: string }) {
  const items = [
    ["수치 성장", "성공률·결과량"], ["기능 해금", "가능한 행동"], ["콘텐츠 해금", "플레이 공간"],
    ["용량 확장", "유지할 선택 수"], ["수집", "완성 상태"], ["외형", "표현 상태"], ["시즌", "기간 보상"],
  ];
  return (
    <FigureShell eyebrow="Meta Progression" title="저장되는 값과 다음 세션에서 바뀌는 조건을 함께 쓴다" editorialSpec={editorialSpec}>
      <div className="progression-grid">
        {items.map(([label, effect], index) => <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><ArrowRight aria-hidden="true" /><b>{effect}</b></div>)}
      </div>
    </FigureShell>
  );
}

function SourceSink({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="경제 원장" title="획득과 소비를 같은 잔액을 기준으로 기록한다" editorialSpec={editorialSpec}>
      <div className="source-sink">
        <section><h4>Source · 획득처</h4>{["플레이 보상", "시간 회복", "무료 수령", "광고 완료"].map((item) => <span key={item}><b>+</b>{item}</span>)}</section>
        <div className="balance-node"><WalletCards aria-hidden="true" /><strong>재화 잔액</strong><span>이전 잔액 + 획득 − 소비</span></div>
        <section><h4>Sink · 소비처</h4>{["행동 비용", "성장 비용", "용량 확장", "상품 구매"].map((item) => <span key={item}><b>−</b>{item}</span>)}</section>
      </div>
      <div className="status-strip"><b>각 행의 필드</b><span>조건 · 수량 · 일일 횟수 · 갱신 시각 · 거래 식별값</span></div>
    </FigureShell>
  );
}

function BalanceCurve({ editorialSpec }: { editorialSpec?: string }) {
  const normal = [20, 25, 30, 37, 43, 48, 54, 20, 27, 31, 38, 43, 48, 55];
  const saver = [20, 29, 39, 48, 58, 66, 77, 50, 61, 70, 81, 89, 94, 100];
  const spender = [20, 18, 22, 17, 25, 20, 28, 8, 14, 11, 18, 13, 21, 17];
  return (
    <FigureShell eyebrow="14일 계산 예제" title="평균 잔액이 같아도 소비 행동에 따라 부족 구간이 다르다" editorialSpec={editorialSpec} note="실제 게임 데이터가 아닌 경제표 검토용 계산 예제.">
      <div className="balance-chart">
        {[normal, saver, spender].map((series, row) => <div className={`series series-${row}`} key={row}><b>{["중간 사용자", "소비하지 않음", "선택 강화 빈번"][row]}</b><div>{series.map((value, day) => <i key={day} style={{ height: `${value}%` }} title={`${day + 1}일: ${value}`} />)}</div></div>)}
        <span className="sink-marker">8일째 필수 소비</span>
      </div>
    </FigureShell>
  );
}

function CurrencyNetwork({ editorialSpec }: { editorialSpec?: string }) {
  const paths = [
    { icon: BadgeDollarSign, from: "실제 화폐", via: "프리미엄 재화", to: "에너지 · 공간 · 아이템", tone: "coral" },
    { icon: Gamepad2, from: "기본 플레이", via: "일반 재화", to: "건물 · 지역 진행", tone: "jade" },
    { icon: CalendarClock, from: "이벤트 플레이", via: "이벤트 재화", to: "기간 상점 · 정산", tone: "gold" },
  ];
  return (
    <FigureShell eyebrow="다중 재화" title="재화마다 획득처와 사용 범위를 제한해 가격 기준을 분리한다" editorialSpec={editorialSpec}>
      <div className="currency-paths">
        {paths.map(({ icon: Icon, from, via, to, tone }) => <div className={`tone-${tone}`} key={from}><Icon aria-hidden="true" /><span>{from}</span><ArrowRight aria-hidden="true" /><strong>{via}</strong><ArrowRight aria-hidden="true" /><b>{to}</b></div>)}
      </div>
      <div className="status-strip"><b>필수 기록</b><span>환율 · 구매 단위 · 무료 공급 · 보유 상한 · 종료 뒤 처리</span></div>
    </FigureShell>
  );
}

function Probability({ editorialSpec }: { editorialSpec?: string }) {
  const bars = [["콜라", 80], ["아이스티", 10], ["날치알", 10]] as const;
  return (
    <FigureShell eyebrow="가중 결과" title="가중치와 누적 성공 확률은 서로 다른 질문에 답한다" editorialSpec={editorialSpec} note="복구된 후보 가중치 800:100:100을 합계 1,000으로 정규화한 계산. 아래 누적값은 10% 독립 추첨을 가정한 값이며 실측 분포가 아님.">
      <div className="probability-bars">
        {bars.map(([label, value]) => <div key={label}><strong>{label}</strong><span><i style={{ width: `${value}%` }} /></span><b>{value}%</b></div>)}
      </div>
      <div className="cumulative-points">
        <div><b>10회</b><strong>65.1%</strong><span>한 번 이상 성공</span></div>
        <div><b>22회</b><strong>90.2%</strong><span>한 번 이상 성공</span></div>
        <div><b>29회</b><strong>95.3%</strong><span>한 번 이상 성공</span></div>
      </div>
    </FigureShell>
  );
}

function BoardSpace({ editorialSpec }: { editorialSpec?: string }) {
  const items = [1, 1, 2, 2, 3, 4];
  return (
    <FigureShell eyebrow="7 × 9 보드" title="합치기 가능한 쌍과 보관함이 실제 작업 공간을 바꾼다" editorialSpec={editorialSpec} note="복구 자산과 확인된 보드 규격을 이용한 설명용 재구성. 실제 실행 화면이 아님.">
      <div className="board-comparison">
        {["정리 전 · 빈칸 2", "합치기·보관 후 · 빈칸 5"].map((label, boardIndex) => <section key={label}><h4>{label}</h4><div className="merge-board" style={{ backgroundImage: 'url("images/tasty/main-board.png")' }}>{Array.from({ length: 63 }, (_, index) => <span key={index} className={index >= 63 - (boardIndex ? 5 : 2) ? "empty" : ""}>{index < items.length - boardIndex * 2 ? <img src={`images/tasty/items/drink-${items[index]}.png`} alt="복구 음식 아이콘" /> : null}</span>)}</div></section>)}
      </div>
    </FigureShell>
  );
}

function ResumeState({ editorialSpec }: { editorialSpec?: string }) {
  const pairs = [["보드", "같은 배치"], ["활성 목표", "같은 요구량"], ["재화", "저장 잔액"], ["타이머", "경과 반영"], ["이벤트", "남은 기간 확인"]];
  return (
    <FigureShell eyebrow="종료와 재개" title="종료 시 저장한 상태를 다음 실행의 첫 화면에 복원한다" editorialSpec={editorialSpec}>
      <div className="resume-map">
        <div className="resume-side"><Save aria-hidden="true" /><strong>앱 종료 시 저장</strong></div>
        <div className="resume-pairs">{pairs.map(([left, right]) => <div key={left}><span>{left}</span><ArrowRight aria-hidden="true" /><b>{right}</b></div>)}</div>
        <div className="resume-side"><RefreshCcw aria-hidden="true" /><strong>다음 실행에 복원</strong></div>
      </div>
      <p className="visual-thesis">미완성 목표를 그대로 재개하려면 목표뿐 아니라 그 목표를 수행할 자원과 시간도 함께 복원해야 한다.</p>
    </FigureShell>
  );
}

function EventSeparation({ editorialSpec }: { editorialSpec?: string }) {
  const events = [["event-farm.png", "농장 이벤트"], ["event-mine.png", "광산 이벤트"], ["event-race.png", "레이스 이벤트"]];
  return (
    <FigureShell eyebrow="기본 게임과 이벤트" title="공유하는 상태와 분리하는 상태를 출시 전에 정한다" editorialSpec={editorialSpec} note="Tasty Travels에서 복구된 이벤트 배경 자산을 이용한 설명용 구성. 현재 라이브 활성화 여부와 실제 UI 배치는 미확인.">
      <div className="event-assets">{events.map(([src, label]) => <figure key={src}><img src={`images/tasty/${src}`} alt={`${label} 복구 배경`} /><figcaption>{label}</figcaption></figure>)}</div>
      <div className="event-state-grid"><span>공유: 계정 레벨 · 공통 보상</span><span>분리: 이벤트 보드 · 에너지 · 전용 재화</span><span>종료: 미수령 보상 · 잔여 재화 · 상태 보존</span></div>
    </FigureShell>
  );
}

function CollectionState({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="수집 상태" title="획득·중복·완성·재시작의 처리 규칙을 분리한다" editorialSpec={editorialSpec}>
      <Flow items={[
        { icon: PackageCheck, label: "개별 카드", detail: "신규·중복 판정" },
        { icon: Layers3, label: "그룹 완성", detail: "세트 조건과 보상" },
        { icon: Trophy, label: "앨범 완성", detail: "전체 완료와 정산" },
        { icon: RefreshCcw, label: "재시작", detail: "보존·초기화 범위" },
      ]} />
      <div className="status-strip"><b>중복 경로</b><span>중복 카드 → 별 또는 교환 단위 → 교환 조건 → 수령 기록</span></div>
    </FigureShell>
  );
}

function CompletionDistribution({ editorialSpec }: { editorialSpec?: string }) {
  const requirements = [[3, 88], [5, 62], [8, 31]] as const;
  return (
    <FigureShell eyebrow="과제 난이도" title="일일 요구량을 평균이 아니라 완료 가능 분포와 비교한다" editorialSpec={editorialSpec} note="예시 데이터. 실제 사용자 로그가 확보되면 진행 구간별 25·50·75백분위로 다시 계산해야 함.">
      <div className="completion-bars">{requirements.map(([goal, rate]) => <div key={goal}><b>주문 {goal}회</b><span><i style={{ width: `${rate}%` }} /></span><strong>{rate}% 예상 완료</strong></div>)}</div>
      <div className="percentile-strip"><span>P25 · 3회</span><span>P50 · 5회</span><span>P75 · 7회</span></div>
    </FigureShell>
  );
}

function AdState({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="보상형 광고" title="광고 닫힘과 보상 획득을 같은 사건으로 처리하지 않는다" editorialSpec={editorialSpec}>
      <div className="ad-state-machine">
        <div><Clock3 aria-hidden="true" /><strong>준비 확인</strong><span>준비 안 됨 → 원래 화면</span></div>
        <ArrowRight aria-hidden="true" />
        <div><PlayCircle aria-hidden="true" /><strong>표시 중</strong><span>사용자 선택 뒤 재생</span></div>
        <ArrowRight aria-hidden="true" />
        <div><CheckCircle2 aria-hidden="true" /><strong>보상 콜백</strong><span>완료 조건 확인</span></div>
        <ArrowRight aria-hidden="true" />
        <div><Gift aria-hidden="true" /><strong>지급 완료</strong><span>거래 중복 검사</span></div>
      </div>
      <div className="failure-branches"><span><XCircle aria-hidden="true" />표시 실패 → 지급 없음 · 재시도</span><span><XCircle aria-hidden="true" />보상 전 닫힘 → 지급 없음 · 원래 화면</span></div>
    </FigureShell>
  );
}

function PurchaseFlow({ editorialSpec }: { editorialSpec?: string }) {
  const lanes = [
    ["게임", "상품 조회", "구매 요청", "지급 표시"],
    ["스토어", "가격·통화 반환", "결제 처리", "구매 상태 반환"],
    ["게임 서버", "상품 검증", "구매 검증", "지급 명령"],
    ["계정 원장", "보유 상태", "거래 중복 확인", "혜택 저장"],
  ];
  return (
    <FigureShell eyebrow="앱 내 결제" title="구매 성공, 서버 검증과 혜택 지급을 각각 기록한다" editorialSpec={editorialSpec}>
      <div className="purchase-lanes">{lanes.map((lane) => <div key={lane[0]}><strong>{lane[0]}</strong>{lane.slice(1).map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div>)}</div>
      <div className="status-strip"><b>재배송 조건</b><span>스토어 구매는 성공했지만 혜택 지급 기록이 없으면 같은 구매를 중복 없이 다시 처리한다.</span></div>
    </FigureShell>
  );
}

function OfferMatrix({ editorialSpec }: { editorialSpec?: string }) {
  const rows = [["소형 묶음", "₩1,100", "100", "11원", "1회"], ["중형 묶음", "₩5,500", "575", "9.6원", "주간"], ["대형 묶음", "₩11,000", "1,250", "8.8원", "상시"]];
  return (
    <FigureShell eyebrow="상품 비교" title="보너스 문구보다 실제 화폐 기준 단가와 제한을 먼저 표시한다" editorialSpec={editorialSpec} note="설계 검토용 예시 수치. Tasty Travels의 현재 라이브 가격이 아님.">
      <div className="offer-table"><div><b>상품</b><b>가격</b><b>환산량</b><b>단가</b><b>제한</b></div>{rows.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
      <div className="status-strip warning"><b>‘+100%’ 표시</b><span>비교 기준 상품, 기준 단가와 추가 구성품의 계산 방식을 함께 명시한다.</span></div>
    </FigureShell>
  );
}

function AnalyticsFunnel({ editorialSpec }: { editorialSpec?: string }) {
  const steps = [["화면 노출", 1000], ["행동 시작", 720], ["목표 완료", 510], ["보상 수령", 486]] as const;
  return (
    <FigureShell eyebrow="Funnel" title="순서가 있는 단계마다 사용자 수와 탈락 이유를 기록한다" editorialSpec={editorialSpec} note="형식을 설명하기 위한 예시 수치.">
      <div className="funnel">{steps.map(([label, users], index) => <div key={label} style={{ width: `${100 - index * 15}%` }}><strong>{label}</strong><b>{users.toLocaleString()}명</b><span>{index ? `${Math.round(users / steps[index - 1][1] * 100)}% 통과` : "기준 100%"}</span></div>)}</div>
    </FigureShell>
  );
}

function AnalyticsMap({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="이벤트 로그" title="화면 행동과 경제 거래를 같은 상태 변경에 연결한다" editorialSpec={editorialSpec}>
      <div className="analytics-map">
        <section><MousePointerClick aria-hidden="true" /><strong>행동</strong><span>진입 · 클릭 · 시작 · 취소</span></section>
        <ArrowRight aria-hidden="true" />
        <section><Database aria-hidden="true" /><strong>상태 변경</strong><span>차감 · 지급 · 저장 · 오류</span></section>
        <ArrowRight aria-hidden="true" />
        <section><BarChart3 aria-hidden="true" /><strong>분석</strong><span>Funnel · 잔액 · 분포 · 이탈</span></section>
      </div>
      <div className="status-strip"><b>공통 속성</b><span>사용자 진행 구간 · 설정 버전 · 이전·이후 잔액 · 거래 결과 · 서버 시각</span></div>
    </FigureShell>
  );
}

function Experiment({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="A/B 실험" title="한 번에 한 조건을 바꾸고 성공과 중단 기준을 사전 등록한다" editorialSpec={editorialSpec}>
      <div className="experiment-grid">
        <section><span>대조군 A</span><strong>기존 조건</strong><p>에너지 보상 20</p><b>무작위 배정</b></section>
        <FlaskConical aria-hidden="true" />
        <section><span>실험군 B</span><strong>변경 조건</strong><p>에너지 보상 25</p><b>동일 기간·동일 지표</b></section>
      </div>
      <div className="experiment-outcomes"><span><CheckCircle2 aria-hidden="true" />주지표: 다음 행동 완료율</span><span><ShieldCheck aria-hidden="true" />보호지표: 이탈·오류·광고 거절</span><span><XCircle aria-hidden="true" />중단: 지급 오류·불만 급증</span></div>
    </FigureShell>
  );
}

function Cohort({ editorialSpec }: { editorialSpec?: string }) {
  const values = [[100, 42, 31, 25, 20], [100, 45, 34, 28, 23], [100, 39, 29, 22, 18], [100, 47, 36, 30, 25]];
  return (
    <FigureShell eyebrow="Cohort" title="같은 시작일의 사용자 집단을 같은 경과일로 비교한다" editorialSpec={editorialSpec} note="형식을 설명하기 위한 예시 비율.">
      <div className="cohort-grid"><b>설치 주</b>{["D0", "D1", "D3", "D7", "D14"].map((day) => <b key={day}>{day}</b>)}{values.flatMap((row, r) => [<strong key={`w-${r}`}>{r + 1}주</strong>, ...row.map((value, c) => <span key={`${r}-${c}`} style={{ opacity: .25 + value / 135 }}>{value}%</span>)])}</div>
    </FigureShell>
  );
}

function RemoteConfig({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="원격 설정" title="설정 변경은 검증·점진 배포·되돌리기 절차와 함께 운영한다" editorialSpec={editorialSpec}>
      <Flow items={[
        { icon: SlidersHorizontal, label: "값 작성", detail: "범위·기본값·대상 조건" },
        { icon: ClipboardCheck, label: "검증", detail: "형식·경제·호환성 검사" },
        { icon: Users, label: "소규모 배포", detail: "일부 사용자에게 점진 적용" },
        { icon: BarChart3, label: "보호지표", detail: "오류·이탈·지급 상태 확인" },
        { icon: RefreshCcw, label: "확대·복구", detail: "안전하면 확대, 문제면 이전 값" },
      ]} />
      <div className="status-strip warning"><b>금지</b><span>클라이언트 비밀 저장, 플랫폼 요구 사항 우회, 검증 없는 전체 사용자 즉시 적용</span></div>
    </FigureShell>
  );
}

function TastyMergeChain({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="확인된 사례 · 음료" title="15단계 계보에서 목표 단계가 오를수록 필요한 1단계 수가 두 배가 된다" editorialSpec={editorialSpec} note="Tasty Travels에서 복구한 음식 아이콘을 단계 순서로 배열한 설명용 재구성. 내부 식별자와 파일 이름은 표시하지 않음.">
      <div className="merge-chain">{Array.from({ length: 15 }, (_, index) => <div key={index}><span>{index + 1}단계</span><img src={`images/tasty/items/drink-${index + 1}.png`} alt={`음료 ${index + 1}단계`} /><b>{index < 10 ? `${2 ** index}개` : `2^${index}개`}</b></div>)}</div>
      <p className="visual-thesis">표시 수량은 손실·추가 생산·시작 지급품을 제외한 이론 최소 재료 수다.</p>
    </FigureShell>
  );
}

function TastyFirstOrder({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="확인된 사례 · 첫 주문" title="실제 시작 경로와 생산 기능 시험은 서로 다른 계산이다" editorialSpec={editorialSpec} note="복구 자산과 확인된 시작 설정을 이용한 설명용 재구성. 실제 실행 화면이 아님.">
      <div className="first-order-compare">
        <section><span>실제 시작</span><strong>보드에 오렌지 주스 2개 지급</strong><div><img src="images/tasty/items/drink-3.png" alt="오렌지 주스" /><img src="images/tasty/items/drink-3.png" alt="오렌지 주스" /><ArrowRight aria-hidden="true" /><b>1개 제출</b></div><p>첫 주문은 이미 지급된 음식 중 1개를 요구한다.</p></section>
        <section><span>독립 기능 시험</span><strong>시작 지급품을 제외한 생산 경로</strong><div><em>콜라 4</em><ArrowRight aria-hidden="true" /><em>아이스티 2</em><ArrowRight aria-hidden="true" /><em>오렌지 주스 1</em></div><p>생산과 Merge 기능만 시험할 때의 최소 경로다.</p></section>
      </div>
    </FigureShell>
  );
}

function TastySystemMap({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="Tasty Travels" title="확인된 실행, 지원 구조와 미확인 성과를 한 지도에서 분리한다" editorialSpec={editorialSpec} note="복구 자산과 설정을 이용한 설명용 재구성. 실제 서비스 화면이나 사용자 성과표가 아님.">
      <div className="tasty-system-map">
        <section><img src="images/tasty/items/snack-stall.png" alt="복구된 생산 시설" /><strong>생산 · Merge · 주문</strong><span>확인된 실행</span></section>
        <ArrowRight aria-hidden="true" />
        <section><img src="images/tasty/coin.png" alt="복구된 코인" /><strong>보상 · 건물 · 지역</strong><span>실행과 지원 구조</span></section>
        <ArrowRight aria-hidden="true" />
        <section><img src="images/tasty/energy.png" alt="복구된 에너지" /><strong>회복 · 광고 · 보석</strong><span>확인된 실행</span></section>
      </div>
      <div className="tasty-meta-row"><span>음식 발견 · 카드 앨범</span><span>출석 · 과제 · 이벤트</span><span>실제 재방문·매출 효과는 미확인</span></div>
    </FigureShell>
  );
}

function TastyEconomy({ editorialSpec }: { editorialSpec?: string }) {
  return (
    <FigureShell eyebrow="Tasty Travels · 경제" title="에너지 흐름과 주문 보상 흐름을 별도 원장으로 계산한다" editorialSpec={editorialSpec} note="복구된 로컬 기본값과 지원 구조를 이용한 설명용 재구성. 모든 건물과 라이브 서버에 동일하게 적용되는지는 미확인.">
      <div className="tasty-economy">
        <div><span>자연 회복 · 광고 25 · 무료 지급 · 보석</span><ArrowRight aria-hidden="true" /><img src="images/tasty/energy.png" alt="에너지" /><strong>에너지 잔액</strong><ArrowRight aria-hidden="true" /><b>생산 행동</b><small>상한 100 · 120초당 1 · 광고 하루 기본 4회</small></div>
        <div><span>주문 제출</span><ArrowRight aria-hidden="true" /><img src="images/tasty/coin.png" alt="머지 코인" /><strong>머지 코인</strong><ArrowRight aria-hidden="true" /><b>건물 비용 · 단계 보상</b><small>지원 구조 · 전체 적용 범위 미확인</small></div>
      </div>
    </FigureShell>
  );
}

export function VisualEssay({ visual, description }: Props) {
  switch (visual) {
    case "evidence-levels": return <EvidenceLevels editorialSpec={description} />;
    case "transaction-timeline": return <TransactionTimeline editorialSpec={description} />;
    case "loop-horizons": return <LoopHorizons editorialSpec={description} />;
    case "game-state-comparison": return <GameStateComparison editorialSpec={description} />;
    case "energy-options": return <EnergyOptions editorialSpec={description} />;
    case "energy-curve": return <EnergyCurve editorialSpec={description} />;
    case "order-pipeline": return <OrderPipeline editorialSpec={description} />;
    case "unlock-graph": return <UnlockGraph editorialSpec={description} />;
    case "progression-types": return <ProgressionTypes editorialSpec={description} />;
    case "source-sink": return <SourceSink editorialSpec={description} />;
    case "balance-curve": return <BalanceCurve editorialSpec={description} />;
    case "currency-network": return <CurrencyNetwork editorialSpec={description} />;
    case "probability": return <Probability editorialSpec={description} />;
    case "board-space": return <BoardSpace editorialSpec={description} />;
    case "resume-state": return <ResumeState editorialSpec={description} />;
    case "event-separation": return <EventSeparation editorialSpec={description} />;
    case "collection-state": return <CollectionState editorialSpec={description} />;
    case "completion-distribution": return <CompletionDistribution editorialSpec={description} />;
    case "ad-state": return <AdState editorialSpec={description} />;
    case "purchase-flow": return <PurchaseFlow editorialSpec={description} />;
    case "offer-matrix": return <OfferMatrix editorialSpec={description} />;
    case "analytics-funnel": return <AnalyticsFunnel editorialSpec={description} />;
    case "analytics-map": return <AnalyticsMap editorialSpec={description} />;
    case "experiment": return <Experiment editorialSpec={description} />;
    case "cohort": return <Cohort editorialSpec={description} />;
    case "remote-config": return <RemoteConfig editorialSpec={description} />;
    case "tasty-merge-chain": return <TastyMergeChain editorialSpec={description} />;
    case "tasty-first-order": return <TastyFirstOrder editorialSpec={description} />;
    case "tasty-system-map": return <TastySystemMap editorialSpec={description} />;
    case "tasty-economy": return <TastyEconomy editorialSpec={description} />;
    case "system-map": return <SystemMap editorialSpec={description} />;
  }
}
