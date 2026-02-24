// =========================================================
// 문자열
// =========================================================
const STRINGS = {
  toast: {
    needPants: "먼저 하의 색부터 선택하세요",
    pantsSelected: (name) => `${name} 하의 선택 ✅`,
    shirtApplied: (name) => `상의 ${name} 적용!`,
    needPantsForBoom: "먼저 하의 색부터 선택해 주세요!",
    fireworks: "폭죽 🎆 (화면 가득)"
  },
  callout: {
    needPants: "하의 색을 먼저 선택해 주세요. 선택하면 오른쪽에 추천/비추/그닥 색이 나타납니다.",
    needPantsShort: "하의 색을 먼저 선택해 주세요. (오른쪽 5가지 중 선택)",
    pantsPicked: (name) => `지금 하의는 <b>${name}</b>입니다.<br/>오른쪽에서 상의 컬러를 <b>클릭</b>하면 조합 멘트가 표시됩니다.`
  }
};

// =========================================================
// 팔레트(네온X, 다운톤)
// =========================================================
const COLORS = {
  "녹색":   { hex:"#2F7D57" },
  "파란색": { hex:"#2F5FAF" },
  "노란색": { hex:"#D7A63A" },
  "핑크":   { hex:"#D08AAA" },
  "네이비": { hex:"#1D2B5B" },
  "흰색":   { hex:"#F3F4F6" },
  "진청":   { hex:"#1F3B6F" },
  "흑청":   { hex:"#16233A" },
  "연청":   { hex:"#82A9D6" },
  "아이보리": { hex:"#F2EBDD" },
  "크림":   { hex:"#F6E6C8" },
  "베이지": { hex:"#C7B08B" },
  "카키":   { hex:"#6B7B4E" },
  "브라운": { hex:"#6B3F2A" },
  "차콜":   { hex:"#3A3C43" },
  "검정":   { hex:"#111318" }
};

// =========================================================
// 아이콘(이미지) - inline SVG data URI
// =========================================================
function svgDataUri(svg){
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
const ICON = {
  heart: svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 21
           C12 21, 4 15.6, 4 9.8
           C4 6.6, 6.4 4.5, 9.1 4.5
           C10.9 4.5, 12 5.6, 12 5.6
           C12 5.6, 13.1 4.5, 14.9 4.5
           C17.6 4.5, 20 6.6, 20 9.8
           C20 15.6, 12 21, 12 21 Z"
        fill="#E11D48"
      />
    </svg>
  `),
  circle: svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" fill="#ffffff" />
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="#111827" stroke-width="2.4"/>
    </svg>
  `),
  triangle: svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 5.3 L20 19 H4 Z" fill="#ffffff" stroke="#111827" stroke-width="2.4" stroke-linejoin="round"/>
    </svg>
  `),
  x: svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M6.5 6.5 L17.5 17.5" stroke="#DC2626" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M17.5 6.5 L6.5 17.5" stroke="#DC2626" stroke-width="3.2" stroke-linecap="round"/>
    </svg>
  `)
};

const GRADE = {
  "강추": { icon: ICON.heart, phrase: "오늘 각이다" },
  "괜찮음": { icon: ICON.circle, phrase: "낫 밷" },
  "그닥": { icon: ICON.triangle, phrase: "상대방 반응 체크하자" },
  "비추": { icon: ICON.x, phrase: "와 요즘은 콘돔이 이렇게도 나오네" }
};

