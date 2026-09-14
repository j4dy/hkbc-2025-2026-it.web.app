let allProjects = [];
let activeCohort = 'all';
let activeCategory = 'all';
let searchQuery = '';

// DOM Elements
const grid = document.getElementById('projects-grid');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-filters-btn');

// Modal Elements
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalYear = document.getElementById('modal-year');
const modalCat = document.getElementById('modal-cat');
const modalAvatar = document.getElementById('modal-avatar');
const modalTitle = document.getElementById('modal-title');
const modalStudent = document.getElementById('modal-student-name');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalPrompt = document.getElementById('modal-prompt');
const modalPrimaryBtn = document.getElementById('modal-primary-btn');
const modalHubBtn = document.getElementById('modal-hub-btn');

// Load Data
const EMBEDDED_PROJECTS = [
  {
    "id": "y12-isaac-defense",
    "year": "Year 12",
    "student": "Isaac",
    "title": "Incremental Defense",
    "category": "Games",
    "tagline": "Realtime wave defense with automated currency minting & fortress fortification.",
    "description": "An incremental wave defense game where players balance currency minting, projectile throw damage, and wall health repairs against escalating waves of monsters. Built with dynamic automation loops, tier upgrades, and persistent battle states.",
    "gameUrl": "/games/isaac-defense.html",
    "homageUrl": "https://duackyl.github.io/qwerty/",
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas", "Automation Loops", "Incremental Economy", "CSS Architecture"],
    "vibePrompt": "Create an incremental tower defense simulation where I can mint credits, purchase automated throwers and auto-repairers, upgrade my wall health, and fend off scaling monster waves with real-time health bars."
  },
  {
    "id": "y12-jackie-baseball",
    "year": "Year 12",
    "student": "Jackie",
    "title": "Baseball Simulator",
    "category": "Games",
    "tagline": "Roblox-inspired baseball pitching, batting, and field stadium simulator.",
    "description": "A Roblox-styled baseball sports simulator featuring realistic ball trajectory physics, pitch variety, batting timing feedback, and custom stadium HUD designed for high-energy arcade gameplay.",
    "gameUrl": "https://jackiu17.github.io/jackieee/jackie_useful/game.html",
    "homageUrl": "https://jackiu17.github.io/jackieee/jackie_useful/jackie.html",
    "badge": "Vibe Coded Game",
    "tech": ["Sports Physics", "Roblox UI Design", "Audio Engine", "Web Animations"],
    "vibePrompt": "Design a 3D Roblox-style baseball arcade game GUI with realistic batting mechanics, pitching modes, scoreboards, and stadium crowd sound effects."
  },
  {
    "id": "y12-hinson-terminal",
    "year": "Year 12",
    "student": "Hinson",
    "title": "Game Terminal",
    "category": "Games",
    "tagline": "Cyberpunk command-line retro terminal launcher for interactive web games.",
    "description": "A high-velocity cyber terminal styled with neon glowing borders and interactive system diagnostic feeds. Acts as Hinson's command center launching game experiences.",
    "gameUrl": "https://hinson1017.github.io/MyHomePage/GameTerminal.html",
    "homageUrl": "https://hinson1017.github.io/MyHomePage/",
    "badge": "Vibe Coded Game",
    "tech": ["Terminal Emulation", "CSS Glow Effects", "Retro Aesthetics", "JavaScript"],
    "vibePrompt": "Build a futuristic command terminal web interface with glowing neon borders, interactive console commands, and game launching portals."
  },
  {
    "id": "y12-angus-shooter",
    "year": "Year 12",
    "student": "Angus (Mkysugna)",
    "title": "Neon Twin-Stick Shooter",
    "category": "Games",
    "tagline": "Fast-paced cyberpunk twin-stick canvas action game with dynamic particle systems.",
    "description": "A top-down shooter built on HTML5 Canvas featuring vibrant neon particle trails, fluid 360-degree aiming, enemy AI tracking, and adrenaline-pumping survival waves.",
    "gameUrl": "https://mkysugna.github.io/angus_personal_home_page/game.html",
    "homageUrl": "https://mkysugna.github.io/angus_personal_home_page/",
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas", "Vector Math", "Particle Physics", "Keyboard & Mouse Controls"],
    "vibePrompt": "Create a retro-neon top-down shooter with twin-stick aiming, neon particle explosions when enemies are hit, and wave survival scoring."
  },
  {
    "id": "y12-bobo-hideandseek",
    "year": "Year 12",
    "student": "Bobo",
    "title": "Hide and Seek",
    "category": "Games",
    "tagline": "Charming 8-bit retro arcade hide-and-seek interactive maze experience.",
    "description": "An interactive 8-bit retro web game crafted with Tailwind CSS and classic arcade fonts. Players explore rooms, search for hidden items, and avoid seekers within an immersive pixel-art interface.",
    "gameUrl": "https://bobo2111.github.io/Bobo/hideandseekgame.html",
    "homageUrl": "https://bobo2111.github.io/Bobo/",
    "badge": "Vibe Coded Game",
    "tech": ["Tailwind CSS", "Retro 8-Bit Typography", "Grid Logic", "Game Audio"],
    "vibePrompt": "Build an adorable 8-bit retro hide-and-seek web game with cute pixel animations, interactive discovery clues, and Tailwind UI."
  },
  {
    "id": "y12-rene-fps",
    "year": "Year 12",
    "student": "Rene",
    "title": "FPS-solo 3D Game",
    "category": "Games",
    "tagline": "First-Person Shooter 3D web experience with canvas raycasting & target tracking.",
    "description": "A 3D First-Person Shooter experience running entirely in browser canvas without heavy game engines. Features pointer lock controls, target tracking, weapon animations, and responsive movement.",
    "gameUrl": "https://rene0510.github.io/rene_new_personal_page/webapp.html",
    "homageUrl": "https://rene0510.github.io/rene_new_personal_page/",
    "badge": "Vibe Coded Game",
    "tech": ["3D Canvas Rendering", "Raycasting", "Pointer Lock API", "First-Person Physics"],
    "vibePrompt": "Generate a lightweight browser 3D first-person shooter canvas game with target shooting, pointer lock mouse look, and HUD health/ammo counters."
  },
  {
    "id": "y11-sedgwick-pacman",
    "year": "Year 11",
    "student": "Sedgwick Hung",
    "title": "Pac-Man 3D FPS",
    "category": "Games",
    "tagline": "3D first-person Pac-Man maze with canvas raycasting & dynamic ghost AI.",
    "description": "A 3D first-person perspective adaptation of the arcade classic Pac-Man. Navigate winding corridors, collect power pellets, and evade dynamic ghost AI in a raycasted 3D canvas environment.",
    "gameUrl": "https://sedgwickhung0728-dot.github.io/Pac-Man/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["3D Canvas", "Raycasting", "Ghost AI Pathfinding", "Audio FX"],
    "vibePrompt": "Reimagine the classic arcade Pac-Man as a first-person 3D canvas maze game with neon corridors, raycasting perspective, and intelligent chasing ghost AI."
  },
  {
    "id": "y11-daniel-endless-driver",
    "year": "Year 11",
    "student": "Daniel",
    "title": "3D Endless Driver",
    "category": "Games",
    "tagline": "High-speed 3D highway obstacle course and traffic evasion driving game.",
    "description": "A responsive 3D driving arcade game featuring oncoming vehicle hazards, road perspective scaling, score multipliers, and dynamic road curvature.",
    "gameUrl": "https://danielkiukiu322-art.github.io/test-game/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["3D Canvas", "Collision Physics", "Speed Curves", "Dynamic Hazards"],
    "vibePrompt": "Create a 3D endless highway driving runner where the player steers a speedster dodging traffic, collects fuel points, and tests reaction speed."
  },
  {
    "id": "y11-charlie-brickbreaker",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Cyber Dodge Game (Brickbreaker)",
    "category": "Games",
    "tagline": "Fast-paced arcade brick and hazard dodging survival challenge.",
    "description": "Action-packed arcade reflex game where players navigate neon defense bars, deflect projectiles, and rack up high combos under escalating speeds.",
    "gameUrl": "https://vvin830.github.io/Brickbreaker/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas", "Reflex Mechanics", "Neon Visuals", "Combo Scoring"],
    "vibePrompt": "Build a neon cyberpunk brickbreaker and hazard dodging survival game with escalating ball speeds and combo streak scoring."
  },
  {
    "id": "y11-vanessa-runner",
    "year": "Year 11",
    "student": "Vanessa",
    "title": "Emoji Endless Runner",
    "category": "Games",
    "tagline": "Vibrant side-scrolling obstacle jumping runner with animated emojis.",
    "description": "A cheerful, fast-action infinite runner where players leap over ground hazards and flying obstacles with responsive jump physics and multiplier rewards.",
    "gameUrl": "https://bignuts676767-commits.github.io/hi/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Side-Scrolling Engine", "Jump Physics", "Emoji Sprite Animations", "High Score State"],
    "vibePrompt": "Design an endless jumping runner featuring playful emoji animations, dynamic obstacle generation, and responsive double-jump physics."
  },
  {
    "id": "y11-jabbok-minecraft",
    "year": "Year 11",
    "student": "Jabbok",
    "title": "JS Craft: Horizon Level Engine",
    "category": "Games",
    "tagline": "Voxel sandbox 3D engine with block placement, mining, and horizon terrain.",
    "description": "An in-browser 3D voxel sandbox inspired by Minecraft, featuring real-time voxel generation, block building and destruction mechanics, and first-person camera movement.",
    "gameUrl": "https://tp211162-art.github.io/Minecraft/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["3D Voxel Engine", "Terrain Generation", "First-Person Controls", "Collision Physics"],
    "vibePrompt": "Construct an interactive 3D browser voxel world sandbox with block digging, placement, pointer lock camera controls, and terrain rendering."
  },
  {
    "id": "y11-elita-doggame",
    "year": "Year 11",
    "student": "Elita",
    "title": "Neon Dodge & Click",
    "category": "Games",
    "tagline": "High-intensity neon agility game testing rapid target clicking and hazard avoidance.",
    "description": "A sleek neon reaction test game challenging players to tap targets while dodging pulsing hazards under a tight countdown clock.",
    "gameUrl": "https://tp211142-hub.github.io/doggame/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["DOM Animations", "Timing Loops", "Precision Click Detection", "Neon Aesthetic"],
    "vibePrompt": "Create a neon reflex tapping challenge with dynamic target spawns, danger zones, and precision scoring under time pressure."
  },
  {
    "id": "y11-tp211168-cosmicdodge",
    "year": "Year 11",
    "student": "tp211168",
    "title": "Cosmic Dodge",
    "category": "Games",
    "tagline": "Retro arcade starfield spaceship survival dodging incoming asteroid storms.",
    "description": "An intense 2D arcade starship flight game with glowing vector graphics, asteroid collision detection, progressive speed scaling, and space flight controls.",
    "gameUrl": "https://tp211168-jpg.github.io/cat-game/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas 2D", "Starfield Particle Engine", "Hitbox Math", "Retro Vector Glow"],
    "vibePrompt": "Build a retro arcade space flight survival game in HTML5 canvas with glowing spaceship controls, scrolling starfields, and falling asteroid storms."
  },
  {
    "id": "y11-cara-pandagame",
    "year": "Year 11",
    "student": "Cara",
    "title": "Hungry Panda Game",
    "category": "Games",
    "tagline": "Fun interactive bamboo gathering adventure with cute panda animations.",
    "description": "Guide a hungry panda across lush forest clearings to gather fresh bamboo shoots while dodging falling obstacles and earning special power snacks.",
    "gameUrl": "https://tp211140-creator.github.io/panadagame/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas", "Sprite Animation", "Collectible Spawners", "Score Tracking"],
    "vibePrompt": "Design an adorable hungry panda arcade game with collectible bamboo snacks, smooth keyboard movement, and animated forest visuals."
  },
  {
    "id": "y11-huangjingtao-heroes",
    "year": "Year 11",
    "student": "Huang Jingtao (黄敬涛)",
    "title": "镜像协同 · 圣光英雄 · 终极精美版",
    "category": "Games",
    "tagline": "Dual-mirror hero tactical combat arena with particle spells and boss battles.",
    "description": "An elaborate dual-character combat RPG experience featuring light magic casting, cooldown skill rotations, particle visual effects, and intense boss battles.",
    "gameUrl": "https://huangjingtao109-design.github.io/Abc/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Combat State Machine", "Particle FX Engine", "Boss AI Logic", "Audio FX & HUD"],
    "vibePrompt": "Build an epic dual-character fantasy arena combat game with holy light magic abilities, cooldown triggers, boss phases, and rich particle effects."
  },
  {
    "id": "y11-kevinw-tetris",
    "year": "Year 11",
    "student": "Kevin W",
    "title": "最简俄罗斯方块 (Minimalist Tetris)",
    "category": "Games",
    "tagline": "Clean, precision-timed classic Tetris with responsive block rotations and line clears.",
    "description": "An elegant, distraction-free implementation of the classic Tetris tetromino falling puzzle with ghost pieces, hard drops, and smooth line-clear scoring.",
    "gameUrl": "https://wbk1145-lgtm.github.io/Y11A-KevinW/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Matrix Grid Logic", "Tetromino Rotation Math", "Keyboard Handlers", "CSS Clean UI"],
    "vibePrompt": "Implement a clean, distraction-free classic Tetris web game featuring smooth block drops, line clear detection, and accurate rotation math."
  },
  {
    "id": "y11-cara-catgame",
    "year": "Year 11",
    "student": "Cara",
    "title": "Cat Café Clicker & Care",
    "category": "Games",
    "tagline": "Cozy feline café clicker with cute kitty companions and bakery treats.",
    "description": "An adorable idle clicker and management simulator where players serve café treats, unlock cuddly cats, and level up shop amenities.",
    "gameUrl": "https://tp211140-creator.github.io/catgame/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Incremental Economy", "CSS Transitions", "Local Storage Save", "Cute UI Components"],
    "vibePrompt": "Create a heartwarming cat café idle clicker with kitty adoption upgrades, café pastry treats, and relaxing animated visual feedback."
  },
  {
    "id": "y11-charlie-crittercatch",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Chroma Critter Catch!",
    "category": "Games",
    "tagline": "Vibrant color-matching reflex game catching rapidly shifting critters.",
    "description": "Test speed and perception by matching color pulses and catching fleeting critters before the timer runs down.",
    "gameUrl": "https://vvin830.github.io/0616/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Color State Logic", "Timed Spawners", "Audio Triggers", "Responsive Web Canvas"],
    "vibePrompt": "Develop a lively color-matching reflex game where players quickly tap shifting colorful creatures to rack up combo points."
  },
  {
    "id": "y11-jacob-basketball",
    "year": "Year 11",
    "student": "Jacob",
    "title": "Typing Hoops: 6 & 7 Digit Duel",
    "category": "Games",
    "tagline": "Fast-action typing basketball shootout testing rapid number keypad accuracy.",
    "description": "A sports typing hybrid where landing three-pointers requires rapid and accurate keypad entry of 6 and 7-digit strings against a shot clock.",
    "gameUrl": "https://jac0b1111.github.io/basketball/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Typing Event Listeners", "Shot Clock Timer", "Basketball Physics Animation", "Keypad Duel"],
    "vibePrompt": "Design an intense arcade basketball shooting game where swishing shots depends on rapidly and accurately typing randomized 6 and 7-digit codes."
  },
  {
    "id": "y11-daniel-jeffery",
    "year": "Year 11",
    "student": "Daniel",
    "title": "Jeffery Virtual Dog Pet Game",
    "category": "Games",
    "tagline": "Tamagotchi-style interactive virtual pet simulator with feeding and playtime.",
    "description": "A heartwarming virtual dog companion game where players feed, play fetch, groom, and maintain health meters for Jeffery the virtual puppy.",
    "gameUrl": "https://danielkiukiu322-art.github.io/jeffery/",
    "homageUrl": null,
    "badge": "Vibe Coded Game",
    "tech": ["Pet State Simulator", "Need Meters (Hunger/Happiness)", "Interactive Actions", "Dynamic Sprites"],
    "vibePrompt": "Build a Tamagotchi-style virtual puppy companion web app with hunger and happiness status bars, feeding, fetching, and cute dog reactions."
  }
]
;

