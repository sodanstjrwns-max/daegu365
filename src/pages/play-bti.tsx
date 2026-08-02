/* ============================================================
   대구365치과 · 치아BTI
   16유형 구강 심리테스트 (MBTI 패러디)
   - 4축: 관리(M/N) · 통증(P/E) · 미용(W/H) · 비용(B/L)
   - 12문항 → 16유형 결과 + 추천 진료/원장
   ============================================================ */

const QUESTIONS = [
  // 축1: 관리형 M(Manager) vs 자연형 N(Nature)
  { axis:'1', q:'양치할 때 나는…', a:{text:'정해진 시간(2분)·순서대로 꼼꼼히',v:'M'}, b:{text:'그날 컨디션대로 적당히',v:'N'} },
  { axis:'1', q:'치실/치간칫솔은…', a:{text:'매일 사용한다',v:'M'}, b:{text:'생각날 때만',v:'N'} },
  { axis:'1', q:'정기검진 주기는…', a:{text:'6개월 알람 맞춰놓음',v:'M'}, b:{text:'아플 때만 가는 편',v:'N'} },
  // 축2: 무통선호 P(Painless) vs 견딤형 E(Endure)
  { axis:'2', q:'치과 마취 주사는…', a:{text:'생각만 해도 손에 땀이…',v:'P'}, b:{text:'그냥 참을 만하다',v:'E'} },
  { axis:'2', q:'스케일링 받을 때…', a:{text:'시린 거 정말 싫어요',v:'P'}, b:{text:'견딜 만하다',v:'E'} },
  { axis:'2', q:'수면진정 마취가 가능하다면?', a:{text:'무조건 받겠다',v:'P'}, b:{text:'굳이 필요할까',v:'E'} },
  // 축3: 미용중시 W(Whitening) vs 기능중시 H(Health)
  { axis:'3', q:'치아에서 가장 신경쓰는 건…', a:{text:'색·모양·라인',v:'W'}, b:{text:'씹는 기능·잇몸',v:'H'} },
  { axis:'3', q:'미백·라미네이트에 대해서…', a:{text:'기회되면 꼭 해보고 싶다',v:'W'}, b:{text:'필요 없을 듯',v:'H'} },
  { axis:'3', q:'사진 찍을 때 치아가…', a:{text:'신경 많이 쓰인다',v:'W'}, b:{text:'그닥 의식 안 한다',v:'H'} },
  // 축4: 가성비 B(Budget) vs 프리미엄 L(Luxury)
  { axis:'4', q:'임플란트를 한다면…', a:{text:'합리적 가격이 우선',v:'B'}, b:{text:'최고급 브랜드로',v:'L'} },
  { axis:'4', q:'진료 선택 기준은…', a:{text:'보험 적용 여부 먼저',v:'B'}, b:{text:'결과 퀄리티가 더 중요',v:'L'} },
  { axis:'4', q:'치과 비용에 대한 생각…', a:{text:'아껴쓰는 게 맞다',v:'B'}, b:{text:'건강 투자라 생각',v:'L'} },
]

