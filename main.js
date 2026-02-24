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

const EDU_TEXT = {
  contrast: "하의가 어두우면 상의는 밝게 가는 게 안전합니다.",
  harmony: "같은 계열이라 튀지 않고 자연스럽습니다.",
  point: "상의에 포인트를 줘서 시선이 분산됩니다.",
  avoid: "이 조합은 촌스러워 보일 확률이 높습니다."
};

const STYLE_LINE = {
  "셔츠":  "셔츠는 ‘깔끔함’이 이깁니다. 톤을 정돈하세요.",
  "맨투맨":"맨투맨은 ‘무난함’이 정답입니다. 과한 색은 피하세요.",
  "후드티":"후드티는 ‘캐주얼’이 핵심입니다. 대비를 너무 세게 주지 마세요.",
  "니트":  "니트는 ‘고급스러움’이 포인트입니다. 뉴트럴 톤이 안전합니다."
};

const SHIRT_GROUP = {
  core: ["흰색","아이보리","크림","그레이","차콜","네이비","베이지"],
  earth: ["브라운","카키"],
  accent: ["파란색","노란색","핑크","녹색"]
};

function shirtBaseScore(shirtName, pantsName){
  if (SHIRT_GROUP.core.indexOf(shirtName) !== -1) return 2;
  if (SHIRT_GROUP.earth.indexOf(shirtName) !== -1) return 1;

  // accent는 기본적으로 불리
  if (SHIRT_GROUP.accent.indexOf(shirtName) !== -1){
    // 단, 하의가 무채/중립이면 패널티 완화
    if (pantsName === "검정" || pantsName === "차콜" || pantsName === "네이비" || pantsName === "베이지"){
      return 0;
    }
    return -1;
  }
  return 0;
}