async function init() {
  try {
    const res = await fetch('./src/data/projects.json');
    if (res.ok) {
      allProjects = await res.json();
    } else {
      allProjects = EMBEDDED_PROJECTS;
    }
  } catch (err) {
    console.log('Using embedded projects dataset');
    allProjects = EMBEDDED_PROJECTS;
  }
  updateCounts();
  renderProjects();
  setupEventListeners();
}

function updateCounts() {
  const y12Count = allProjects.filter(p => p.year === 'Year 12').length;
  const y11Count = allProjects.filter(p => p.year === 'Year 11').length;
  
  const elAll = document.getElementById('count-all');
  const elY12 = document.getElementById('count-y12');
  const elY11 = document.getElementById('count-y11');
  const elTotal = document.getElementById('stat-total');
  
  if (elAll) elAll.textContent = allProjects.length;
  if (elY12) elY12.textContent = y12Count;
  if (elY11) elY11.textContent = y11Count;
  if (elTotal) elTotal.textContent = allProjects.length;
}

function renderProjects() {
  const filtered = allProjects.filter(p => {
    const matchesCohort = (activeCohort === 'all' || p.year === activeCohort);
    const matchesCategory = (activeCategory === 'all' || p.category === activeCategory);
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.student.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query);

    return matchesCohort && matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  grid.innerHTML = filtered.map(createCardHTML).join('');

  // Attach modal trigger listeners
  grid.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const proj = allProjects.find(p => p.id === id);
      if (proj) openModal(proj);
    });
  });
}

