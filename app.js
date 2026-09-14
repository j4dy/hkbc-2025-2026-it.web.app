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
    "tagline": "Realtime wave defense with automated financial minting & structural fortress fortification.",
    "description": "An addictive incremental defense game where players balance currency minting, projectile throw damage, and wall health repairs against escalating waves of monsters. Built with dynamic automation loops, tier upgrades, and persistent battle states.",
    "demoUrl": "/games/isaac-defense.html",
    "hubUrl": "https://duackyl.github.io/qwerty/",
    "githubUrl": "https://github.com/duackyl/qwerty",
    "badge": "Vibe Coded Game",
    "tech": ["HTML5 Canvas", "Automation Loops", "Incremental Economy", "CSS Glassmorphism"],
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
    "demoUrl": "https://jackiu17.github.io/jackieee/jackie_useful/game.html",
    "hubUrl": "https://jackiu17.github.io/jackieee/jackie_useful/jackie.html",
    "githubUrl": "https://github.com/jackiu17/jackieee",
    "badge": "Vibe Coded Game",
    "tech": ["Sports Physics", "Roblox UI Design", "Audio Engine", "Web Animations"],
    "vibePrompt": "Design a 3D Roblox-style baseball arcade game GUI with realistic batting mechanics, pitching modes, scoreboards, and stadium crowd sound effects."
  },
  {
    "id": "y12-angus-shooter",
    "year": "Year 12",
    "student": "Angus (Mkysugna)",
    "title": "Neon Twin-Stick Shooter",
    "category": "Games",
    "tagline": "Fast-paced cyberpunk twin-stick canvas action game with dynamic particle systems.",
    "description": "A high-octane 2D top-down shooter built on HTML5 Canvas featuring vibrant neon particle trails, fluid 360-degree aiming, enemy AI tracking, and adrenaline-pumping survival waves.",
    "demoUrl": "https://mkysugna.github.io/angus_personal_home_page/game.html",
    "hubUrl": "https://mkysugna.github.io/angus_personal_home_page/",
    "githubUrl": "https://github.com/Mkysugna/angus_personal_home_page",
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
    "demoUrl": "https://bobo2111.github.io/Bobo/hideandseekgame.html",
    "hubUrl": "https://bobo2111.github.io/Bobo/",
    "githubUrl": "https://github.com/bobo2111/Bobo",
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
    "description": "An ambitious 3D First-Person Shooter experience running entirely in the browser canvas without heavy game engines. Features pointer lock controls, target tracking, weapon animations, and responsive movement.",
    "demoUrl": "https://rene0510.github.io/rene_new_personal_page/webapp.html",
    "hubUrl": "https://rene0510.github.io/rene_new_personal_page/",
    "githubUrl": "https://github.com/rene0510/rene_new_personal_page",
    "badge": "Vibe Coded Game",
    "tech": ["3D Canvas Rendering", "Raycasting", "Pointer Lock API", "First-Person Physics"],
    "vibePrompt": "Generate a lightweight browser 3D first-person shooter canvas game with target shooting, pointer lock mouse look, and HUD health/ammo counters."
  },
  {
    "id": "y12-hinson-terminal",
    "year": "Year 12",
    "student": "Hinson",
    "title": "Game Terminal",
    "category": "Games",
    "tagline": "Cyberpunk command-line retro terminal launcher for interactive web games.",
    "description": "A high-velocity cyber terminal styled with neon blue glowing borders and interactive system diagnostic feeds. Acts as Hinson's command center launching game experiences.",
    "demoUrl": "https://hinson1017.github.io/MyHomePage/GameTerminal.html",
    "hubUrl": "https://hinson1017.github.io/MyHomePage/",
    "githubUrl": "https://github.com/Hinson1017/MyHomePage",
    "badge": "Vibe Coded Game",
    "tech": ["Terminal Emulation", "CSS Glow Effects", "Google Analytics Tagging", "Retro Aesthetics"],
    "vibePrompt": "Build a futuristic command terminal web interface with glowing neon borders, interactive console commands, and game launching portals."
  },
  {
    "id": "y11-vanessa",
    "year": "Year 11",
    "student": "Vanessa",
    "title": "Vanessa's Creative Vibe Project",
    "category": "Web Apps",
    "tagline": "Year 11 interactive web development and creative computing project.",
    "description": "Creative digital project developed as part of the HKBC Year 11 ICT Vibe Coding curriculum, showcasing rapid AI prototyping and web technologies.",
    "demoUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "hubUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "badge": "Year 11 Showcase",
    "tech": ["HTML5", "CSS3", "JavaScript", "AI Prompting"],
    "vibePrompt": "Year 11 ICT Vibe Coding showcase project created in Term 3 at Hong Kong Bluebell College."
  },
  {
    "id": "y11-charlie",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Charlie's Digital Studio",
    "category": "Web Apps",
    "tagline": "Year 11BI practical computing and interactive web application.",
    "description": "Interactive web application created by Charlie for the Year 11BI computing showcase (June 2026), leveraging vibe coding methodologies.",
    "demoUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "hubUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "badge": "Year 11 Showcase",
    "tech": ["HTML5", "CSS3", "JavaScript", "AI Prototyping"],
    "vibePrompt": "Year 11BI computing project demonstrating rapid UI iteration and AI design."
  },
  {
    "id": "y11-elita",
    "year": "Year 11",
    "student": "Elita",
    "title": "Elita's Interactive Portal",
    "category": "Web Apps",
    "tagline": "Year 11 creative interactive web experience.",
    "description": "Curated digital showcase exploring frontend web aesthetics, responsive layouts, and user interactivity built during Year 11 ICT.",
    "demoUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "hubUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "badge": "Year 11 Showcase",
    "tech": ["HTML5", "CSS Grid", "JavaScript", "AI Tools"],
    "vibePrompt": "Interactive web portal created in HKBC Year 11 computing class."
  },
  {
    "id": "y11-cara",
    "year": "Year 11",
    "student": "Cara",
    "title": "Cara's Design Showcase",
    "category": "Web Apps",
    "tagline": "Year 11A interactive UI and vibe-coded creative showcase.",
    "description": "Polished web project combining visual storytelling with modern responsive CSS components from Year 11A.",
    "demoUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "hubUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "badge": "Year 11 Showcase",
    "tech": ["HTML5", "CSS3", "Visual Design", "AI Coding"],
    "vibePrompt": "Year 11A ICT practical project exploring visual design and modern web layouts."
  },
  {
    "id": "y11-jacob",
    "year": "Year 11",
    "student": "Jacob",
    "title": "Jacob's Tech Lab",
    "category": "Web Apps",
    "tagline": "Year 11 practical web development and logic exploration.",
    "description": "Practical application project exploring interactive user logic and dynamic browser interfaces in Year 11 ICT.",
    "demoUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "hubUrl": "https://miro.com/app/board/uXjVGtEjllA=/",
    "badge": "Year 11 Showcase",
    "tech": ["HTML5", "JavaScript", "Algorithms", "Vibe Coding"],
    "vibePrompt": "Year 11 ICT student project built with generative AI programming workflows."
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
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query));

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
  const catClass = p.category === 'Games' ? 'badge-game' : 'badge-web';
  const initial = p.student.charAt(0).toUpperCase();

  // Primary action label & icon
  const isGame = p.category === 'Games';
  const primaryText = isGame ? 'Play Game 🚀' : 'Open Project ↗';

  const techPills = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');

  // Personal hub button
  const hubButton = p.hubUrl ? `
    <a href="${p.hubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="View ${p.student}'s Personal Hub">
      Personal Hub 🌐
    </a>
  ` : '';

  return `
    <article class="project-card" role="listitem">
      <div class="card-top">
        <div class="card-badges">
          <span class="badge ${yearClass}">${p.year}</span>
          <span class="badge ${catClass}">${p.category}</span>
        </div>

        <div class="card-author">
          <div class="author-avatar">${initial}</div>
          <div>
            <div class="author-name">${p.student}</div>
            <div style="font-size: 0.8rem; color: #64748b;">${p.badge || 'Student Work'}</div>
          </div>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-tagline">${p.tagline}</p>

        <div class="tech-pills">
          ${techPills}
        </div>
      </div>

      <div class="card-actions">
        <!-- Direct new-window launcher -->
        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="Launch ${p.title} in a new window">
          ${primaryText}
        </a>
        <div class="card-sub-actions">
          ${hubButton}
          <button class="btn btn-secondary btn-details" data-id="${p.id}" aria-label="View details for ${p.title}">
            Details ℹ️
          </button>
        </div>
      </div>
    </article>
  `;
}

function openModal(p) {
  modalYear.textContent = p.year;
  modalYear.className = `badge ${p.year === 'Year 12' ? 'badge-y12' : 'badge-y11'}`;
  
  modalCat.textContent = p.category;
  modalCat.className = `badge ${p.category === 'Games' ? 'badge-game' : 'badge-web'}`;
  
  modalAvatar.textContent = p.student.charAt(0).toUpperCase();
  modalTitle.textContent = p.title;
  modalStudent.textContent = `${p.student} (${p.year})`;
  modalDesc.textContent = p.description;

  modalTech.innerHTML = p.tech.map(t => `<span class="tech-pill" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('');
  modalPrompt.textContent = p.vibePrompt || 'Built using AI-assisted prompt engineering & web development.';

  const isGame = p.category === 'Games';
  modalPrimaryBtn.textContent = isGame ? 'Play Game in New Window 🚀' : 'Open in New Window ↗';
  modalPrimaryBtn.href = p.demoUrl;

  if (p.hubUrl) {
    modalHubBtn.href = p.hubUrl;
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