// =========================================================
// 룰 데이터
// =========================================================
const RULES = {
  "진청": {
    good: [
      { color:"파란색", grade:"강추" },
      { color:"노란색", grade:"강추" }
    ],
    bad: [
      { color:"네이비", grade:"비추" }
    ],
    meh: [
      { color:"핑크", grade:"괜찮음" },
      { color:"흰색", grade:"강추" }
    ]
  },
  "흑청": {
    good: [
      { color:"흰색", grade:"강추" },
      { color:"노란색", grade:"강추" }
    ],
    bad: [
      { color:"네이비", grade:"비추" }
    ],
    meh: [
      { color:"핑크", grade:"괜찮음" },
      { color:"베이지", grade:"괜찮음" }
    ]
  },
  "연청": {
    good: [
      { color:"녹색", grade:"강추" },
      { color:"흰색", grade:"강추" }
    ],
    bad: [
      { color:"노란색", grade:"비추" }
    ],
    meh: [
      { color:"파란색", grade:"그닥" },
      { color:"네이비", grade:"괜찮음" }
    ]
  },
  "아이보리": {
    good: [
      { color:"네이비", grade:"강추" },
      { color:"파란색", grade:"강추" }
    ],
    bad: [
      { color:"노란색", grade:"그닥" }
    ],
    meh: [
      { color:"녹색", grade:"괜찮음" },
      { color:"차콜", grade:"괜찮음" }
    ]
  },
  "크림": {
    good: [
      { color:"네이비", grade:"강추" },
      { color:"차콜", grade:"강추" }
    ],
    bad: [
      { color:"노란색", grade:"그닥" }
    ],
    meh: [
      { color:"파란색", grade:"괜찮음" },
      { color:"핑크", grade:"괜찮음" }
    ]
  },
  "베이지": {
    good: [
      { color:"네이비", grade:"강추" },
      { color:"흰색", grade:"강추" }
    ],
    bad: [
      { color:"핑크", grade:"그닥" },
      { color:"노란색", grade:"그닥" }
    ],
    meh: [
      { color:"녹색", grade:"괜찮음" },
      { color:"파란색", grade:"괜찮음" }
    ]
  },
  "카키": {
    good: [
      { color:"흰색", grade:"강추" },
      { color:"네이비", grade:"강추" }
    ],
    bad: [
      { color:"녹색", grade:"비추" }
    ],
    meh: [
      { color:"파란색", grade:"괜찮음" },
      { color:"노란색", grade:"그닥" }
    ]
  },
  "브라운": {
    good: [
      { color:"흰색", grade:"강추" },
      { color:"파란색", grade:"강추" }
    ],
    bad: [
      { color:"검정", grade:"그닥" }
    ],
    meh: [
      { color:"베이지", grade:"괜찮음" },
      { color:"노란색", grade:"괜찮음" }
    ]
  },
  "차콜": {
    good: [
      { color:"네이비", grade:"강추" },
      { color:"노란색", grade:"괜찮음" }
    ],
    bad: [
      { color:"녹색", grade:"비추" },
      { color:"파란색", grade:"비추" }
    ],
    meh: [
      { color:"핑크", grade:"그닥" },
      { color:"흰색", grade:"괜찮음" }
    ]
  },
  "검정": {
    good: [
      { color:"흰색", grade:"강추" },
      { color:"노란색", grade:"강추" }
    ],
    bad: [
      { color:"네이비", grade:"그닥" },
      { color:"녹색", grade:"그닥" }
    ],
    meh: [
      { color:"파란색", grade:"괜찮음" },
      { color:"핑크", grade:"괜찮음" }
    ]
  }
};

// =========================================================
// 유틸
// =========================================================
function validateRules(){
  const missing = [];
  Object.entries(RULES).forEach(([pants, rule]) => {
    [pants].forEach((name)=>{
      if (!COLORS[name]) missing.push(name);
    });

    const groups = [rule.good, rule.bad, rule.meh].filter(Boolean);
    groups.forEach(list => {
      list.forEach(item => {
        if (!COLORS[item.color]) missing.push(item.color);
      });
    });
  });

  if (missing.length){
    const unique = [...new Set(missing)];
    console.warn("RULES에 정의된 색이 COLORS에 없습니다:", unique);
  }
}