function createCardHTML(p) {
  const yearClass = p.year === 'Year 12' ? 'badge-y12' : 'badge-y11';
  const catClass = p.category === 'Games' ? 'badge-game' : 'badge-homage';
  const initial = p.student.charAt(0).toUpperCase();

  const techPills = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');

  // Action buttons
  let actionButtonsHtml = '';

  if (p.gameUrl && p.homageUrl) {
    actionButtonsHtml = `
      <a href="${p.gameUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="開啟遊戲試玩 ${p.title}">
        試玩遊戲 Play Game 🎮 ↗
      </a>
      <div class="card-sub-actions">
        <a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="瀏覽 ${p.student} 個人主頁">
          個人主頁 Homage 🌐 ↗
        </a>
        <button class="btn btn-secondary btn-details" data-id="${p.id}" aria-label="查看 ${p.title} 詳細資料">
          詳情 Details ℹ️
        </button>
      </div>
    `;
  } else if (p.gameUrl) {
    actionButtonsHtml = `
      <a href="${p.gameUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="開啟遊戲試玩 ${p.title}">
        試玩遊戲 Play Game 🎮 ↗
      </a>
      <div class="card-sub-actions">
        <button class="btn btn-secondary btn-details" data-id="${p.id}" style="width: 100%;" aria-label="查看 ${p.title} 詳細資料">
          作品詳情 Details ℹ️
        </button>
      </div>
    `;
  } else if (p.homageUrl) {
    actionButtonsHtml = `
      <a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="新分頁開啟 ${p.student} 的作品">
        開啟作品 Open Project 🌐 ↗
      </a>
      <div class="card-sub-actions">
        <button class="btn btn-secondary btn-details" data-id="${p.id}" style="width: 100%;" aria-label="查看 ${p.title} 詳細資料">
          作品詳情 Details ℹ️
        </button>
      </div>
    `;
  } else {
    actionButtonsHtml = `
      <a href="/projects/project.html?student=${encodeURIComponent(p.student)}&title=${encodeURIComponent(p.title)}&year=${encodeURIComponent(p.year)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;" title="新分頁開啟 ${p.title}">
        開啟作品 Open Project ↗
      </a>
    `;
  }

  const displayYear = p.year === 'Year 12' ? '中五級 Year 12' : '中四級 Year 11';
  const displayCat = p.category === 'Games' ? '🎮 互動遊戲 Games' : '🌐 個人主頁 Homage';

  return `
    <article class="project-card" role="listitem">
      <div class="card-top">
        <div class="card-badges">
          <span class="badge ${yearClass}">${displayYear}</span>
          <span class="badge ${catClass}">${displayCat}</span>
        </div>

        <div class="card-author">
          <div class="author-avatar">${initial}</div>
          <div>
            <div class="author-name">${p.student}</div>
            <div style="font-size: 0.8rem; color: #64748b;">${p.badge || '同學作品 Student Work'}</div>
          </div>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-tagline">${p.tagline}</p>

        <div class="tech-pills">
          ${techPills}
        </div>
      </div>

      <div class="card-actions">
        ${actionButtonsHtml}
      </div>
    </article>
  `;
}