const EDU_CASES = [
  {"pants":"검정","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"검정","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"검정","shirt":"크림","eduKey":"contrast","weight":3},
  {"pants":"검정","shirt":"베이지","eduKey":"harmony","weight":2},
  // 제외됨: pants=검정 shirt=그레이 (COLORS에 없음)
  {"pants":"검정","shirt":"파란색","eduKey":"harmony","weight":2},
  {"pants":"검정","shirt":"카키","eduKey":"point","weight":1},
  {"pants":"검정","shirt":"브라운","eduKey":"point","weight":1},

  {"pants":"차콜","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"차콜","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"차콜","shirt":"크림","eduKey":"contrast","weight":3},
  {"pants":"차콜","shirt":"파란색","eduKey":"contrast","weight":3},
  {"pants":"차콜","shirt":"네이비","eduKey":"harmony","weight":2},
  // 제외됨: pants=차콜 shirt=그레이 (COLORS에 없음)
  {"pants":"차콜","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"차콜","shirt":"브라운","eduKey":"point","weight":1},

  {"pants":"네이비","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"네이비","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"네이비","shirt":"크림","eduKey":"contrast","weight":3},
  {"pants":"네이비","shirt":"파란색","eduKey":"harmony","weight":2},
  // 제외됨: pants=네이비 shirt=그레이 (COLORS에 없음)
  {"pants":"네이비","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"네이비","shirt":"브라운","eduKey":"point","weight":1},
  {"pants":"네이비","shirt":"카키","eduKey":"point","weight":1},

  {"pants":"진청","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"진청","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"진청","shirt":"크림","eduKey":"contrast","weight":3},
  {"pants":"진청","shirt":"파란색","eduKey":"harmony","weight":3},
  // 제외됨: pants=진청 shirt=그레이 (COLORS에 없음)
  {"pants":"진청","shirt":"차콜","eduKey":"harmony","weight":2},
  {"pants":"진청","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"진청","shirt":"브라운","eduKey":"point","weight":1},

  {"pants":"흑청","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"흑청","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"흑청","shirt":"크림","eduKey":"contrast","weight":3},
  // 제외됨: pants=흑청 shirt=그레이 (COLORS에 없음)
  {"pants":"흑청","shirt":"차콜","eduKey":"harmony","weight":2},
  {"pants":"흑청","shirt":"파란색","eduKey":"harmony","weight":2},
  {"pants":"흑청","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"흑청","shirt":"브라운","eduKey":"point","weight":1},

  {"pants":"연청","shirt":"흰색","eduKey":"harmony","weight":3},
  {"pants":"연청","shirt":"아이보리","eduKey":"harmony","weight":3},
  {"pants":"연청","shirt":"크림","eduKey":"harmony","weight":2},
  {"pants":"연청","shirt":"네이비","eduKey":"contrast","weight":3},
  {"pants":"연청","shirt":"차콜","eduKey":"contrast","weight":2},
  // 제외됨: pants=연청 shirt=그레이 (COLORS에 없음)
  {"pants":"연청","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"연청","shirt":"파란색","eduKey":"harmony","weight":2},

  {"pants":"베이지","shirt":"네이비","eduKey":"contrast","weight":3},
  {"pants":"베이지","shirt":"파란색","eduKey":"contrast","weight":2},
  {"pants":"베이지","shirt":"흰색","eduKey":"harmony","weight":3},
  {"pants":"베이지","shirt":"아이보리","eduKey":"harmony","weight":3},
  {"pants":"베이지","shirt":"크림","eduKey":"harmony","weight":2},
  // 제외됨: pants=베이지 shirt=그레이 (COLORS에 없음)
  {"pants":"베이지","shirt":"차콜","eduKey":"harmony","weight":2},
  {"pants":"베이지","shirt":"브라운","eduKey":"harmony","weight":2},

  {"pants":"아이보리","shirt":"네이비","eduKey":"contrast","weight":3},
  {"pants":"아이보리","shirt":"차콜","eduKey":"contrast","weight":2},
  // 제외됨: pants=아이보리 shirt=그레이 (COLORS에 없음)
  {"pants":"아이보리","shirt":"파란색","eduKey":"harmony","weight":2},
  {"pants":"아이보리","shirt":"브라운","eduKey":"harmony","weight":2},
  {"pants":"아이보리","shirt":"카키","eduKey":"point","weight":1},
  {"pants":"아이보리","shirt":"녹색","eduKey":"point","weight":1},
  {"pants":"아이보리","shirt":"베이지","eduKey":"harmony","weight":2},

  {"pants":"크림","shirt":"네이비","eduKey":"contrast","weight":3},
  {"pants":"크림","shirt":"차콜","eduKey":"contrast","weight":2},
  // 제외됨: pants=크림 shirt=그레이 (COLORS에 없음)
  {"pants":"크림","shirt":"파란색","eduKey":"harmony","weight":2},
  {"pants":"크림","shirt":"브라운","eduKey":"harmony","weight":2},
  {"pants":"크림","shirt":"카키","eduKey":"point","weight":1},
  {"pants":"크림","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"크림","shirt":"녹색","eduKey":"point","weight":1},

  {"pants":"카키","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"카키","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"카키","shirt":"크림","eduKey":"contrast","weight":2},
  {"pants":"카키","shirt":"네이비","eduKey":"harmony","weight":3},
  {"pants":"카키","shirt":"파란색","eduKey":"harmony","weight":2},
  // 제외됨: pants=카키 shirt=그레이 (COLORS에 없음)
  {"pants":"카키","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"카키","shirt":"브라운","eduKey":"harmony","weight":2},

  {"pants":"브라운","shirt":"흰색","eduKey":"contrast","weight":3},
  {"pants":"브라운","shirt":"아이보리","eduKey":"contrast","weight":3},
  {"pants":"브라운","shirt":"크림","eduKey":"contrast","weight":2},
  {"pants":"브라운","shirt":"파란색","eduKey":"contrast","weight":3},
  {"pants":"브라운","shirt":"네이비","eduKey":"harmony","weight":2},
  // 제외됨: pants=브라운 shirt=그레이 (COLORS에 없음)
  {"pants":"브라운","shirt":"베이지","eduKey":"harmony","weight":2},
  {"pants":"브라운","shirt":"카키","eduKey":"harmony","weight":2}
];

const EDU_BAD_CASES = [
  /* 둘 다 너무 어두움(답답) */
  {"pants":"검정","shirt":"네이비","weight":3},
  {"pants":"검정","shirt":"차콜","weight":2},
  {"pants":"검정","shirt":"흑청","weight":2},

  {"pants":"네이비","shirt":"검정","weight":3},
  {"pants":"네이비","shirt":"흑청","weight":2},
  {"pants":"네이비","shirt":"차콜","weight":2},

  {"pants":"차콜","shirt":"검정","weight":3},
  {"pants":"차콜","shirt":"네이비","weight":2},
  {"pants":"차콜","shirt":"흑청","weight":2},

  {"pants":"흑청","shirt":"검정","weight":3},
  {"pants":"흑청","shirt":"네이비","weight":2},
  {"pants":"흑청","shirt":"흑청","weight":3},

  /* 데님온데님(난이도) */
  {"pants":"진청","shirt":"흑청","weight":2},
  {"pants":"진청","shirt":"진청","weight":2},
  {"pants":"연청","shirt":"연청","weight":2},

  /* 톤 겹침(카키/그린 계열) */
  {"pants":"카키","shirt":"녹색","weight":3},
  {"pants":"카키","shirt":"카키","weight":2},
  {"pants":"녹색","shirt":"카키","weight":2},

  /* 포인트색이 애매한 하의에서 촌스러울 가능성 */
  {"pants":"베이지","shirt":"노란색","weight":2},
  {"pants":"베이지","shirt":"핑크","weight":2},
  {"pants":"아이보리","shirt":"노란색","weight":2},
  {"pants":"아이보리","shirt":"핑크","weight":2},
  {"pants":"크림","shirt":"노란색","weight":2},
  {"pants":"크림","shirt":"핑크","weight":2},
  {"pants":"연청","shirt":"노란색","weight":2},
  {"pants":"연청","shirt":"핑크","weight":2},

  /* 브라운 + 카키 과하면 답답/촌스러움 가능 */
  {"pants":"브라운","shirt":"카키","weight":2},
  {"pants":"카키","shirt":"브라운","weight":2},

  /* 차콜/검정 + 노란/핑크는 사람에 따라 튈 수 있어 경고 */
  {"pants":"차콜","shirt":"노란색","weight":1},
  {"pants":"차콜","shirt":"핑크","weight":1},
  {"pants":"검정","shirt":"노란색","weight":1},
  {"pants":"검정","shirt":"핑크","weight":1}
];

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

function getEduKey(pantsName, shirtName, grade){
  // 기본값: contrast
  const pantsHex = COLORS[pantsName] ? COLORS[pantsName].hex : null;
  const shirtHex = COLORS[shirtName] ? COLORS[shirtName].hex : null;
  if (!pantsHex || !shirtHex) return "contrast";

  const pantsDark = isDark(pantsHex);
  const shirtDark = isDark(shirtHex);

  // 1) 밝기 대비: 하의 어두움 + 상의 밝음 또는 하의 밝음 + 상의 어두움
  if (pantsDark !== shirtDark) return "contrast";

  // 2) 실패 회피: 둘 다 어두우면(답답해 보일 확률) + 비추/그닥일 때만
  if ((grade === "비추" || grade === "그닥") && pantsDark && shirtDark) return "avoid";

  // 3) 포인트 배치: 둘 다 밝은데 노란색/핑크 같이 눈에 띄는 상의면 포인트로 처리
  if (!pantsDark && !shirtDark && (shirtName === "노란색" || shirtName === "핑크")) return "point";

  // 4) 색 계열 통일: 나머지는 harmony
  return "harmony";
}

function getStyleLine(){
  if (typeof App === "undefined" || !App.state || !App.state.selectedTopType) return "";
  return STYLE_LINE[App.state.selectedTopType] || "";
}

function findEduKeyFromCases(pantsName, shirtName){
  for (var i=0;i<EDU_CASES.length;i++){
    var c = EDU_CASES[i];
    if (c.pants === pantsName && c.shirt === shirtName) return c.eduKey;
  }
  return null;
}

function caseWeight(pantsName, shirtName){
  for (var i=0;i<EDU_CASES.length;i++){
    var c = EDU_CASES[i];
    if (c.pants === pantsName && c.shirt === shirtName) return c.weight || 1;
  }
  return 0;
}

function badWeight(pantsName, shirtName){
  for (var i=0;i<EDU_BAD_CASES.length;i++){
    var c = EDU_BAD_CASES[i];
    if (c.pants === pantsName && c.shirt === shirtName) return c.weight || 1;
  }
  return 0;
}

// =========================================================
// App
// =========================================================
const App = {
  state: {
    selectedPants: null,
    selectedShirt: null,
    selectedGrade: null,
    selectedBottomFit: null,
    selectedTopType: null,
    reduceMotion: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  },

  el: {},

  init(){
    this.cacheEls();
    this.bindStatic();
    this.setupIcons();
    this.makePantsButtons();
    this.makeBottomFitButtons();
    this.makeTopTypeButtons();
    this.setNeedsPants(true);

    this.el.goodChips.innerHTML = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
    this.el.badChips.innerHTML  = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
    this.el.mehChips.innerHTML  = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;

    validateRules();
  },

  cacheEls(){
    this.el = {
      pantsButtons: document.getElementById("pantsButtons"),
      bottomFitButtons: document.getElementById("bottomFitButtons"),
      topTypeButtons: document.getElementById("topTypeButtons"),
      goodChips: document.getElementById("goodChips"),
      badChips: document.getElementById("badChips"),
      mehChips: document.getElementById("mehChips"),
      pantsFill: document.getElementById("pantsFill"),
      shirtFill: document.getElementById("shirtFill"),
      statePill: document.getElementById("statePill"),
      shirtPill: document.getElementById("shirtPill"),
      fitPill: document.getElementById("fitPill"),
      topTypePill: document.getElementById("topTypePill"),
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
      b.setAttribute("data-color", name);
      b.innerHTML = `<span>${name}</span><span class="swatch" style="background:${COLORS[name].hex}"></span>`;
      b.addEventListener("click", ()=> this.selectPants(name));
      this.el.pantsButtons.appendChild(b);
    });
  },

  makeBottomFitButtons(){
    const fits = ["슬림","레귤러","와이드"];
    this.el.bottomFitButtons.innerHTML = "";
    fits.forEach(name=>{
      const b = document.createElement("button");
      b.className = "btn";
      b.type = "button";
      b.textContent = name;
      b.addEventListener("click", ()=> this.selectBottomFit(name));
      this.el.bottomFitButtons.appendChild(b);
    });
  },

  makeTopTypeButtons(){
    const types = ["셔츠","맨투맨","후드티","니트"];
    this.el.topTypeButtons.innerHTML = "";
    types.forEach(name=>{
      const b = document.createElement("button");
      b.className = "btn";
      b.type = "button";
      b.textContent = name;
      b.addEventListener("click", ()=> this.selectTopType(name));
      this.el.topTypeButtons.appendChild(b);
    });
  },

  updateSelectedButtons(container, selectedText){
    const btns = container.querySelectorAll("button");
    btns.forEach(btn => {
      if (btn.textContent === selectedText) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  },

  sortByWeight(list, pantsName, weightFn, priorityColors, baseScoreFn){
    const items = list ? list.slice() : [];
    if (!items.length) return [];
    const pri = priorityColors || [];
    return items
      .map((item, idx)=> ({ item, idx }))
      .sort((a, b)=>{
        const wa = weightFn(pantsName, a.item.color);
        const wb = weightFn(pantsName, b.item.color);
        const sa = baseScoreFn ? baseScoreFn(a.item.color, pantsName) : 0;
        const sb = baseScoreFn ? baseScoreFn(b.item.color, pantsName) : 0;
        const scoreA = (wa * 10) + sa;
        const scoreB = (wb * 10) + sb;
        if (scoreB !== scoreA) return scoreB - scoreA;
        if (pri.length){
          const pa = pri.indexOf(a.item.color);
          const pb = pri.indexOf(b.item.color);
          const aPri = pa === -1 ? 999 : pa;
          const bPri = pb === -1 ? 999 : pb;
          if (aPri !== bPri) return aPri - bPri;
        }
        return a.idx - b.idx;
      })
      .map(x => x.item);
  },

  adjustListsForSelections(rule){
    const pantsName = this.state.selectedPants;
    let boostColors = null;
    if (this.state.selectedTopType === "셔츠") boostColors = ["흰색","파란색"];
    else if (this.state.selectedTopType === "후드티" || this.state.selectedTopType === "맨투맨") boostColors = ["차콜","베이지"];
    else if (this.state.selectedTopType === "니트") boostColors = ["흰색","베이지"];

    const good = this.sortByWeight(rule.good || [], pantsName, caseWeight, boostColors, shirtBaseScore);
    const meh = this.sortByWeight(rule.meh || [], pantsName, caseWeight, boostColors, shirtBaseScore);
    const bad = this.sortByWeight(rule.bad || [], pantsName, badWeight, null);

    return { good, bad, meh };
  },

  refreshRecommendations(){
    if (!this.state.selectedPants) return;
    const r = RULES[this.state.selectedPants];
    const adjusted = this.adjustListsForSelections(r);
    const goodList = adjusted.good ? adjusted.good.slice() : [];
    if (goodList.length < 4){
      const extras = (adjusted.meh || []).filter(it => !goodList.some(g => g.color === it.color));
      while (goodList.length < 4 && extras.length){
        goodList.push(extras.shift());
      }
    }
    this.renderChips(this.el.goodChips, goodList, 4);
    let badList = (adjusted.bad && adjusted.bad.length) ? adjusted.bad.slice() : [];
    if (!badList.length && adjusted.meh && adjusted.meh.length) badList = adjusted.meh.slice(0,2);
    badList = this.sortByWeight(badList, this.state.selectedPants, badWeight, null);
    this.renderChips(this.el.badChips, badList, 2);
    this.renderChips(this.el.mehChips, adjusted.meh || [], 2);
  },

  renderStatusCallout(grade, colorName){
    const iconSrc = (GRADE[grade] && GRADE[grade].icon) ? GRADE[grade].icon : ICON.circle;
    const phrase = (GRADE[grade] && GRADE[grade].phrase) ? GRADE[grade].phrase : "";
    const bw = badWeight(this.state.selectedPants, colorName);
    const caseKey = findEduKeyFromCases(this.state.selectedPants, colorName);
    let eduKey;
    if (bw > 0) eduKey = "avoid";
    else if (caseKey) eduKey = caseKey;
    else eduKey = getEduKey(this.state.selectedPants, colorName, grade);
    const eduLine = EDU_TEXT[eduKey] || EDU_TEXT.contrast;
    const pantsLabel = this.formatWithOption(this.state.selectedPants, this.state.selectedBottomFit);
    const shirtLabel = this.formatWithOption(colorName, this.state.selectedTopType);
    const styleLine = getStyleLine();
    const styleHtml = styleLine
      ? `<div style="color: rgba(15,23,42,.70); font-size:12px; line-height:1.4;">스타일: ${styleLine}</div>`
      : "";

    this.el.statusCallout.innerHTML = `
      <div style="display:flex; gap:10px; align-items:flex-start; flex-wrap:wrap;">
        <span class="badgeIcon">
          <img class="iconImg" src="${iconSrc}" alt="${grade} 아이콘" />
          <b>${grade}</b>
        </span>
        <div style="display:grid; gap:4px;">
          <div style="color: rgba(15,23,42,.86); font-size:12px; line-height:1.4;">
            <b>${pantsLabel}</b> + <b>${shirtLabel}</b>
          </div>
          <div style="color: rgba(15,23,42,.70); font-size:12px; line-height:1.45;">
            ${phrase}
          </div>
          <div style="color: rgba(15,23,42,.62); font-size:11px; line-height:1.35;">
            이유: ${eduLine}
          </div>
          ${styleHtml}
        </div>
      </div>
    `;
  },

  updateStatusCallout(){
    if (this.state.selectedPants && this.state.selectedShirt && this.state.selectedGrade){
      this.renderStatusCallout(this.state.selectedGrade, this.state.selectedShirt);
      return;
    }
    if (this.state.selectedPants){
      const styleLine = getStyleLine();
      const styleHtml = styleLine
        ? `<div style="margin-top:6px; color: rgba(15,23,42,.70); font-size:12px; line-height:1.4;">스타일: ${styleLine}</div>`
        : "";
      this.el.statusCallout.innerHTML = STRINGS.callout.pantsPicked(this.state.selectedPants) + styleHtml;
    }
  },

  renderChips(el, items, limit){
    el.innerHTML = "";
    if (!this.state.selectedPants){
      el.innerHTML = `<div class="muted">하의 색을 먼저 선택하세요.</div>`;
      return;
    }
    if (!items || items.length === 0){
      el.innerHTML = `<div class="muted">없음</div>`;
      return;
    }

    const max = typeof limit === "number" ? limit : 2;
    items.slice(0, max).forEach(it=>{
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
    const btns = this.el.pantsButtons.querySelectorAll("button");
    btns.forEach(btn => {
      if (btn.getAttribute("data-color") === name) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });

    this.state.selectedShirt = null;
    this.el.shirtFill.setAttribute("fill", "transparent");
    this.el.shirtPill.textContent = "상의 선택: 아직";

    this.setNeedsPants(false);

    this.refreshRecommendations();

    this.updateStatusCallout();
    this.showToast(STRINGS.toast.pantsSelected(name));
  },

  selectBottomFit(name){
    this.state.selectedBottomFit = name;
    this.el.fitPill.textContent = "하의 핏: " + name;
    this.updateSelectedButtons(this.el.bottomFitButtons, name);
    this.showToast(`${name} 선택 ✅`);
    this.refreshRecommendations();
  },

  selectTopType(name){
    this.state.selectedTopType = name;
    this.el.topTypePill.textContent = "상의 종류: " + name;
    this.updateSelectedButtons(this.el.topTypeButtons, name);
    this.showToast(`${name} 선택 ✅`);
    this.refreshRecommendations();
    this.updateStatusCallout();
  },

  formatWithOption(base, opt){
    return opt ? `${base}(${opt})` : base;
  },

  applyShirt(colorName, grade){
    this.state.selectedShirt = colorName;
    this.state.selectedGrade = grade;
    this.el.shirtFill.setAttribute("fill", COLORS[colorName].hex);
    this.el.shirtPill.textContent = "상의 선택: " + colorName;
    this.renderStatusCallout(grade, colorName);
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
