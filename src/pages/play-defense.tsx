/* ============================================================
   대구365치과 · 치석 디펜스
   종스크롤 슈팅 게임 (드래곤플라이트 스타일)
   - 플레이어: 칫솔 (스케일러 발사)
   - 적: 치석 / 충치 / 세균 / 플라그 / 보스(잇몸 염증)
   - HP / 콤보 / 파워업 / 등급 평가
   ============================================================ */

export const PlayDefensePage = () => (
  <>
    <style>{`
      * { margin:0; padding:0; box-sizing:border-box; }
      body { background:#0a0a14; color:#fff; font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif; overflow:hidden; touch-action:none; -webkit-user-select:none; user-select:none; height:100vh; height:100dvh; }

      .screen { display:none; position:fixed; inset:0; z-index:10; }
      .screen.active { display:flex; flex-direction:column; align-items:center; justify-content:center; }

      #introScreen { background:linear-gradient(180deg,#0a0a2e 0%,#1a0a3e 50%,#0a0a14 100%); text-align:center; padding:20px; overflow-y:auto; }
      .intro-tooth { font-size:80px; animation:floatTooth 3s ease-in-out infinite; margin-bottom:12px; filter:drop-shadow(0 0 30px rgba(201,168,118,0.5)); }
      @keyframes floatTooth { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-15px);} }
      .intro-title { font-size:2.2rem; font-weight:900; background:linear-gradient(135deg,#c9a876,#ec4899,#7c3aed); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; letter-spacing:-0.02em; }
      .intro-sub { font-size:0.9rem; color:rgba(255,255,255,0.5); margin-bottom:24px; }
      .intro-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(201,168,118,0.12); border:1px solid rgba(201,168,118,0.3); border-radius:20px; padding:5px 14px; font-size:0.7rem; color:#c9a876; font-weight:700; margin-bottom:20px; }
      .intro-enemies { display:flex; gap:10px; justify-content:center; margin-bottom:24px; flex-wrap:wrap; }
      .intro-enemy { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:10px 14px; min-width:74px; }
      .intro-enemy-emoji { font-size:1.6rem; margin-bottom:2px; }
      .intro-enemy-name { font-size:0.62rem; color:rgba(255,255,255,0.5); }
      .intro-enemy-hp { font-size:0.55rem; color:#c9a876; margin-top:2px; }
      .intro-how { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px 18px; max-width:340px; text-align:left; margin-bottom:18px; }
      .intro-how-title { font-size:0.78rem; font-weight:700; color:#c9a876; margin-bottom:6px; letter-spacing:0.05em; }
      .intro-how-row { font-size:0.74rem; color:rgba(255,255,255,0.55); margin-bottom:3px; display:flex; gap:8px; }
      .intro-how-row span { color:#ec4899; min-width:16px; }
      .btn-start { background:linear-gradient(135deg,#c9a876,#ec4899); color:#fff; border:none; padding:16px 44px; border-radius:60px; font-size:1.1rem; font-weight:800; cursor:pointer; animation:pulseBtn 2s ease-in-out infinite; margin-bottom:10px; box-shadow:0 4px 20px rgba(201,168,118,0.4); }
      @keyframes pulseBtn { 0%,100%{transform:scale(1);} 50%{transform:scale(1.05);box-shadow:0 8px 30px rgba(201,168,118,0.6);} }
      .intro-controls { font-size:0.7rem; color:rgba(255,255,255,0.3); margin-bottom:14px; }
      .intro-back { font-size:0.7rem; color:rgba(255,255,255,0.4); text-decoration:none; }

      #gameCanvas { display:block; position:fixed; inset:0; z-index:1; background:linear-gradient(180deg,#0a0a2e 0%,#1a0a3e 50%,#0a0a14 100%); }

      .hud { position:fixed; top:0; left:0; right:0; z-index:5; display:none; padding:14px 18px; background:linear-gradient(180deg,rgba(10,10,20,0.85) 0%,transparent 100%); }
      .hud.active { display:flex; justify-content:space-between; align-items:center; }
      .hud-score { font-size:1.4rem; font-weight:900; color:#c9a876; }
      .hud-score small { font-size:0.6rem; color:rgba(255,255,255,0.4); font-weight:400; display:block; }
      .hud-combo { font-size:0.85rem; font-weight:700; color:#ec4899; opacity:0; transition:opacity 0.3s; }
      .hud-combo.active { opacity:1; }
      .hud-hp { display:flex; gap:4px; }
      .hud-hp-heart { font-size:1.2rem; transition:all 0.3s; }
      .hud-hp-heart.lost { opacity:0.2; transform:scale(0.7); }
      .powerup-indicator { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:7; font-size:1.8rem; font-weight:900; text-align:center; pointer-events:none; opacity:0; transition:opacity 0.5s; color:#c9a876; }
      .powerup-indicator.active { opacity:1; animation:powerupFlash 1.5s ease-out; }
      @keyframes powerupFlash { 0%{transform:translate(-50%,-50%) scale(0.5);opacity:0;} 20%{transform:translate(-50%,-50%) scale(1.3);opacity:1;} 100%{transform:translate(-50%,-50%) scale(1);opacity:0;} }
      .damage-flash { position:fixed; inset:0; z-index:4; background:rgba(239,68,68,0.3); pointer-events:none; opacity:0; transition:opacity 0.1s; }
      .damage-flash.active { opacity:1; }

      #resultScreen { background:linear-gradient(180deg,#0a0a2e 0%,#1a0a3e 50%,#0a0a14 100%); text-align:center; padding:24px; overflow-y:auto; }
      .result-emoji { font-size:72px; margin-bottom:10px; }
      .result-grade { font-size:1.05rem; font-weight:700; padding:6px 20px; border-radius:20px; display:inline-block; margin-bottom:14px; }
      .grade-skull { background:rgba(239,68,68,0.2); color:#ef4444; }
      .grade-normal { background:rgba(59,130,246,0.2); color:#3b82f6; }
      .grade-healthy { background:rgba(16,185,129,0.2); color:#10b981; }
      .grade-perfect { background:rgba(201,168,118,0.2); color:#c9a876; }
      .result-score { font-size:3rem; font-weight:900; background:linear-gradient(135deg,#c9a876,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; }
      .result-score-label { font-size:0.7rem; color:rgba(255,255,255,0.4); margin-bottom:18px; letter-spacing:0.2em; }
      .result-stats { display:flex; gap:14px; justify-content:center; margin-bottom:22px; }
      .result-stat { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:10px 18px; min-width:80px; }
      .result-stat-num { font-size:1.2rem; font-weight:900; color:#c9a876; }
      .result-stat-label { font-size:0.6rem; color:rgba(255,255,255,0.4); margin-top:2px; }
      .result-msg { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px 18px; max-width:340px; margin:0 auto 18px; font-size:0.82rem; color:rgba(255,255,255,0.7); line-height:1.55; }
      .result-actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
      .btn-result { padding:12px 24px; border-radius:60px; font-size:0.9rem; font-weight:700; cursor:pointer; border:none; }
      .btn-retry { background:linear-gradient(135deg,#c9a876,#ec4899); color:#fff; }
      .btn-reserve { background:#03C75A; color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:6px; }
      .btn-back { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.7); text-decoration:none; display:inline-flex; align-items:center; gap:6px; }

      .pause-btn { position:fixed; top:14px; right:14px; z-index:8; width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.15); color:#fff; cursor:pointer; display:none; align-items:center; justify-content:center; font-size:0.9rem; }
      .pause-btn.active { display:flex; }
    `}</style>

    {/* 인트로 */}
    <div class="screen active" id="introScreen">
      <div class="intro-tooth">🛡️</div>
      <div class="intro-title">치석 디펜스</div>
      <div class="intro-sub">스케일러로 치석을 격추하라!</div>
      <div class="intro-badge"><i class="fas fa-tooth"></i> 대구365치과 · 365일 진료중</div>

      <div class="intro-enemies">
        <div class="intro-enemy"><div class="intro-enemy-emoji">🦠</div><div class="intro-enemy-name">세균</div><div class="intro-enemy-hp">HP 1</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">🟡</div><div class="intro-enemy-name">치석</div><div class="intro-enemy-hp">HP 2</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">⚫</div><div class="intro-enemy-name">충치</div><div class="intro-enemy-hp">HP 3</div></div>
        <div class="intro-enemy"><div class="intro-enemy-emoji">🩸</div><div class="intro-enemy-name">잇몸염증</div><div class="intro-enemy-hp">BOSS</div></div>
      </div>

      <div class="intro-how">
        <div class="intro-how-title">조작법</div>
        <div class="intro-how-row"><span>▶</span><span>PC : 방향키 ← → / WASD 이동, 자동 발사</span></div>
        <div class="intro-how-row"><span>▶</span><span>모바일 : 화면 터치/드래그로 이동</span></div>
        <div class="intro-how-row"><span>▶</span><span>💎 다이아 획득 시 무기 강화</span></div>
        <div class="intro-how-row"><span>▶</span><span>HP 3개 — 적과 충돌하면 1 감소</span></div>
      </div>

      <button class="btn-start" id="btnStart">게임 시작 →</button>
      <div class="intro-controls">90초 동안 최대한 많은 점수를 획득하세요</div>
      <a href="/play" class="intro-back">← 게임존으로</a>
    </div>

    {/* HUD */}
    <div class="hud" id="hud">
      <div>
        <div class="hud-score"><span id="score">0</span><small>SCORE</small></div>
        <div class="hud-combo" id="combo">COMBO x1</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:1rem;font-weight:800;color:#c9a876;" id="timer">0:90</div>
        <div style="font-size:0.55rem;color:rgba(255,255,255,0.4);letter-spacing:0.3em;">TIME</div>
      </div>
      <div class="hud-hp" id="hp">
        <span class="hud-hp-heart">❤️</span>
        <span class="hud-hp-heart">❤️</span>
        <span class="hud-hp-heart">❤️</span>
      </div>
    </div>

    <button class="pause-btn" id="pauseBtn"><i class="fas fa-pause"></i></button>
    <div class="powerup-indicator" id="powerup"></div>
    <div class="damage-flash" id="damageFlash"></div>
    <canvas id="gameCanvas"></canvas>

    {/* 결과 */}
    <div class="screen" id="resultScreen">
      <div class="result-emoji" id="resultEmoji">🦷</div>
      <div class="result-grade" id="resultGrade">평가</div>
      <div class="result-score" id="resultScore">0</div>
      <div class="result-score-label">FINAL SCORE</div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num" id="rsKills">0</div><div class="result-stat-label">KILLS</div></div>
        <div class="result-stat"><div class="result-stat-num" id="rsCombo">x0</div><div class="result-stat-label">MAX COMBO</div></div>
        <div class="result-stat"><div class="result-stat-num" id="rsTime">0초</div><div class="result-stat-label">SURVIVAL</div></div>
      </div>
      <div class="result-msg" id="resultMsg">게임 오버 — 대구365치과에서 진짜 치석 관리 받아보세요.</div>
      <div class="result-actions">
        <button class="btn-result btn-retry" id="btnRetry"><i class="fas fa-redo"></i> 다시하기</button>
        <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="btn-result btn-reserve">
          <span class="text-[11px] font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 4px;">N</span>
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
  const pauseBtn=document.getElementById('pauseBtn');
  const scoreEl=document.getElementById('score');
  const comboEl=document.getElementById('combo');
  const timerEl=document.getElementById('timer');
  const hpEl=document.getElementById('hp');
  const powerupEl=document.getElementById('powerup');
  const damageFlash=document.getElementById('damageFlash');
  const btnStart=document.getElementById('btnStart');
  const btnRetry=document.getElementById('btnRetry');

  let W=0,H=0;
  function resize(){W=cvs.width=innerWidth;H=cvs.height=innerHeight;}
  addEventListener('resize',resize); resize();

  // STATE
  let state='intro'; // intro/playing/result/paused
  let player,bullets,enemies,particles,gems,stars;
  let score,combo,maxCombo,kills,hp,timeLeft,lastShot,multishot,powerLevel;
  let keys={},touchX=null,startTime=0;
  let lastFrame=0;

  function init(){
    player={x:W/2,y:H-100,w:46,h:54,speed:6};
    bullets=[]; enemies=[]; particles=[]; gems=[]; stars=[];
    score=0; combo=0; maxCombo=0; kills=0; hp=3;
    timeLeft=90; lastShot=0; multishot=1; powerLevel=1;
    for(let i=0;i<60;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,v:Math.random()*0.6+0.2});
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

  // ENEMY TYPES
  const ENEMY_TYPES=[
    {name:'세균',emoji:'🦠',hp:1,r:18,score:10,speed:1.6,color:'#10b981'},
    {name:'치석',emoji:'🟡',hp:2,r:22,score:25,speed:1.2,color:'#fde68a'},
    {name:'충치',emoji:'⚫',hp:3,r:26,score:50,speed:0.9,color:'#444'},
    {name:'플라그',emoji:'🟤',hp:2,r:24,score:30,speed:1.4,color:'#92400e'},
  ];
  const BOSS_TYPE={name:'잇몸염증',emoji:'🩸',hp:18,r:48,score:300,speed:0.5,color:'#dc2626'};

  function spawnEnemy(){
    const isBoss=Math.random()<0.025 && timeLeft<70;
    const t=isBoss?BOSS_TYPE:ENEMY_TYPES[Math.floor(Math.random()*ENEMY_TYPES.length)];
    const e={...t,x:Math.random()*(W-100)+50,y:-40,vx:(Math.random()-0.5)*0.8,vy:t.speed+Math.random()*0.5,maxHp:t.hp,boss:isBoss};
    enemies.push(e);
  }

  function spawnGem(x,y){
    if(Math.random()<0.18) gems.push({x,y,vy:1.2,emoji:'💎',r:14,life:300});
  }

  function shoot(){
    const now=performance.now();
    const interval=180-Math.min(80,powerLevel*15);
    if(now-lastShot<interval) return;
    lastShot=now;
    const baseY=player.y-30;
    if(multishot===1){
      bullets.push({x:player.x,y:baseY,vy:-12,r:6,dmg:powerLevel});
    } else if(multishot===2){
      bullets.push({x:player.x-12,y:baseY,vy:-12,r:6,dmg:powerLevel});
      bullets.push({x:player.x+12,y:baseY,vy:-12,r:6,dmg:powerLevel});
    } else {
      bullets.push({x:player.x,y:baseY,vy:-12,r:7,dmg:powerLevel});
      bullets.push({x:player.x-18,y:baseY+6,vy:-11.5,vx:-1,r:6,dmg:powerLevel});
      bullets.push({x:player.x+18,y:baseY+6,vy:-11.5,vx:1,r:6,dmg:powerLevel});
    }
  }

  function explode(x,y,color){
    for(let i=0;i<14;i++){
      const a=Math.random()*Math.PI*2, sp=Math.random()*4+1;
      particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:30,color});
    }
  }

  // INPUT
  addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true; if(e.key===' ') e.preventDefault();});
  addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
  cvs.addEventListener('touchstart',e=>{const t=e.touches[0];touchX=t.clientX;e.preventDefault();},{passive:false});
  cvs.addEventListener('touchmove',e=>{const t=e.touches[0];touchX=t.clientX;e.preventDefault();},{passive:false});
  cvs.addEventListener('touchend',()=>{touchX=null;});
  cvs.addEventListener('mousemove',e=>{if(state==='playing') touchX=e.clientX;});

  pauseBtn.addEventListener('click',()=>{
    if(state==='playing'){state='paused'; pauseBtn.innerHTML='<i class="fas fa-play"></i>';}
    else if(state==='paused'){state='playing'; pauseBtn.innerHTML='<i class="fas fa-pause"></i>'; lastFrame=performance.now(); requestAnimationFrame(loop);}
  });

  // GAME LOOP
  function update(dt){
    // STARS
    stars.forEach(s=>{s.y+=s.v*dt*0.06; if(s.y>H){s.y=0;s.x=Math.random()*W;}});

    // PLAYER MOVE
    let dx=0;
    if(keys['arrowleft']||keys['a']) dx-=1;
    if(keys['arrowright']||keys['d']) dx+=1;
    if(keys['arrowup']||keys['w']) player.y-=player.speed*0.7;
    if(keys['arrowdown']||keys['s']) player.y+=player.speed*0.7;
    if(touchX!==null){
      const target=touchX;
      const diff=target-player.x;
      player.x+=Math.sign(diff)*Math.min(Math.abs(diff),player.speed*1.2);
    } else {
      player.x+=dx*player.speed;
    }
    player.x=Math.max(30,Math.min(W-30,player.x));
    player.y=Math.max(H/2,Math.min(H-50,player.y));

    shoot();

    // BULLETS
    for(let i=bullets.length-1;i>=0;i--){
      const b=bullets[i]; b.x+=(b.vx||0); b.y+=b.vy;
      if(b.y<-20||b.x<-20||b.x>W+20) bullets.splice(i,1);
    }

    // ENEMIES
    if(Math.random()<0.025+Math.min(0.04,(90-timeLeft)*0.001)) spawnEnemy();
    for(let i=enemies.length-1;i>=0;i--){
      const e=enemies[i]; e.x+=e.vx; e.y+=e.vy;
      if(e.x<e.r||e.x>W-e.r) e.vx*=-1;

      // bullet hit
      for(let j=bullets.length-1;j>=0;j--){
        const b=bullets[j];
        const d=Math.hypot(b.x-e.x,b.y-e.y);
        if(d<e.r+b.r){
          e.hp-=b.dmg;
          bullets.splice(j,1);
          explode(b.x,b.y,e.color);
          if(e.hp<=0){
            score+=e.score; combo++; kills++;
            if(combo>maxCombo) maxCombo=combo;
            explode(e.x,e.y,e.color);
            spawnGem(e.x,e.y);
            enemies.splice(i,1);
            break;
          }
        }
      }

      if(!enemies[i]) continue;

      // collide player
      const pd=Math.hypot(e.x-player.x,e.y-player.y);
      if(pd<e.r+22){
        hp--; combo=0; updateHP(); flashDamage();
        explode(e.x,e.y,'#ef4444');
        enemies.splice(i,1);
        if(hp<=0){ end(); return; }
      } else if(e.y>H+50){
        enemies.splice(i,1); combo=0;
      }
    }

    // GEMS
    for(let i=gems.length-1;i>=0;i--){
      const g=gems[i]; g.y+=g.vy; g.life--;
      const pd=Math.hypot(g.x-player.x,g.y-player.y);
      if(pd<32){
        powerLevel=Math.min(5,powerLevel+1);
        if(powerLevel===2){multishot=2; showPowerup('⚡ DOUBLE SHOT');}
        else if(powerLevel===4){multishot=3; showPowerup('🔥 TRIPLE SHOT');}
        else showPowerup('💎 POWER UP +'+powerLevel);
        score+=20;
        gems.splice(i,1);
      } else if(g.y>H||g.life<=0) gems.splice(i,1);
    }

    // PARTICLES
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.12; p.life--;
      if(p.life<=0) particles.splice(i,1);
    }
  }

  function draw(){
    ctx.fillStyle='rgba(10,10,30,0.4)';
    ctx.fillRect(0,0,W,H);

    // STARS
    ctx.fillStyle='#fff';
    stars.forEach(s=>{ctx.globalAlpha=0.5; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();});
    ctx.globalAlpha=1;

    // PLAYER (칫솔)
    ctx.save();
    ctx.translate(player.x,player.y);
    // 손잡이
    ctx.fillStyle='#c9a876';
    ctx.fillRect(-6,-4,12,28);
    // 칫솔모
    ctx.fillStyle='#fff';
    ctx.fillRect(-14,-26,28,18);
    ctx.fillStyle='#e0e0e0';
    for(let i=0;i<6;i++){ctx.fillRect(-13+i*4.5,-30,3,8);}
    // 글로우
    ctx.shadowColor='#c9a876'; ctx.shadowBlur=20;
    ctx.fillStyle='rgba(201,168,118,0.3)';
    ctx.beginPath(); ctx.arc(0,0,30,0,Math.PI*2); ctx.fill();
    ctx.restore();

    // BULLETS (스케일러 빛)
    bullets.forEach(b=>{
      ctx.save();
      ctx.shadowColor='#c9a876'; ctx.shadowBlur=12;
      ctx.fillStyle='#ffe0a8';
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(b.x,b.y-2,b.r*0.5,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });

    // ENEMIES
    enemies.forEach(e=>{
      ctx.save();
      ctx.font=(e.r*1.6)+'px serif';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      // HP bar
      if(e.maxHp>1){
        const w=e.r*1.6, hpr=e.hp/e.maxHp;
        ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.fillRect(e.x-w/2,e.y-e.r-10,w,3);
        ctx.fillStyle=e.boss?'#dc2626':'#c9a876'; ctx.fillRect(e.x-w/2,e.y-e.r-10,w*hpr,3);
      }
      ctx.fillText(e.emoji,e.x,e.y);
      if(e.boss){
        ctx.shadowColor='#dc2626'; ctx.shadowBlur=20;
        ctx.strokeStyle='#dc2626'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(e.x,e.y,e.r+6,0,Math.PI*2); ctx.stroke();
      }
      ctx.restore();
    });

    // GEMS
    gems.forEach(g=>{
      ctx.save();
      ctx.shadowColor='#7c3aed'; ctx.shadowBlur=16;
      ctx.font='22px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(g.emoji,g.x,g.y);
      ctx.restore();
    });

    // PARTICLES
    particles.forEach(p=>{
      ctx.globalAlpha=p.life/30;
      ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,2.5,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
  }

  function loop(now){
    if(state!=='playing') return;
    const dt=Math.min(33,now-lastFrame); lastFrame=now;
    timeLeft=Math.max(0,90-(now-startTime)/1000);
    if(timeLeft<=0){ end(); return; }
    update(dt); draw();
    scoreEl.textContent=score;
    comboEl.textContent='COMBO x'+combo;
    comboEl.classList.toggle('active',combo>=3);
    const m=Math.floor(timeLeft/60), s=Math.floor(timeLeft%60);
    timerEl.textContent=m+':'+(s<10?'0':'')+s;
    requestAnimationFrame(loop);
  }

  function start(){
    state='playing'; init();
    introScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    hud.classList.add('active');
    pauseBtn.classList.add('active');
    pauseBtn.innerHTML='<i class="fas fa-pause"></i>';
    startTime=performance.now(); lastFrame=startTime;
    requestAnimationFrame(loop);
  }

  function end(){
    state='result';
    hud.classList.remove('active');
    pauseBtn.classList.remove('active');
    let grade,gradeClass,emoji,msg;
    if(score>=2500){grade='💎 PERFECT — 구강 청결도 최상';gradeClass='grade-perfect';emoji='💎';msg='완벽합니다! 365 RUSH도 도전해보세요.';}
    else if(score>=1500){grade='✨ HEALTHY — 건강한 치아';gradeClass='grade-healthy';emoji='🦷';msg='훌륭해요. 6개월에 한 번 스케일링으로 이 상태 유지!';}
    else if(score>=700){grade='🟢 NORMAL — 평균 수준';gradeClass='grade-normal';emoji='🪥';msg='괜찮아요. 6개월 정기검진 받으시면 좋겠어요.';}
    else {grade='💀 DANGER — 치석 위험';gradeClass='grade-skull';emoji='💀';msg='지금 바로 스케일링 받으세요. 건강보험 적용됩니다.';}
    document.getElementById('resultEmoji').textContent=emoji;
    const ge=document.getElementById('resultGrade');
    ge.textContent=grade; ge.className='result-grade '+gradeClass;
    document.getElementById('resultScore').textContent=score;
    document.getElementById('rsKills').textContent=kills;
    document.getElementById('rsCombo').textContent='x'+maxCombo;
    document.getElementById('rsTime').textContent=Math.floor(90-timeLeft)+'초';
    document.getElementById('resultMsg').textContent=msg;
    resultScreen.classList.add('active');
  }

  btnStart.addEventListener('click',start);
  btnRetry.addEventListener('click',start);
})();
    `}}/>
  </>
)