function openModal(p) {
  modalYear.textContent = p.year === 'Year 12' ? '中五級 Year 12' : '中四級 Year 11';
  modalYear.className = `badge ${p.year === 'Year 12' ? 'badge-y12' : 'badge-y11'}`;
  
  modalCat.textContent = p.category === 'Games' ? '🎮 互動遊戲 Games' : '🌐 個人主頁 Homage';
  modalCat.className = `badge ${p.category === 'Games' ? 'badge-game' : 'badge-homage'}`;
  
  modalAvatar.textContent = p.student.charAt(0).toUpperCase();
  modalTitle.textContent = p.title;
  modalStudent.textContent = `${p.student} (${p.year === 'Year 12' ? '中五級 Year 12' : '中四級 Year 11'})`;
  modalDesc.textContent = p.description;

  modalTech.innerHTML = p.tech.map(t => `<span class="tech-pill" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('');
  modalPrompt.textContent = p.vibePrompt || '利用生成式 AI 提示工程及現代網頁技術構建。Built using AI-assisted prompt engineering & web development.';

  if (p.gameUrl) {
    modalPrimaryBtn.textContent = '開啟遊戲試玩 Play Game 🎮 ↗';
    modalPrimaryBtn.href = p.gameUrl;
    modalPrimaryBtn.style.display = 'inline-flex';
  } else if (p.homageUrl) {
    modalPrimaryBtn.textContent = '開啟作品 Open Project 🌐 ↗';
    modalPrimaryBtn.href = p.homageUrl;
    modalPrimaryBtn.style.display = 'inline-flex';
  } else {
    modalPrimaryBtn.style.display = 'none';
  }

  if (p.gameUrl && p.homageUrl) {
    modalHubBtn.textContent = '到訪個人主頁 Visit Homage 🌐 ↗';
    modalHubBtn.href = p.homageUrl;
    modalHubBtn.style.display = 'inline-flex';
  } else {
    modalHubBtn.style.display = 'none';
  }

  modal.showModal();
}

function setupEventListeners() {
  // Cohort filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCohort = btn.getAttribute('data-filter');
      renderProjects();
    });
  });

  // Category filters
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProjects();
    });
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProjects();
  });

  // Reset filters
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCohort = 'all';
      activeCategory = 'all';
      searchQuery = '';
      searchInput.value = '';
      document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
      document.querySelectorAll('.cat-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
      renderProjects();
    });
  }

  // Modal close button
  modalClose.addEventListener('click', () => modal.close());

  // Close modal when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);
