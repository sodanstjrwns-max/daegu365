/* ============================================================
   대구365치과 · 365 RUSH
   무한 러너 게임 (쿠키런 스타일)
   - 캐릭터: 치아 (점프 / 슬라이드)
   - 장애물: 충치 / 치석 / 사탕
   - 코인: 칫솔모 (점수 +)
   - 30초 도전 모드
   ============================================================ */

export const PlayRushPage = () => (
  <>
    <style>{`
      *{margin:0;padding:0;box-sizing:border-box;}
      body{background:#0a0a14;color:#fff;font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none;height:100vh;height:100dvh;}

      .screen{display:none;position:fixed;inset:0;z-index:10;}
      .screen.active{display:flex;flex-direction:column;align-items:center;justify-content:center;}

      #introScreen{background:linear-gradient(180deg,#87CEEB 0%,#FFE5B4 50%,#FFD8A8 100%);text-align:center;padding:20px;overflow-y:auto;}
      .intro-char{font-size:80px;animation:bounceChar 1s ease-in-out infinite;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.2));}
      @keyframes bounceChar{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);}}
      .intro-title{font-size:2.4rem;font-weight:900;background:linear-gradient(135deg,#c9a876,#ec4899,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px;letter-spacing:-0.02em;}
      .intro-sub{font-size:0.9rem;color:rgba(0,0,0,0.5);margin-bottom:18px;font-weight:600;}
      .intro-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(201,168,118,0.18);border:1px solid rgba(201,168,118,0.4);border-radius:20px;padding:5px 14px;font-size:0.7rem;color:#8b6914;font-weight:700;margin-bottom:16px;}
      .intro-enemies{display:flex;gap:10px;justify-content:center;margin-bottom:18px;flex-wrap:wrap;}
      .intro-enemy{background:rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.1);border-radius:14px;padding:10px 14px;min-width:74px;}
      .intro-enemy-emoji{font-size:1.5rem;margin-bottom:2px;}
      .intro-enemy-name{font-size:0.65rem;color:rgba(0,0,0,0.6);font-weight:600;}
      .intro-how{background:rgba(0,0,0,0.06);border:1px solid rgba(0,0,0,0.08);border-radius:14px;padding:14px 18px;max-width:340px;text-align:left;margin-bottom:16px;}
      .intro-how-title{font-size:0.78rem;font-weight:700;color:#c9a876;margin-bottom:6px;letter-spacing:0.05em;}
      .intro-how-row{font-size:0.74rem;color:rgba(0,0,0,0.6);margin-bottom:3px;display:flex;gap:8px;font-weight:500;}
      .intro-how-row span{color:#ec4899;min-width:20px;font-weight:700;}
      .btn-start{background:linear-gradient(135deg,#c9a876,#ec4899);color:#fff;border:none;padding:18px 48px;border-radius:60px;font-size:1.15rem;font-weight:800;cursor:pointer;animation:pulseBtn 2s ease-in-out infinite;margin-bottom:8px;box-shadow:0 4px 20px rgba(201,168,118,0.4);}
      @keyframes pulseBtn{0%,100%{transform:scale(1);}50%{transform:scale(1.05);box-shadow:0 8px 30px rgba(201,168,118,0.6);}}
      .intro-controls{font-size:0.7rem;color:rgba(0,0,0,0.4);margin-bottom:14px;}
      .intro-back{font-size:0.72rem;color:rgba(0,0,0,0.5);text-decoration:none;}

      #gameCanvas{display:block;position:fixed;inset:0;z-index:1;}

      .hud{position:fixed;top:0;left:0;right:0;z-index:5;display:none;padding:14px 18px;background:linear-gradient(180deg,rgba(0,0,0,0.35) 0%,transparent 100%);}
      .hud.active{display:flex;justify-content:space-between;align-items:center;}
      .hud-time{font-size:1.6rem;font-weight:900;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.4);}
      .hud-time small{font-size:0.6rem;color:rgba(255,255,255,0.7);font-weight:400;display:block;}
      .hud-score{text-align:center;font-size:1.1rem;font-weight:900;color:#FEE500;text-shadow:0 2px 8px rgba(0,0,0,0.4);}
      .hud-score small{font-size:0.55rem;color:rgba(255,255,255,0.7);font-weight:400;display:block;letter-spacing:0.2em;}
      .hud-hp{display:flex;gap:4px;}
      .hud-hp-heart{font-size:1.2rem;transition:all 0.3s;}
      .hud-hp-heart.lost{opacity:0.2;transform:scale(0.7);}

      .powerup-indicator{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:7;font-size:1.6rem;font-weight:900;text-align:center;pointer-events:none;opacity:0;transition:opacity 0.5s;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,0.6);}
      .powerup-indicator.active{opacity:1;animation:powerupFlash 1.5s ease-out;}
      @keyframes powerupFlash{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0;}20%{transform:translate(-50%,-50%) scale(1.3);opacity:1;}100%{transform:translate(-50%,-50%) scale(1);opacity:0;}}

      .damage-flash{position:fixed;inset:0;z-index:4;background:rgba(239,68,68,0.3);pointer-events:none;opacity:0;transition:opacity 0.1s;}
      .damage-flash.active{opacity:1;}

      .controls{position:fixed;bottom:20px;left:0;right:0;z-index:6;display:none;justify-content:space-between;padding:0 24px;}
      .controls.active{display:flex;}
      .ctrl-btn{width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.85);border:3px solid #c9a876;color:#8b6914;font-size:1.6rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.2);}
      .ctrl-btn:active{transform:scale(0.92);background:#c9a876;color:#fff;}

      #resultScreen{background:linear-gradient(180deg,#87CEEB 0%,#FFE5B4 100%);text-align:center;padding:24px;overflow-y:auto;}
      .result-emoji{font-size:72px;margin-bottom:10px;}
      .result-grade{font-size:1.05rem;font-weight:700;padding:6px 20px;border-radius:20px;display:inline-block;margin-bottom:14px;color:#fff;}
      .grade-skull{background:#ef4444;}
      .grade-normal{background:#3b82f6;}
      .grade-healthy{background:#10b981;}
      .grade-perfect{background:linear-gradient(135deg,#c9a876,#ec4899);}
      .result-time{font-size:3.4rem;font-weight:900;color:#8b6914;margin-bottom:4px;}
      .result-time-label{font-size:0.7rem;color:rgba(0,0,0,0.4);margin-bottom:18px;letter-spacing:0.25em;font-weight:700;}
      .result-stats{display:flex;gap:12px;justify-content:center;margin-bottom:22px;flex-wrap:wrap;}
      .result-stat{background:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.08);border-radius:14px;padding:10px 16px;min-width:80px;}
      .result-stat-num{font-size:1.2rem;font-weight:900;color:#8b6914;}
      .result-stat-label{font-size:0.6rem;color:rgba(0,0,0,0.5);margin-top:2px;font-weight:600;}
      .result-msg{background:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.08);border-radius:14px;padding:14px 18px;max-width:340px;margin:0 auto 18px;font-size:0.85rem;color:rgba(0,0,0,0.7);line-height:1.55;}
      .result-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
      .btn-result{padding:12px 24px;border-radius:60px;font-size:0.9rem;font-weight:700;cursor:pointer;border:none;}
      .btn-retry{background:linear-gradient(135deg,#c9a876,#ec4899);color:#fff;}
      .btn-reserve{background:#03C75A;color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
      .btn-back{background:rgba(0,0,0,0.08);color:rgba(0,0,0,0.7);text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
    `}</style>

    {/* 인트로 */}
    <div class="screen active" id="introScreen">
      <div class="intro-char">🦷</div>
      <div class="intro-title">365 RUSH</div>
      <div class="intro-sub">30초 안에 얼마나 갈 수 있어?</div>
      <div class="intro-badge"><i class="fas fa-running"></i> 대구365치과 · 무한 러너</div>

      <div class="intro-enemies">
        <div class="intro-enemy"><div class="intro-enemy-emoji">⚫</div><div class="intro-enemy-name">충치</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">🟡</div><div class="intro-enemy-name">치석</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">🍬</div><div class="intro-enemy-name">사탕</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">🪥</div><div class="intro-enemy-name">코인</div></div>
      </div>

      <div class="intro-how">
        <div class="intro-how-title">조작법</div>
        <div class="intro-how-row"><span>↑</span><span>스페이스 / 위쪽 화살표 / 화면 탭 → 점프</span></div>
        <div class="intro-how-row"><span>↓</span><span>Shift / 아래 화살표 / 두 손가락 탭 → 슬라이드</span></div>
        <div class="intro-how-row"><span>🪥</span><span>칫솔 코인 = 점수 +10</span></div>
        <div class="intro-how-row"><span>❤️</span><span>HP 3개 — 충치/치석/사탕에 닿으면 -1</span></div>
      </div>

      <button class="btn-start" id="btnStart">RUSH 시작 →</button>
      <div class="intro-controls">30초 동안 살아남고 점수를 모으세요</div>
      <a href="/play" class="intro-back">← 게임존으로</a>
    </div>

    {/* HUD */}
    <div class="hud" id="hud">
      <div>
        <div class="hud-time"><span id="timer">0:30</span><small>TIME</small></div>
      </div>
      <div class="hud-score"><span id="score">0</span><small>SCORE</small></div>
      <div class="hud-hp" id="hp">
        <span class="hud-hp-heart">❤️</span>
        <span class="hud-hp-heart">❤️</span>
        <span class="hud-hp-heart">❤️</span>
      </div>
    </div>

    <div class="powerup-indicator" id="powerup"></div>
    <div class="damage-flash" id="damageFlash"></div>
    <canvas id="gameCanvas"></canvas>

    {/* 모바일 컨트롤 */}
    <div class="controls" id="ctrls">
      <button class="ctrl-btn" id="btnSlide"><i class="fas fa-arrow-down"></i></button>
      <button class="ctrl-btn" id="btnJump"><i class="fas fa-arrow-up"></i></button>
    </div>

    {/* 결과 */}
    <div class="screen" id="resultScreen">
      <div class="result-emoji" id="resultEmoji">🦷</div>
      <div class="result-grade" id="resultGrade">평가</div>
      <div class="result-time" id="resultTime">0초</div>
      <div class="result-time-label">SURVIVAL</div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num" id="rsScore">0</div><div class="result-stat-label">SCORE</div></div>
        <div class="result-stat"><div class="result-stat-num" id="rsCoins">0</div><div class="result-stat-label">COINS</div></div>
        <div class="result-stat"><div class="result-stat-num" id="rsDist">0m</div><div class="result-stat-label">DISTANCE</div></div>
      </div>
      <div class="result-msg" id="resultMsg">다시 도전!</div>
      <div class="result-actions">
        <button class="btn-result btn-retry" id="btnRetry"><i class="fas fa-redo"></i> 다시하기</button>
        <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="btn-result btn-reserve">
          <span style="font-size:11px;font-weight:900;background:#fff;color:#03C75A;border-radius:4px;padding:1px 4px;">N</span>
          예약하기
        </a>
        <a href="/play" class="btn-result btn-back">← 게임존</a>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{__html:`
(()=>{
  const cvs=document.getElementById('gameCanvas');
  const ctx=cvs.getContext('2d');
  const introScreen=document.getElementById('introScreen');
  const resultScreen=document.getElementById('resultScreen');
  const hud=document.getElementById('hud');
  const ctrls=document.getElementById('ctrls');
  const scoreEl=document.getElementById('score');
  const timerEl=document.getElementById('timer');
  const hpEl=document.getElementById('hp');
  const powerupEl=document.getElementById('powerup');
  const damageFlash=document.getElementById('damageFlash');

  let W=0,H=0,GROUND_Y=0;
  function resize(){W=cvs.width=innerWidth;H=cvs.height=innerHeight;GROUND_Y=H-90;}
  addEventListener('resize',resize); resize();

  let state='intro';
  let player,obstacles,coins,clouds,particles;
  let score,coinsCollected,hp,timeLeft,distance,speed;
  let startTime=0,lastFrame=0,lastSpawn=0,invuln=0;

  const G=0.7; const JUMP_V=-15; const JUMP_HOLD_BONUS=-0.4;

  function init(){
    player={x:120,y:GROUND_Y-50,w:46,h:54,vy:0,onGround:true,sliding:false,jumpHold:0,emoji:'🦷'};
    obstacles=[]; coins=[]; clouds=[]; particles=[];
    score=0; coinsCollected=0; hp=3; timeLeft=30; distance=0; speed=7;
    invuln=0;
    for(let i=0;i<5;i++) clouds.push({x:Math.random()*W,y:60+Math.random()*120,r:30+Math.random()*30,v:0.3+Math.random()*0.4});
    updateHP();
  }

  function updateHP(){
    const hearts=hpEl.querySelectorAll('.hud-hp-heart');
    hearts.forEach((el,i)=>el.classList.toggle('lost',i>=hp));
  }

  function showPowerup(text){
    powerupEl.textContent=text;
    powerupEl.classList.remove('active');
    void powerupEl.offsetWidth;
    powerupEl.classList.add('active');
  }
  function flashDamage(){
    damageFlash.classList.add('active');
    setTimeout(()=>damageFlash.classList.remove('active'),100);
  }

  // 장애물 타입: low(점프 회피), high(슬라이드 회피), candy(가운데, 둘 중 하나)
  function spawnObstacle(){
    const r=Math.random();
    if(r<0.45){ // low - 점프해서 피함
      obstacles.push({type:'low',emoji:r<0.22?'⚫':'🟡',x:W+50,y:GROUND_Y-22,w:42,h:42});
    } else if(r<0.78){ // high - 슬라이드해서 피함
      obstacles.push({type:'high',emoji:'🍬',x:W+50,y:GROUND_Y-95,w:42,h:42});
    } else { // pair (간단한 갭)
      obstacles.push({type:'low',emoji:'⚫',x:W+50,y:GROUND_Y-22,w:42,h:42});
    }
  }

  function spawnCoin(){
    const yChoice=Math.random()<0.5?GROUND_Y-30:GROUND_Y-100;
    const baseX=W+50;
    for(let i=0;i<3;i++) coins.push({x:baseX+i*40,y:yChoice,r:14});
  }

  // INPUT
  function jump(){
    if(state!=='playing') return;
    if(player.onGround && !player.sliding){
      player.vy=JUMP_V; player.onGround=false; player.jumpHold=12;
    }
  }
  function jumpRelease(){player.jumpHold=0;}
  function slideStart(){
    if(state!=='playing') return;
    if(player.onGround){player.sliding=true; player.h=30;}
  }
  function slideEnd(){
    if(player.sliding){player.sliding=false; player.h=54;}
  }

  addEventListener('keydown',e=>{
    if(e.repeat) return;
    if(e.key===' '||e.key==='ArrowUp'||e.key==='w'||e.key==='W'){jump(); e.preventDefault();}
    if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'||e.key==='Shift'){slideStart(); e.preventDefault();}
  });
  addEventListener('keyup',e=>{
    if(e.key===' '||e.key==='ArrowUp'||e.key==='w'||e.key==='W'){jumpRelease();}
    if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'||e.key==='Shift'){slideEnd();}
  });

  // 화면 탭 → 점프 / 두 손가락 → 슬라이드
  cvs.addEventListener('touchstart',e=>{
    if(e.touches.length>=2) slideStart();
    else jump();
    e.preventDefault();
  },{passive:false});
  cvs.addEventListener('touchend',e=>{
    if(e.touches.length===0){jumpRelease();slideEnd();}
    e.preventDefault();
  },{passive:false});

  document.getElementById('btnJump').addEventListener('touchstart',e=>{jump();e.preventDefault();},{passive:false});
  document.getElementById('btnJump').addEventListener('touchend',e=>{jumpRelease();e.preventDefault();},{passive:false});
  document.getElementById('btnJump').addEventListener('mousedown',jump);
  document.getElementById('btnJump').addEventListener('mouseup',jumpRelease);
  document.getElementById('btnSlide').addEventListener('touchstart',e=>{slideStart();e.preventDefault();},{passive:false});
  document.getElementById('btnSlide').addEventListener('touchend',e=>{slideEnd();e.preventDefault();},{passive:false});
  document.getElementById('btnSlide').addEventListener('mousedown',slideStart);
  document.getElementById('btnSlide').addEventListener('mouseup',slideEnd);

  function update(dt){
    distance+=speed*0.3;
    speed=Math.min(13,7+(30-timeLeft)*0.18);

    // 클라우드
    clouds.forEach(c=>{c.x-=c.v*1.5; if(c.x+c.r<0){c.x=W+c.r;c.y=60+Math.random()*120;}});

    // 플레이어
    if(!player.onGround){
      if(player.jumpHold>0){player.vy+=JUMP_HOLD_BONUS; player.jumpHold--;}
      player.vy+=G;
      player.y+=player.vy;
      const bottom=player.sliding?GROUND_Y-30:GROUND_Y-54;
      if(player.y>=bottom){player.y=bottom; player.vy=0; player.onGround=true;}
    } else {
      const bottom=player.sliding?GROUND_Y-30:GROUND_Y-54;
      player.y=bottom;
    }

    // 스폰
    const now=performance.now();
    if(now-lastSpawn>900-Math.min(400,(30-timeLeft)*15)){
      lastSpawn=now;
      if(Math.random()<0.7) spawnObstacle();
      else spawnCoin();
    }

    // 장애물
    for(let i=obstacles.length-1;i>=0;i--){
      const o=obstacles[i]; o.x-=speed;
      if(o.x+o.w<-50){obstacles.splice(i,1); score+=5; continue;}
      // 충돌
      if(invuln<=0){
        const px=player.x, py=player.y, pw=36, ph=player.h;
        if(px<o.x+o.w-6 && px+pw>o.x+6 && py<o.y+o.h-6 && py+ph>o.y+6){
          hp--; invuln=60; updateHP(); flashDamage();
          for(let k=0;k<10;k++){const a=Math.random()*Math.PI*2;particles.push({x:player.x+18,y:player.y+20,vx:Math.cos(a)*3,vy:Math.sin(a)*3,life:25,c:'#ef4444'});}
          if(hp<=0){end(); return;}
        }
      }
    }
    if(invuln>0) invuln--;

    // 코인
    for(let i=coins.length-1;i>=0;i--){
      const c=coins[i]; c.x-=speed;
      if(c.x<-30){coins.splice(i,1); continue;}
      const dx=(player.x+18)-c.x, dy=(player.y+20)-c.y;
      if(Math.hypot(dx,dy)<28){
        coinsCollected++; score+=10;
        for(let k=0;k<6;k++){const a=Math.random()*Math.PI*2;particles.push({x:c.x,y:c.y,vx:Math.cos(a)*2,vy:Math.sin(a)*2,life:18,c:'#FEE500'});}
        coins.splice(i,1);
      }
    }

    // 파티클
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.life--;
      if(p.life<=0) particles.splice(i,1);
    }
  }

  function draw(){
    // 하늘 그라디언트
    const grd=ctx.createLinearGradient(0,0,0,H);
    grd.addColorStop(0,'#87CEEB'); grd.addColorStop(0.6,'#FFE5B4'); grd.addColorStop(1,'#FFD8A8');
    ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);

    // 클라우드
    ctx.fillStyle='rgba(255,255,255,0.85)';
    clouds.forEach(c=>{
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
      ctx.arc(c.x+c.r*0.7,c.y+5,c.r*0.7,0,Math.PI*2);
      ctx.arc(c.x-c.r*0.6,c.y+5,c.r*0.6,0,Math.PI*2);
      ctx.fill();
    });

    // 지면
    ctx.fillStyle='#8FBC8F'; ctx.fillRect(0,GROUND_Y,W,H-GROUND_Y);
    ctx.fillStyle='#65a30d'; ctx.fillRect(0,GROUND_Y,W,4);
    // 지면 라인 패턴
    ctx.fillStyle='rgba(0,0,0,0.08)';
    const offset=(distance%40);
    for(let x=-offset;x<W;x+=40){ctx.fillRect(x,GROUND_Y+12,20,4);}

    // 코인
    coins.forEach(c=>{
      ctx.save();
      ctx.shadowColor='#FEE500'; ctx.shadowBlur=14;
      ctx.font='26px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('🪥',c.x,c.y);
      ctx.restore();
    });

    // 장애물
    obstacles.forEach(o=>{
      ctx.font='38px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(o.emoji,o.x+o.w/2,o.y+o.h/2);
    });

    // 플레이어 (치아 캐릭터)
    ctx.save();
    if(invuln>0 && Math.floor(invuln/4)%2===0) ctx.globalAlpha=0.4;
    ctx.font=(player.sliding?32:42)+'px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🦷',player.x+18,player.y+player.h/2);
    // 그림자
    ctx.globalAlpha=0.25;
    ctx.fillStyle='#000';
    ctx.beginPath(); ctx.ellipse(player.x+18,GROUND_Y-2,18,4,0,0,Math.PI*2); ctx.fill();
    ctx.restore();

    // 파티클
    particles.forEach(p=>{
      ctx.globalAlpha=p.life/25; ctx.fillStyle=p.c;
      ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
  }

  function loop(now){
    if(state!=='playing') return;
    const dt=Math.min(33,now-lastFrame); lastFrame=now;
    timeLeft=Math.max(0,30-(now-startTime)/1000);
    if(timeLeft<=0){end(); return;}
    update(dt); draw();
    scoreEl.textContent=score;
    const m=Math.floor(timeLeft/60), s=Math.floor(timeLeft%60);
    timerEl.textContent=m+':'+(s<10?'0':'')+s;
    requestAnimationFrame(loop);
  }

  function start(){
    state='playing'; init();
    introScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    hud.classList.add('active');
    ctrls.classList.add('active');
    startTime=performance.now(); lastFrame=startTime; lastSpawn=startTime;
    requestAnimationFrame(loop);
  }

  function end(){
    state='result';
    hud.classList.remove('active');
    ctrls.classList.remove('active');
    const survived=Math.floor(30-timeLeft);
    let grade,gradeClass,emoji,msg;
    if(survived>=30 && score>=400){grade='💎 PERFECT — 완벽한 컨트롤';gradeClass='grade-perfect';emoji='💎';msg='30초 풀생존 + 고득점! 다음은 치석 디펜스도 도전!';}
    else if(survived>=25){grade='✨ HEALTHY — 강한 치아';gradeClass='grade-healthy';emoji='🦷';msg='훌륭해요! 치아 건강도 이렇게 챙겨주세요.';}
    else if(survived>=15){grade='🟢 NORMAL — 평균';gradeClass='grade-normal';emoji='🪥';msg='괜찮아요. 한 번 더 도전!';}
    else {grade='💀 GAME OVER';gradeClass='grade-skull';emoji='💀';msg='실제 충치는 게임처럼 피할 수 없어요. 정기검진 받으세요!';}
    document.getElementById('resultEmoji').textContent=emoji;
    const ge=document.getElementById('resultGrade');
    ge.textContent=grade; ge.className='result-grade '+gradeClass;
    document.getElementById('resultTime').textContent=survived+'초';
    document.getElementById('rsScore').textContent=score;
    document.getElementById('rsCoins').textContent=coinsCollected;
    document.getElementById('rsDist').textContent=Math.floor(distance)+'m';
    document.getElementById('resultMsg').textContent=msg;
    resultScreen.classList.add('active');
  }

  document.getElementById('btnStart').addEventListener('click',start);
  document.getElementById('btnRetry').addEventListener('click',start);
})();
    `}}/>
  </>
)