// =========================================================
// 대비 계산
// =========================================================
function hexToRgb(hex){
  const h = hex.replace("#","").trim();
  const full = h.length===3 ? h.split("").map(c=>c+c).join("") : h;
  const n = parseInt(full, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
function relLuminance(hex){
  const {r,g,b} = hexToRgb(hex);
  const srgb = [r,g,b].map(v=>{
    const c = v/255;
    return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}
function isDark(hex){ return relLuminance(hex) < 0.42; }

function chipStyle(hex){
  const dark = isDark(hex);
  return {
    text: dark ? "rgba(255,255,255,.94)" : "rgba(15,23,42,.92)",
    border: dark ? "rgba(255,255,255,.22)" : "rgba(15,23,42,.14)",
    markBg: "rgba(255,255,255,.92)",
    bgTop: hex,
    bgBottom: hex + "cc"
  };
}

// =========================================================
// App
// =========================================================
const App = {
  state: {
    selectedPants: null,
    selectedShirt: null,
    reduceMotion: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  },

  el: {},

  init(){
    this.cacheEls();
    this.bindStatic();
    this.setupIcons();
    this.makePantsButtons();
    this.setNeedsPants(true);

    this.el.goodChips.innerHTML = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
    this.el.badChips.innerHTML  = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
    this.el.mehChips.innerHTML  = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;

    validateRules();
  },

  cacheEls(){
    this.el = {
      pantsButtons: document.getElementById("pantsButtons"),
      goodChips: document.getElementById("goodChips"),
      badChips: document.getElementById("badChips"),
      mehChips: document.getElementById("mehChips"),
      pantsFill: document.getElementById("pantsFill"),
      shirtFill: document.getElementById("shirtFill"),
      statePill: document.getElementById("statePill"),
      shirtPill: document.getElementById("shirtPill"),
      statusCallout: document.getElementById("statusCallout"),
      pantsPickBanner: document.getElementById("pantsPickBanner"),
      btnFocusPants: document.getElementById("btnFocusPants"),
      pantsTitle: document.getElementById("pantsTitle"),
      rightPanel: document.getElementById("rightPanel"),
      btnBoom: document.getElementById("btnBoom"),
      toast: document.getElementById("toast"),
      fxCanvas: document.getElementById("fxCanvas"),
      legendHeart: document.getElementById("legendHeart"),
      legendCircle: document.getElementById("legendCircle"),
      legendTriangle: document.getElementById("legendTriangle"),
      legendX: document.getElementById("legendX")
    };
  },

  bindStatic(){
    this.el.btnFocusPants.addEventListener("click", ()=>{
      this.el.pantsTitle.scrollIntoView({ behavior:"smooth", block:"center" });
      const firstBtn = this.el.pantsButtons.querySelector("button");
      if (firstBtn) firstBtn.focus({ preventScroll:true });
    });

    this.el.btnBoom.addEventListener("click", ()=>{
      if(!this.state.selectedPants){
        this.showToast(STRINGS.toast.needPantsForBoom);
        this.el.statusCallout.textContent = STRINGS.callout.needPantsShort;
        this.setNeedsPants(true);
        return;
      }
      this.fireworks();
      this.playPop();
      this.showToast(STRINGS.toast.fireworks);
    });

    if (this.el.fxCanvas){
      this.fxCtx = this.el.fxCanvas.getContext("2d");
      this.fitFxCanvas();
      window.addEventListener("resize", ()=> this.fitFxCanvas());
    }
  },

  setupIcons(){
    this.el.legendHeart.src = ICON.heart;
    this.el.legendCircle.src = ICON.circle;
    this.el.legendTriangle.src = ICON.triangle;
    this.el.legendX.src = ICON.x;
  },

  showToast(msg){
    this.el.toast.textContent = msg;
    this.el.toast.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(()=> this.el.toast.classList.remove("show"), 1400);
  },

  setNeedsPants(on){
    if (on){
      this.el.pantsPickBanner.classList.add("show");
      this.el.pantsButtons.classList.add("attention");
      this.el.rightPanel.classList.add("needsPants");
      this.showToast(STRINGS.toast.needPants);
    }else{
      this.el.pantsPickBanner.classList.remove("show");
      this.el.pantsButtons.classList.remove("attention");
      this.el.rightPanel.classList.remove("needsPants");
    }
  },

  makePantsButtons(){
    const pantsList = ["진청","흑청","연청","아이보리","크림","베이지","카키","브라운","차콜","검정"];
    this.el.pantsButtons.innerHTML = "";
    pantsList.forEach(name=>{
      const b = document.createElement("button");
      b.className = "btn";
      b.type = "button";
      b.innerHTML = `<span>${name}</span><span class="swatch" style="background:${COLORS[name].hex}"></span>`;
      b.addEventListener("click", ()=> this.selectPants(name));
      this.el.pantsButtons.appendChild(b);
    });
  },

  renderChips(el, items){
    el.innerHTML = "";
    if (!this.state.selectedPants){
      el.innerHTML = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
      return;
    }
    if (!items || items.length === 0){
      el.innerHTML = `<div class="muted">없음</div>`;
      return;
    }

    items.slice(0,2).forEach(it=>{
      const hex = COLORS[it.color].hex;
      const s = chipStyle(hex);

      const c = document.createElement("div");
      c.className = "chip";
      c.setAttribute("role","button");
      c.setAttribute("tabindex","0");

      c.style.background = `linear-gradient(180deg, ${s.bgTop}, ${s.bgBottom})`;
      c.style.color = s.text;
      c.style.borderColor = s.border;

      const iconSrc = (GRADE[it.grade] && GRADE[it.grade].icon) ? GRADE[it.grade].icon : ICON.circle;

      c.innerHTML = `
        <span class="mark" style="background:${s.markBg}">
          <img src="${iconSrc}" alt="${it.grade} 아이콘"/>
        </span>
        <span>${it.color}</span>
      `;

      const apply = ()=> this.applyShirt(it.color, it.grade);
      c.addEventListener("click", apply);
      c.addEventListener("keydown", (e)=>{
        if (e.key === "Enter" || e.key === " "){
          e.preventDefault();
          apply();
        }
      });

      el.appendChild(c);
    });
  },

  selectPants(name){
    this.state.selectedPants = name;
    this.el.statePill.textContent = "하의 선택: " + name;
    this.el.pantsFill.setAttribute("fill", COLORS[name].hex);

    this.state.selectedShirt = null;
    this.el.shirtFill.setAttribute("fill", "transparent");
    this.el.shirtPill.textContent = "상의 선택: 아직";

    this.setNeedsPants(false);

    const r = RULES[name];
    this.renderChips(this.el.goodChips, r.good);
    let badList = (r.bad && r.bad.length) ? r.bad : [];
    if (!badList.length && r.meh && r.meh.length) badList = r.meh.slice(0,2);
    this.renderChips(this.el.badChips, badList);
    this.renderChips(this.el.mehChips, r.meh || []);

    this.el.statusCallout.innerHTML = STRINGS.callout.pantsPicked(name);
    this.showToast(STRINGS.toast.pantsSelected(name));
  },

  applyShirt(colorName, grade){
    this.state.selectedShirt = colorName;
    this.el.shirtFill.setAttribute("fill", COLORS[colorName].hex);
    this.el.shirtPill.textContent = "상의 선택: " + colorName;

    const iconSrc = (GRADE[grade] && GRADE[grade].icon) ? GRADE[grade].icon : ICON.circle;
    const phrase = (GRADE[grade] && GRADE[grade].phrase) ? GRADE[grade].phrase : "";

    this.el.statusCallout.innerHTML = `
      <div style="display:flex; gap:10px; align-items:flex-start; flex-wrap:wrap;">
        <span class="badgeIcon">
          <img class="iconImg" src="${iconSrc}" alt="${grade} 아이콘" />
          <b>${grade}</b>
        </span>
        <div style="display:grid; gap:4px;">
          <div style="color: rgba(15,23,42,.86); font-size:12px; line-height:1.4;">
            <b>${this.state.selectedPants}</b> + <b>${colorName}</b>
          </div>
          <div style="color: rgba(15,23,42,.70); font-size:12px; line-height:1.45;">
            ${phrase}
          </div>
        </div>
      </div>
    `;
    this.showToast(STRINGS.toast.shirtApplied(colorName));
  },

  fitFxCanvas(){
    if (!this.el.fxCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.viewport = { w: window.innerWidth, h: window.innerHeight };
    this.el.fxCanvas.width = Math.floor(this.viewport.w * dpr);
    this.el.fxCanvas.height = Math.floor(this.viewport.h * dpr);
    this.el.fxCanvas.style.width = this.viewport.w + "px";
    this.el.fxCanvas.style.height = this.viewport.h + "px";
    this.fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  },

  rand(min, max){ return Math.random() * (max - min) + min; },

  playPop(){
    if (this.state.reduceMotion) return;
    try{
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const t0 = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, t0);
      osc.frequency.exponentialRampToValueAtTime(180, t0 + 0.08);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.30, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
      osc.connect(gain).connect(this.audioCtx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.14);

      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.18;

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;

      const nGain = this.audioCtx.createGain();
      nGain.gain.setValueAtTime(0.0001, t0);
      nGain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02);
      nGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(900, t0);

      noise.connect(filter).connect(nGain).connect(this.audioCtx.destination);
      noise.start(t0);
      noise.stop(t0 + 0.24);
    }catch(e){}
  },

  fireworks(){
    if (this.state.reduceMotion || !this.fxCtx || !this.viewport) return;

    const bursts = 6;
    const totalParticlesPerBurst = 220;
    const gravity = 0.18;
    const drag = 0.992;

    let particles = [];
    for (let b=0;b<bursts;b++){
      const cx = this.rand(this.viewport.w*0.15, this.viewport.w*0.85);
      const cy = this.rand(this.viewport.h*0.15, this.viewport.h*0.65);
      for (let i=0;i<totalParticlesPerBurst;i++){
        const a = this.rand(0, Math.PI*2);
        const s = this.rand(4.5, 12.5);
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - this.rand(2, 8),
          r: this.rand(1.8, 3.8),
          life: this.rand(60, 115),
          hue: this.rand(0, 360)
        });
      }
    }

    const tick = ()=>{
      this.fxCtx.clearRect(0,0,this.viewport.w,this.viewport.h);

      let alive = 0;
      for (const p of particles){
        if (p.life <= 0) continue;
        alive++;

        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        const a = Math.max(0, p.life / 120);
        this.fxCtx.globalAlpha = a;

        this.fxCtx.beginPath();
        this.fxCtx.fillStyle = `hsl(${p.hue}, 85%, 60%)`;
        this.fxCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        this.fxCtx.fill();
      }

      if (alive > 0) requestAnimationFrame(tick);
      else this.fxCtx.clearRect(0,0,this.viewport.w,this.viewport.h);
    };
    requestAnimationFrame(tick);
  }
};

// =========================================================
// 초기화
// =========================================================
App.init();