// 16유형 결과 매핑 (M/N × P/E × W/H × B/L = 16)
const TYPES: Record<string,{name:string,nick:string,emoji:string,color:string,desc:string,strength:string,care:string,doctor:string,treat:string}> = {
  MPWB:{name:'완벽주의 인플루언서',nick:'MPWB',emoji:'💎',color:'#ec4899',desc:'관리도 철저, 미용도 포기 못해. 단, 통증은 절대 사절. 가성비도 챙기는 똑똑한 타입.',strength:'꾸준한 자기관리, 트렌드 민감',care:'무통 미백·심미 보존이 잘 어울려요',doctor:'김상원 원장',treat:'/treatments/whitening'},
  MPWL:{name:'프리미엄 셀럽',nick:'MPWL',emoji:'👑',color:'#c9a876',desc:'관리·미용·무통·프리미엄까지 — 모든 것에 진심. 본인 치아에 투자할 줄 아는 분.',strength:'완벽한 자기관리, 결과 퀄리티 추구',care:'비니크 라미네이트 + 수면 임플란트 추천',doctor:'김성주 대표원장',treat:'/treatments/lamineer'},
  MPHB:{name:'합리적 모범생',nick:'MPHB',emoji:'📚',color:'#3b82f6',desc:'관리는 철저하지만 통증 싫고 가성비 중시. 보험 진료를 잘 활용하는 똑똑이.',strength:'정기검진 충실, 합리적 선택',care:'GBT 에어플로우 + 수면진정 추천',doctor:'정재헌 원장',treat:'/treatments/airflow'},
  MPHL:{name:'안전 추구 VIP',nick:'MPHL',emoji:'🛡️',color:'#10b981',desc:'기능 우선이면서 무통 + 프리미엄 추구. 안전한 치료를 위해 비용 투자 의향 있음.',strength:'장기적 관점, 신뢰 중시',care:'네비게이션 수면 임플란트가 잘 맞아요',doctor:'김성주 대표원장',treat:'/treatments/implant'},
  MEWB:{name:'현실 자취왕',nick:'MEWB',emoji:'💪',color:'#f59e0b',desc:'관리도 잘하고 미용 챙기고 통증도 견딤. 비용까지 합리적 — 갓생 사는 타입.',strength:'멘탈 강함, 자립적',care:'레진·미백 등 가성비 미용진료가 좋아요',doctor:'한지은 원장',treat:'/treatments/aesthetic'},
  MEWL:{name:'욕심쟁이 완벽러',nick:'MEWL',emoji:'✨',color:'#a855f7',desc:'미용 진심, 통증도 OK, 프리미엄 진료 선호. 결과만 좋다면 어떤 과정도 견딘다.',strength:'목표지향적, 결과 중심',care:'세라믹 라미네이트 / 풀 베니어 추천',doctor:'김상원 원장',treat:'/treatments/lamineer'},
  MEHB:{name:'갓생 효율러',nick:'MEHB',emoji:'⚡',color:'#06b6d4',desc:'관리 철저, 기능 중시, 견딤 OK, 가성비 — 시간·비용·통증 다 효율적으로.',strength:'실용주의, 우선순위 명확',care:'정기 스케일링 + 보험 진료 위주가 좋아요',doctor:'김성주 대표원장',treat:'/treatments/perio'},
  MEHL:{name:'장인정신 베테랑',nick:'MEHL',emoji:'🦷',color:'#8b5cf6',desc:'관리·기능·견딤·프리미엄 — 가장 강하고 진지한 타입. 평생 쓸 치아를 만든다.',strength:'장기 관리 의지, 인내심',care:'풀 마우스 리해빌리테이션 적합',doctor:'김성주 대표원장',treat:'/treatments/prosthetic'},
  NPWB:{name:'분위기파 인스타러',nick:'NPWB',emoji:'📸',color:'#f472b6',desc:'평소엔 적당, 미용엔 진심, 통증 NO, 가성비 추구. 즉흥적이지만 외모 챙김.',strength:'센스, 트렌드 캐치',care:'이벤트 미백 + 가성비 라미네이트 추천',doctor:'한지은 원장',treat:'/treatments/whitening'},
  NPWL:{name:'한방의 미녀/미남',nick:'NPWL',emoji:'🌹',color:'#e11d48',desc:'평소 관리 약하지만 한 번 결심하면 프리미엄으로. 통증은 절대 사절.',strength:'결단력, 큰 그림',care:'수면 풀 라미네이트가 잘 어울려요',doctor:'김성주 대표원장',treat:'/treatments/lamineer'},
  NPHB:{name:'겁많은 미루기왕',nick:'NPHB',emoji:'😨',color:'#94a3b8',desc:'관리 약하고 통증 두렵고 비용도 부담 — 치과 가는 게 늘 미뤄지는 분.',strength:'신중함, 감정에 솔직',care:'수면진정 + 보험 진료부터 시작해요',doctor:'정재헌 원장',treat:'/treatments/anesthesia'},
  NPHL:{name:'한 방에 끝내는 결단가',nick:'NPHL',emoji:'🎯',color:'#dc2626',desc:'평소엔 미루다가 큰 결심하면 프리미엄으로 끝내는 타입. 통증 NO.',strength:'추진력, 한 번에 해결',care:'수면 풀 임플란트 / 원데이 진료 추천',doctor:'김성주 대표원장',treat:'/treatments/implant'},
  NEWB:{name:'쿨내 진동 미니멀',nick:'NEWB',emoji:'🧊',color:'#0ea5e9',desc:'적당한 관리, 미용 살짝, 통증 견딤, 가성비. 쿨하고 시크한 타입.',strength:'쿨한 멘탈, 합리성',care:'레진 + 단순 미백 진료가 잘 어울려요',doctor:'최혜정 원장',treat:'/treatments/cavity'},
  NEWL:{name:'쾌락주의 미식가',nick:'NEWL',emoji:'🍷',color:'#7c3aed',desc:'관리는 약해도 미용·프리미엄 진심. 인생은 한 번이라 외치는 타입.',strength:'즐기는 삶, 풍요로움',care:'세라믹 라미네이트 + 인비절라인 추천',doctor:'김상원 원장',treat:'/treatments/ortho'},
  NEHB:{name:'무던한 자연인',nick:'NEHB',emoji:'🌿',color:'#65a30d',desc:'관리·미용·통증·비용 — 모든 것에 무던. 자연 그대로의 마이웨이.',strength:'편안함, 휘둘리지 않음',care:'정기검진 + 보험 진료 정도로 충분',doctor:'김성주 대표원장',treat:'/treatments/prevention'},
  NEHL:{name:'잠수 후 큰 결심파',nick:'NEHL',emoji:'⚓',color:'#0f766e',desc:'평소엔 잠수 타다가 결심하면 프리미엄으로. 견딜 줄도 안다.',strength:'인내심, 큰 결심',care:'풀 임플란트 / 보철 리해빌리테이션',doctor:'김성주 대표원장',treat:'/treatments/prosthetic'},
}

export const PlayBtiPage = () => (
  <>
    <style>{`
      *{margin:0;padding:0;box-sizing:border-box;}
      body{background:linear-gradient(180deg,#0F0A1A 0%,#1A1035 50%,#0F0A1A 100%);color:#fff;font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif;min-height:100vh;}
      .bti-wrap{max-width:520px;margin:0 auto;padding:32px 20px 80px;position:relative;z-index:1;}

      .bti-screen{display:none;}
      .bti-screen.active{display:block;animation:fadeIn 0.5s ease-out;}
      @keyframes fadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

      .bti-back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.78rem;margin-bottom:24px;}
      .bti-back:hover{color:#ec4899;}

      /* INTRO */
      .bti-intro{text-align:center;}
      .bti-emoji-hero{font-size:5rem;display:block;margin:0 auto 18px;animation:heroFloat 3s ease-in-out infinite;}
      @keyframes heroFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
      .bti-logo{font-size:3.2rem;font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:8px;}
      .bti-logo .accent{background:linear-gradient(135deg,#7c3aed,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      .bti-logo-sub{font-size:0.85rem;color:rgba(255,255,255,0.4);letter-spacing:0.18em;margin-bottom:24px;}
      .bti-tagline{font-size:1.7rem;font-weight:900;line-height:1.3;margin-bottom:14px;letter-spacing:-0.02em;}
      .bti-tagline em{font-style:normal;color:#c9a876;}
      .bti-desc{font-size:0.95rem;color:rgba(255,255,255,0.5);line-height:1.65;margin-bottom:28px;}

      .bti-axis-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
      .axis-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 12px;text-align:center;}
      .axis-card .ai{font-size:1.4rem;display:block;margin-bottom:4px;}
      .axis-card .an{font-size:0.78rem;font-weight:700;color:rgba(255,255,255,0.7);}
      .axis-card .ac{font-size:0.66rem;color:rgba(255,255,255,0.35);margin-top:3px;}

      .bti-stats{display:flex;justify-content:center;gap:24px;margin-bottom:22px;}
      .bti-stat{text-align:center;}
      .bti-stat-num{font-size:1.3rem;font-weight:900;color:#fff;}
      .bti-stat-label{font-size:0.66rem;color:rgba(255,255,255,0.35);margin-top:2px;letter-spacing:0.1em;}

      .bti-disclaim{background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);border-radius:12px;padding:12px 14px;margin-bottom:24px;font-size:0.74rem;color:rgba(249,115,22,0.85);line-height:1.5;}
      .bti-disclaim strong{color:#fbbf24;}

      .bti-start{width:100%;padding:18px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:1.1rem;font-weight:800;border:none;border-radius:16px;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
      .bti-start:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(124,58,237,0.4);}

      /* QUESTION */
      .q-progress{margin-bottom:22px;}
      .q-progress-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:0.74rem;color:rgba(255,255,255,0.6);}
      .q-progress-bar{height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;}
      .q-progress-fill{height:100%;background:linear-gradient(90deg,#7c3aed,#ec4899);transition:width 0.4s;}

      .q-axis-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:0.7rem;font-weight:700;margin-bottom:14px;}
      .q-axis-1{background:rgba(124,58,237,0.25);color:#c4a5ff;}
      .q-axis-2{background:rgba(59,130,246,0.25);color:#93c5fd;}
      .q-axis-3{background:rgba(236,72,153,0.25);color:#fbb6ce;}
      .q-axis-4{background:rgba(245,158,11,0.25);color:#fcd34d;}

      .q-text{font-size:1.6rem;font-weight:900;line-height:1.4;margin-bottom:28px;letter-spacing:-0.02em;}

      .q-options{display:flex;flex-direction:column;gap:12px;}
      .q-opt{background:rgba(255,255,255,0.04);border:2px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px 20px;cursor:pointer;transition:all 0.25s;text-align:left;color:#fff;font-size:1rem;line-height:1.5;font-weight:600;}
      .q-opt:hover{border-color:#ec4899;background:rgba(236,72,153,0.08);transform:translateX(4px);}
      .q-opt-label{font-size:0.7rem;color:#c9a876;font-weight:700;display:block;margin-bottom:4px;letter-spacing:0.1em;}

      /* RESULT */
      .r-emoji{font-size:6rem;text-align:center;margin-bottom:12px;display:block;animation:heroFloat 3s ease-in-out infinite;}
      .r-code{text-align:center;font-size:0.85rem;letter-spacing:0.4em;color:rgba(255,255,255,0.5);font-weight:800;margin-bottom:6px;}
      .r-name{text-align:center;font-size:2.2rem;font-weight:900;line-height:1.2;margin-bottom:18px;letter-spacing:-0.02em;}
      .r-name .h{background:linear-gradient(135deg,#c9a876,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      .r-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:22px;margin-bottom:14px;}
      .r-card-title{font-size:0.7rem;font-weight:700;color:#c9a876;letter-spacing:0.18em;margin-bottom:8px;}
      .r-card-body{font-size:0.95rem;color:rgba(255,255,255,0.85);line-height:1.6;}
      .r-doctor-card{background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.15));border:1px solid rgba(236,72,153,0.3);border-radius:18px;padding:22px;margin-bottom:14px;display:flex;align-items:center;gap:14px;}
      .r-doctor-emoji{font-size:2.2rem;}
      .r-doctor-text{flex:1;}
      .r-doctor-label{font-size:0.7rem;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:0.15em;}
      .r-doctor-name{font-size:1.15rem;font-weight:900;color:#fff;margin-top:2px;}
      .r-actions{display:flex;flex-direction:column;gap:10px;margin-top:24px;}
      .r-btn{padding:16px;border-radius:14px;font-weight:800;text-align:center;cursor:pointer;border:none;font-size:0.95rem;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;}
      .r-btn-primary{background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;}
      .r-btn-treat{background:rgba(201,168,118,0.15);color:#c9a876;border:1px solid rgba(201,168,118,0.3);}
      .r-btn-share{background:#FEE500;color:#191919;}
      .r-btn-retry{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.7);}
      .r-btn-back{background:transparent;color:rgba(255,255,255,0.5);}
    `}</style>

    <main class="bti-wrap">
      <a href="/play" class="bti-back"><i class="fas fa-arrow-left"></i> 게임존</a>

      {/* INTRO */}
      <section class="bti-screen active" id="bti-intro">
        <div class="bti-intro">
          <span class="bti-emoji-hero">🧬</span>
          <div class="bti-logo">치아<span class="accent">BTI</span></div>
          <div class="bti-logo-sub">DAEGU 365 · TYPE TEST</div>
          <h1 class="bti-tagline">나의 <em>구강 유형</em>은?<br/>16가지 타입 중에…</h1>
          <p class="bti-desc">
            12문항, 약 2분이면 끝!<br/>
            결과에 맞는 진료와 원장님까지 추천해드려요.
          </p>

          <div class="bti-axis-grid">
            <div class="axis-card"><span class="ai">🪥</span><div class="an">관리 스타일</div><div class="ac">M · N</div></div>
            <div class="axis-card"><span class="ai">😷</span><div class="an">통증 민감도</div><div class="ac">P · E</div></div>
            <div class="axis-card"><span class="ai">✨</span><div class="an">미용 vs 기능</div><div class="ac">W · H</div></div>
            <div class="axis-card"><span class="ai">💰</span><div class="an">비용 성향</div><div class="ac">B · L</div></div>
          </div>

          <div class="bti-stats">
            <div class="bti-stat"><div class="bti-stat-num">12</div><div class="bti-stat-label">QUESTIONS</div></div>
            <div class="bti-stat"><div class="bti-stat-num">16</div><div class="bti-stat-label">TYPES</div></div>
            <div class="bti-stat"><div class="bti-stat-num">2분</div><div class="bti-stat-label">DURATION</div></div>
          </div>

          <div class="bti-disclaim">
            <strong>※ 재미용 콘텐츠입니다.</strong> 실제 의학적 진단을 대체하지 않습니다. 정확한 구강 상태는 정기검진으로 확인해주세요.
          </div>

          <button class="bti-start" id="btiStart">테스트 시작 →</button>
        </div>
      </section>

      {/* QUESTION */}
      <section class="bti-screen" id="bti-question">
        <div class="q-progress">
          <div class="q-progress-head">
            <span><b id="qNum">1</b> / 12</span>
            <span id="qAxisLabel">관리 스타일</span>
          </div>
          <div class="q-progress-bar"><div class="q-progress-fill" id="qFill" style="width:8.3%"></div></div>
        </div>
        <div class="q-axis-badge q-axis-1" id="qAxisBadge">관리 스타일</div>
        <h2 class="q-text" id="qText">양치할 때 나는…</h2>
        <div class="q-options">
          <button class="q-opt" id="qOptA"><span class="q-opt-label">A</span><span id="qTextA">선택지 A</span></button>
          <button class="q-opt" id="qOptB"><span class="q-opt-label">B</span><span id="qTextB">선택지 B</span></button>
        </div>
      </section>

      {/* RESULT */}
      <section class="bti-screen" id="bti-result">
        <span class="r-emoji" id="rEmoji">💎</span>
        <div class="r-code" id="rCode">MPWB</div>
        <h2 class="r-name"><span class="h" id="rName">완벽주의 인플루언서</span></h2>

        <div class="r-card">
          <div class="r-card-title">YOUR TYPE</div>
          <div class="r-card-body" id="rDesc">설명...</div>
        </div>

        <div class="r-card">
          <div class="r-card-title">강점</div>
          <div class="r-card-body" id="rStrength">강점...</div>
        </div>

        <div class="r-card">
          <div class="r-card-title">맞춤 진료 추천</div>
          <div class="r-card-body" id="rCare">추천...</div>
        </div>

        <div class="r-doctor-card">
          <span class="r-doctor-emoji">👨‍⚕️</span>
          <div class="r-doctor-text">
            <div class="r-doctor-label">RECOMMENDED DOCTOR</div>
            <div class="r-doctor-name" id="rDoctor">김성주 대표원장</div>
          </div>
        </div>

        <div class="r-actions">
          <a href="#" class="r-btn r-btn-treat" id="rTreatLink"><i class="fas fa-tooth"></i> 추천 진료 자세히 보기</a>
          <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="r-btn r-btn-primary"><i class="fas fa-calendar-check"></i> 네이버 예약하기</a>
          <button class="r-btn r-btn-share" id="rShare"><i class="fas fa-share-alt"></i> 결과 공유하기</button>
          <button class="r-btn r-btn-retry" id="rRetry"><i class="fas fa-redo"></i> 다시 테스트</button>
          <a href="/play" class="r-btn r-btn-back">← 게임존으로</a>
        </div>
      </section>
    </main>

    <script dangerouslySetInnerHTML={{__html:`
(()=>{
  const Q=${JSON.stringify(QUESTIONS)};
  const T=${JSON.stringify(TYPES)};
  const AXIS_LABELS={'1':'관리 스타일','2':'통증 민감도','3':'미용 vs 기능','4':'비용 성향'};

  let idx=0; const answers=[];
  const intro=document.getElementById('bti-intro');
  const ques=document.getElementById('bti-question');
  const res=document.getElementById('bti-result');

  function show(el){[intro,ques,res].forEach(x=>x.classList.remove('active'));el.classList.add('active');window.scrollTo(0,0);}

  function render(){
    const q=Q[idx];
    document.getElementById('qNum').textContent=idx+1;
    document.getElementById('qFill').style.width=((idx+1)/Q.length*100)+'%';
    document.getElementById('qAxisLabel').textContent=AXIS_LABELS[q.axis];
    const badge=document.getElementById('qAxisBadge');
    badge.textContent=AXIS_LABELS[q.axis];
    badge.className='q-axis-badge q-axis-'+q.axis;
    document.getElementById('qText').textContent=q.q;
    document.getElementById('qTextA').textContent=q.a.text;
    document.getElementById('qTextB').textContent=q.b.text;
  }

  function pick(v){
    answers.push(v);
    if(idx<Q.length-1){idx++;render();}
    else compute();
  }

  function compute(){
    // 4축 카운트 → 각 축에서 빈도수 높은 글자 선택
    const counts={};
    answers.forEach(v=>counts[v]=(counts[v]||0)+1);
    const axis1=(counts.M||0)>=(counts.N||0)?'M':'N';
    const axis2=(counts.P||0)>=(counts.E||0)?'P':'E';
    const axis3=(counts.W||0)>=(counts.H||0)?'W':'H';
    const axis4=(counts.B||0)>=(counts.L||0)?'B':'L';
    const code=axis1+axis2+axis3+axis4;
    const t=T[code]||T.MEHB;
    document.getElementById('rEmoji').textContent=t.emoji;
    document.getElementById('rCode').textContent=code;
    document.getElementById('rName').textContent=t.name;
    document.getElementById('rDesc').textContent=t.desc;
    document.getElementById('rStrength').textContent=t.strength;
    document.getElementById('rCare').textContent=t.care;
    document.getElementById('rDoctor').textContent=t.doctor;
    document.getElementById('rTreatLink').href=t.treat;
    show(res);
  }

  document.getElementById('btiStart').addEventListener('click',()=>{idx=0;answers.length=0;render();show(ques);});
  document.getElementById('qOptA').addEventListener('click',()=>pick(Q[idx].a.v));
  document.getElementById('qOptB').addEventListener('click',()=>pick(Q[idx].b.v));
  document.getElementById('rRetry').addEventListener('click',()=>{idx=0;answers.length=0;render();show(ques);});
  document.getElementById('rShare').addEventListener('click',async()=>{
    const code=document.getElementById('rCode').textContent;
    const name=document.getElementById('rName').textContent;
    const txt='나의 치아BTI 유형은 '+code+' '+name+'! 너도 해봐 🦷';
    const url=location.origin+'/play/bti';
    if(navigator.share){try{await navigator.share({title:'치아BTI',text:txt,url});}catch(e){}}
    else{try{await navigator.clipboard.writeText(txt+' '+url);alert('결과 링크가 복사됐어요!');}catch(e){prompt('복사해서 공유하세요:',txt+' '+url);}}
  });
})();
    `}}/>
  </>
)
