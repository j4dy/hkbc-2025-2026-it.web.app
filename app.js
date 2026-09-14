/**
 * Hong Kong Bluebell College (HKBC) - Student Vibe Coding Portfolio
 * Interactive Showcase Application Logic
 */

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

// Embedded fallback projects dataset
const EMBEDDED_PROJECTS = [
  {
    "id": "y12-isaac",
    "year": "Year 12",
    "student": "Isaac",
    "title": "Incremental Defense",
    "category": "Games",
    "description": "An incremental wave defense game where players balance currency minting, projectile throw damage, and wall health repairs against escalating waves of monsters. Built with dynamic automation loops, tier upgrades, and persistent battle states.",
    "gameUrl": "/games/isaac-defense.html",
    "homageUrl": "https://duackyl.github.io/qwerty/",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "HTML5 Canvas",
      "Automation Loops",
      "Incremental Economy",
      "CSS Architecture"
    ],
    "vibePrompt": "Create an incremental tower defense simulation where I can mint credits, purchase automated throwers and auto-repairers, upgrade my wall health, and fend off scaling monster waves with real-time health bars."
  },
  {
    "id": "y12-jackie",
    "year": "Year 12",
    "student": "Jackie",
    "title": "Baseball Simulator",
    "category": "Games",
    "description": "A Roblox-styled baseball sports simulator featuring realistic ball trajectory physics, pitch variety, batting timing feedback, and custom stadium HUD designed for high-energy arcade gameplay.",
    "gameUrl": "https://jackiu17.github.io/jackieee/jackie_useful/game.html",
    "homageUrl": "https://jackiu17.github.io/jackieee/jackie_useful/jackie.html",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "Sports Physics",
      "Roblox UI Design",
      "Audio Engine",
      "Web Animations"
    ],
    "vibePrompt": "Design a 3D Roblox-style baseball arcade game GUI with realistic batting mechanics, pitching modes, scoreboards, and stadium crowd sound effects."
  },
  {
    "id": "y12-hinson",
    "year": "Year 12",
    "student": "Hinson",
    "title": "Game Terminal",
    "category": "Games",
    "description": "A high-velocity cyber terminal styled with neon glowing borders and interactive system diagnostic feeds. Acts as Hinson's command center launching game experiences.",
    "gameUrl": "https://hinson1017.github.io/MyHomePage/GameTerminal.html",
    "homageUrl": "https://hinson1017.github.io/MyHomePage/",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "Terminal Emulation",
      "CSS Glow Effects",
      "Retro Aesthetics",
      "JavaScript"
    ],
    "vibePrompt": "Build a futuristic command terminal web interface with glowing neon borders, interactive console commands, and game launching portals."
  },
  {
    "id": "y12-angus",
    "year": "Year 12",
    "student": "Angus (Mkysugna)",
    "title": "Neon Twin-Stick Shooter",
    "category": "Games",
    "description": "A top-down shooter built on HTML5 Canvas featuring vibrant neon particle trails, fluid 360-degree aiming, enemy AI tracking, and adrenaline-pumping survival waves.",
    "gameUrl": "https://mkysugna.github.io/angus_personal_home_page/game.html",
    "homageUrl": "https://mkysugna.github.io/angus_personal_home_page/",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "HTML5 Canvas",
      "Vector Math",
      "Particle Physics",
      "Keyboard & Mouse Controls"
    ],
    "vibePrompt": "Create a retro-neon top-down shooter with twin-stick aiming, neon particle explosions when enemies are hit, and wave survival scoring."
  },
  {
    "id": "y12-bobo",
    "year": "Year 12",
    "student": "Bobo",
    "title": "Hide and Seek",
    "category": "Games",
    "description": "An interactive 8-bit retro web game crafted with Tailwind CSS and classic arcade fonts. Players explore rooms, search for hidden items, and avoid seekers within an immersive pixel-art interface.",
    "gameUrl": "https://bobo2111.github.io/Bobo/hideandseekgame.html",
    "homageUrl": "https://bobo2111.github.io/Bobo/",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "Tailwind CSS",
      "Retro 8-Bit Typography",
      "Grid Logic",
      "Game Audio"
    ],
    "vibePrompt": "Build an adorable 8-bit retro hide-and-seek web game with cute pixel animations, interactive discovery clues, and Tailwind UI."
  },
  {
    "id": "y12-rene",
    "year": "Year 12",
    "student": "Rene",
    "title": "FPS-solo 3D Game",
    "category": "Games",
    "description": "A 3D First-Person Shooter experience running entirely in browser canvas without heavy game engines. Features pointer lock controls, target tracking, weapon animations, and responsive movement.",
    "gameUrl": "https://rene0510.github.io/rene_new_personal_page/webapp.html",
    "homageUrl": "https://rene0510.github.io/rene_new_personal_page/",
    "badge": "12年級作品 Y12 Work",
    "tech": [
      "3D Canvas Rendering",
      "Raycasting",
      "Pointer Lock API",
      "First-Person Physics"
    ],
    "vibePrompt": "Generate a lightweight browser 3D first-person shooter canvas game with target shooting, pointer lock mouse look, and HUD health/ammo counters."
  },
  {
    "id": "y11-sedgwick",
    "year": "Year 11",
    "student": "Sedgwick Hung",
    "title": "Pac-Man 3D FPS",
    "category": "Games",
    "description": "A 3D first-person perspective adaptation of the arcade classic Pac-Man. Navigate winding corridors, collect power pellets, and evade dynamic ghost AI in a raycasted 3D canvas environment.",
    "gameUrl": "https://sedgwickhung0728-dot.github.io/Pac-Man/",
    "homageUrl": "https://bi.robi3.com/sedgwick-hung/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "3D Canvas",
      "Raycasting",
      "Ghost AI Pathfinding",
      "Audio FX"
    ],
    "vibePrompt": "Reimagine the classic arcade Pac-Man as a first-person 3D canvas maze game with neon corridors, raycasting perspective, and intelligent chasing ghost AI."
  },
  {
    "id": "y11-daniel-lam",
    "year": "Year 11",
    "student": "Daniel Lam",
    "title": "3D Endless Driver",
    "category": "Games",
    "description": "A responsive 3D driving arcade game featuring oncoming vehicle hazards, road perspective scaling, score multipliers, and dynamic road curvature.",
    "gameUrl": "https://danielkiukiu322-art.github.io/test-game/",
    "homageUrl": "https://bi.robi3.com/daniel-l/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "3D Canvas",
      "Collision Physics",
      "Speed Curves",
      "Dynamic Hazards"
    ],
    "vibePrompt": "Create a 3D endless highway driving runner where the player steers a speedster dodging traffic, collects fuel points, and tests reaction speed."
  },
  {
    "id": "y11-charlie-critter",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Chroma Critter Catch! 🌸",
    "category": "Games",
    "description": "★ 精選作品 ★ 趣味十足的色彩配對街機遊戲！移動捕蟲器並點擊切換顏色（粉紅 🌸、藍色 ⭐、黃色 🌟），精準捕捉相應色彩的毛毛怪以累積連擊倍數，體驗生動特效與刺激節奏！An addictive, high-energy arcade matching game featuring color cycling, dynamic speed scaling, combo streaks, and floating score popups.",
    "gameUrl": "https://vvin830.github.io/0616/",
    "homageUrl": "https://bi.robi3.com/charlie-chan/",
    "badge": "11年級精選作品 Y11 Star Game",
    "tech": [
      "Color Cycling",
      "Combo Multipliers",
      "Touch & Mouse Controls",
      "Particle Juice",
      "Dynamic Difficulty"
    ],
    "vibePrompt": "Build a colorful, polished arcade catching game called Chroma Critter Catch where players slide to catch falling critters and tap to cycle catcher colors to match and trigger combo streaks."
  },
  {
    "id": "y11-charlie-brickbreaker",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Cyber Dodge (Brickbreaker)",
    "category": "Games",
    "description": "Charlie 創作的霓虹賽博生存挑戰遊戲，考驗玩家快速避開障礙物與彈射反擊的敏捷反應。Cyberpunk hazard dodging and survival arcade challenge testing lightning-fast keyboard and mouse evasion.",
    "gameUrl": "https://vvin830.github.io/Brickbreaker/",
    "homageUrl": "https://bi.robi3.com/charlie-chan/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "HTML5 Canvas",
      "Collision Detection",
      "Keyboard Controls",
      "Reflex Timing"
    ],
    "vibePrompt": "Build a neon cyberpunk brickbreaker and hazard dodging survival game with escalating ball speeds and combo streak scoring."
  },
  {
    "id": "y11-vanessa",
    "year": "Year 11",
    "student": "Vanessa",
    "title": "Emoji Endless Runner",
    "category": "Games",
    "description": "A cheerful, fast-action infinite runner where players leap over ground hazards and flying obstacles with responsive jump physics and multiplier rewards.",
    "gameUrl": "https://bignuts676767-commits.github.io/hi/",
    "homageUrl": "https://bi.robi3.com/vanessa/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Side-Scrolling Engine",
      "Jump Physics",
      "Emoji Sprite Animations",
      "High Score State"
    ],
    "vibePrompt": "Design an endless jumping runner featuring playful emoji animations, dynamic obstacle generation, and responsive double-jump physics."
  },
  {
    "id": "y11-jabbok",
    "year": "Year 11",
    "student": "Jabbok",
    "title": "JS Craft: Horizon Level Engine",
    "category": "Games",
    "description": "An in-browser 3D voxel sandbox inspired by Minecraft, featuring real-time voxel generation, block building and destruction mechanics, and first-person camera movement.",
    "gameUrl": "https://tp211162-art.github.io/Minecraft/",
    "homageUrl": "https://bi.robi3.com/jabbok/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "3D Voxel Engine",
      "Terrain Generation",
      "First-Person Controls",
      "Collision Physics"
    ],
    "vibePrompt": "Construct an interactive 3D browser voxel world sandbox with block digging, placement, pointer lock camera controls, and terrain rendering."
  },
  {
    "id": "y11-elita",
    "year": "Year 11",
    "student": "Elita",
    "title": "Neon Dodge & Click",
    "category": "Games",
    "description": "A sleek neon reaction test game challenging players to tap targets while dodging pulsing hazards under a tight countdown clock.",
    "gameUrl": "https://tp211142-hub.github.io/doggame/",
    "homageUrl": "https://bi.robi3.com/elita/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "DOM Animations",
      "Timing Loops",
      "Precision Click Detection",
      "Neon Aesthetic"
    ],
    "vibePrompt": "Create a neon reflex tapping challenge with dynamic target spawns, danger zones, and precision scoring under time pressure."
  },
  {
    "id": "y11-cherry",
    "year": "Year 11",
    "student": "Cherry",
    "title": "Cosmic Dodge",
    "category": "Games",
    "description": "An intense 2D arcade starship flight game with glowing vector graphics, asteroid collision detection, progressive speed scaling, and space flight controls.",
    "gameUrl": "https://tp211168-jpg.github.io/cat-game/",
    "homageUrl": "https://bi.robi3.com/cherry/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "HTML5 Canvas 2D",
      "Starfield Particle Engine",
      "Hitbox Math",
      "Retro Vector Glow"
    ],
    "vibePrompt": "Build a retro arcade space flight survival game in HTML5 canvas with glowing spaceship controls, scrolling starfields, and falling asteroid storms."
  },
  {
    "id": "y11-cara",
    "year": "Year 11",
    "student": "Cara",
    "title": "Hungry Panda Game",
    "category": "Games",
    "description": "Guide a hungry panda across lush forest clearings to gather fresh bamboo shoots while dodging falling obstacles and earning special power snacks.",
    "gameUrl": "https://tp211140-creator.github.io/panadagame/",
    "homageUrl": "https://bi.robi3.com/cara-term3-mid-term/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "HTML5 Canvas",
      "Sprite Animation",
      "Collectible Spawners",
      "Score Tracking"
    ],
    "vibePrompt": "Design an adorable hungry panda arcade game with collectible bamboo snacks, smooth keyboard movement, and animated forest visuals."
  },
  {
    "id": "y11-kevin-huang",
    "year": "Year 11",
    "student": "Kevin Huang",
    "title": "镜像协同 · 圣光英雄 · 终极精美版",
    "category": "Games",
    "description": "An elaborate dual-character combat RPG experience featuring light magic casting, cooldown skill rotations, particle visual effects, and intense boss battles.",
    "gameUrl": "https://huangjingtao109-design.github.io/Abc/",
    "homageUrl": "https://bi.robi3.com/pictre/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Combat State Machine",
      "Particle FX Engine",
      "Boss AI Logic",
      "Audio FX & HUD"
    ],
    "vibePrompt": "Build an epic dual-character fantasy arena combat game with holy light magic abilities, cooldown triggers, boss phases, and rich particle effects."
  },
  {
    "id": "y11-kevin-wang",
    "year": "Year 11",
    "student": "Kevin Wang",
    "title": "最简俄罗斯方块 (Minimalist Tetris)",
    "category": "Games",
    "description": "An elegant, distraction-free implementation of the classic Tetris tetromino falling puzzle with ghost pieces, hard drops, and smooth line-clear scoring.",
    "gameUrl": "https://wbk1145-lgtm.github.io/Y11A-KevinW/",
    "homageUrl": "https://bi.robi3.com/y11a-kevin-wang/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Matrix Grid Logic",
      "Tetromino Rotation Math",
      "Keyboard Handlers",
      "CSS Clean UI"
    ],
    "vibePrompt": "Implement a clean, distraction-free classic Tetris web game featuring smooth block drops, line clear detection, and accurate rotation math."
  },
  {
    "id": "y11-jacob",
    "year": "Year 11",
    "student": "Jacob",
    "title": "Typing Hoops: 6 & 7 Digit Duel",
    "category": "Games",
    "description": "A sports typing hybrid where landing three-pointers requires rapid and accurate keypad entry of 6 and 7-digit strings against a shot clock.",
    "gameUrl": "https://jac0b1111.github.io/basketball/",
    "homageUrl": "https://bi.robi3.com/jacob-2/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Typing Event Listeners",
      "Shot Clock Timer",
      "Basketball Physics Animation",
      "Keypad Duel"
    ],
    "vibePrompt": "Design an intense arcade basketball shooting game where swishing shots depends on rapidly and accurately typing randomized 6 and 7-digit codes."
  },
  {
    "id": "y11-jeffrey",
    "year": "Year 11",
    "student": "Jeffrey",
    "title": "Jeffery Virtual Dog Pet Game",
    "category": "Games",
    "description": "A heartwarming virtual dog companion game where players feed, play fetch, groom, and maintain health meters for Jeffery the virtual puppy.",
    "gameUrl": "https://danielkiukiu322-art.github.io/jeffery/",
    "homageUrl": "https://bi.robi3.com/jeffery/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Pet State Simulator",
      "Need Meters (Hunger/Happiness)",
      "Interactive Actions",
      "Dynamic Sprites"
    ],
    "vibePrompt": "Build a Tamagotchi-style virtual puppy companion web app with hunger and happiness status bars, feeding, fetching, and cute dog reactions."
  },
  {
    "id": "y11-lateisha",
    "year": "Year 11",
    "student": "Lateisha",
    "title": "Lateisha 個人主頁 (Lateisha's Website)",
    "category": "Personal Homepage",
    "description": "Curated portfolio website by Lateisha Leung exploring digital layout compositions, visual styling, and interactive web elements created in HKBC Year 11.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kkk/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Visual Web Design",
      "Divi Builder",
      "Responsive Layout",
      "Art Stream"
    ],
    "vibePrompt": "Design an expressive personal art and design showcase with multimedia portfolios, school projects, and creative writing."
  },
  {
    "id": "y11-phoebe",
    "year": "Year 11",
    "student": "Phoebe",
    "title": "Phoebe 個人主頁 (Phoebe's Website)",
    "category": "Personal Homepage",
    "description": "A personal homepage crafted by Phoebe featuring creative storytelling, reflections on literature, artwork showcases, and modern web styling.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/phoebe/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Creative Writing",
      "Responsive CSS",
      "Digital Media",
      "Typography"
    ],
    "vibePrompt": "Build a personal web space reflecting artistic identity, literary hobbies, and digital showcase elements."
  },
  {
    "id": "y11-regan",
    "year": "Year 11",
    "student": "Regan",
    "title": "Regan 個人主頁 (Regan's Website)",
    "category": "Personal Homepage",
    "description": "Interactive digital hub designed by Regan highlighting creative frontend design, modular layout architecture, and personal identity.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/regan-2/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Web Layouts",
      "CSS Styling",
      "Interactive Media",
      "Personal Brand"
    ],
    "vibePrompt": "Craft a modern personal website with responsive sections, profile introduction, and project showcases."
  },
  {
    "id": "y11-eunes",
    "year": "Year 11",
    "student": "Eunes",
    "title": "Eunes 個人主頁 (Eunes's Website)",
    "category": "Personal Homepage",
    "description": "Vibrant student homepage by Eunes showcasing music passions, favorite musical groups, and expressive web storytelling crafted during Year 11 ICT.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/eunes/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Music Media",
      "HTML & CSS",
      "Visual Composition",
      "Interactive UI"
    ],
    "vibePrompt": "Create an energetic personal portal dedicated to music, favorite bands, and creative digital identity."
  },
  {
    "id": "y11-hyman",
    "year": "Year 11",
    "student": "Hyman",
    "title": "Hyman 個人主頁 (Hyman's Website)",
    "category": "Personal Homepage",
    "description": "Personal portfolio by Hyman Poon presenting his dedication to competitive fencing, athletic aspirations, and modern web design techniques.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/hyman-2/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Athletic Portfolio",
      "Web Publishing",
      "CSS Modules",
      "Multimedia"
    ],
    "vibePrompt": "Build an inspiring athlete portfolio showcasing fencing training, competition milestones, and personal goals."
  },
  {
    "id": "y11-shelly",
    "year": "Year 11",
    "student": "Shelly",
    "title": "Shelly 個人主頁 (Shelly's Website)",
    "category": "Personal Homepage",
    "description": "Modern web studio page created by Shelly Lin showcasing digital storytelling, clean typographic layout, and personalized visual flair.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/shelly/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Web Typography",
      "Visual Showcase",
      "CSS Grid",
      "Interactive Design"
    ],
    "vibePrompt": "Design a clean and welcoming personal homepage with modern typographic styling and creative digital content."
  },
  {
    "id": "y11-shereen",
    "year": "Year 11",
    "student": "Shereen",
    "title": "Shereen 個人主頁 (Shereen's Website)",
    "category": "Personal Homepage",
    "description": "Personal homepage created by Shereen for Year 11 ICT, demonstrating intuitive web navigation, responsive containers, and creative expression.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/shereen/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Frontend UI",
      "Responsive Layout",
      "Digital Storytelling",
      "Web Components"
    ],
    "vibePrompt": "Develop an engaging personal web space highlighting student projects and creative exploration."
  },
  {
    "id": "y11-william",
    "year": "Year 11",
    "student": "William",
    "title": "William 個人主頁 (William's Website)",
    "category": "Personal Homepage",
    "description": "Web computing showcase created by William, presenting technological interests, computing concepts, and personalized digital identity.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/william/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Web Architecture",
      "Computing Topics",
      "Modern CSS",
      "Content Design"
    ],
    "vibePrompt": "Build a tech-oriented personal profile demonstrating foundational computing principles and responsive web layouts."
  },
  {
    "id": "y11-vio",
    "year": "Year 11",
    "student": "Vio",
    "title": "Vio 個人主頁 (Vio's Website)",
    "category": "Personal Homepage",
    "description": "Creative web project created by Vio exploring personal expression, color palettes, and structured web layouts in Year 11 ICT.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/vio-4/",
    "badge": "11年級作品 Y11 Work",
    "tech": [
      "Visual Layouts",
      "Color Systems",
      "Web Storytelling",
      "CSS Styling"
    ],
    "vibePrompt": "Craft an aesthetic and expressive digital homepage with custom color schemes and multimedia elements."
  },
  {
    "id": "y10-billy",
    "year": "Year 10",
    "student": "Billy",
    "title": "Billy 個人主頁 (Billy's Website)",
    "category": "Personal Homepage",
    "description": "Interactive personal web page designed by Billy in Year 10 ICT, showcasing student interests, web design fundamentals, and creative multimedia layouts.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/s1mon/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Web Architecture",
      "HTML & CSS",
      "Responsive Design",
      "Creative Computing"
    ],
    "vibePrompt": "Design an interactive personal web studio showcasing computing projects, learning milestones, and student interests."
  },
  {
    "id": "y10-bird",
    "year": "Year 10",
    "student": "Bird",
    "title": "Bird 個人主頁 (Bird's Website)",
    "category": "Personal Homepage",
    "description": "Playful and imaginative digital space crafted by Bird for the Year 10 ICT curriculum, showcasing custom layout styling and multimedia integration.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/weqweqwewqweqewqeqweqweqweqweqw-edfsdfq%e5%8d%83%e4%b8%87%e5%af%8c%e7%bf%81%e5%be%88%e5%a4%9a%e5%8f%91%e9%a1%ba%e4%b8%b0%e5%a6%82%e6%9e%9c%e4%bb%96%e5%8f%916b-d-jjkasdujhfuguytfgsuohtguihtgawenuotaui/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Web Publishing",
      "Visual Layouts",
      "Multimedia Design",
      "Modern CSS"
    ],
    "vibePrompt": "Build an expressive and visually rich digital hub reflecting student creativity and web exploration."
  },
  {
    "id": "y10-coco",
    "year": "Year 10",
    "student": "Coco",
    "title": "Coco 個人主頁 (Coco's Website)",
    "category": "Personal Homepage",
    "description": "Vibrant student homepage by Coco presenting personal hobbies, creative storytelling, and responsive web aesthetics created during Year 10 computing.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/my-hobby/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Blog Architecture",
      "CSS Styling",
      "Image Optimization",
      "Storytelling"
    ],
    "vibePrompt": "Create a heartwarming hobby showcase blog with image galleries, personal stories, and clean typography."
  },
  {
    "id": "y10-frank",
    "year": "Year 10",
    "student": "Frank",
    "title": "Frank 個人主頁 (Frank's Website)",
    "category": "Personal Homepage",
    "description": "Clean personal homepage created by Frank showcasing introductory web development topics, layout composition, and interactive elements.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/frank-website/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Frontend Design",
      "Responsive Layout",
      "HTML5",
      "Modern CSS"
    ],
    "vibePrompt": "Develop a sleek and structured personal website highlighting computing class experiences and student profile."
  },
  {
    "id": "y10-janice",
    "year": "Year 10",
    "student": "Janice",
    "title": "Janice 個人主頁 (Janice's Website)",
    "category": "Personal Homepage",
    "description": "Expressive digital homepage created by Janice featuring personalized aesthetic touches, modular design blocks, and student project highlights.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/janice/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Visual Storytelling",
      "CSS Grid",
      "Typography",
      "Interactive Design"
    ],
    "vibePrompt": "Craft a creative student homepage with personalized aesthetic typography, project sections, and visual stories."
  },
  {
    "id": "y10-jennifer",
    "year": "Year 10",
    "student": "Jennifer",
    "title": "Jennifer 個人主頁 (Jennifer's Website)",
    "category": "Personal Homepage",
    "description": "Structured student homepage designed by Jennifer, featuring multimedia galleries, clean component styling, and personalized self-introduction.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/jennifer/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Web Composition",
      "Responsive Containers",
      "Design Systems",
      "HTML5"
    ],
    "vibePrompt": "Build a modern and responsive personal homepage with organized card components, multimedia, and student profile."
  },
  {
    "id": "y10-judy",
    "year": "Year 10",
    "student": "Judy",
    "title": "Judy 個人主頁 (Judy's Website)",
    "category": "Personal Homepage",
    "description": "Personal web space designed by Year 10 student Judy, exploring creative web layout fundamentals, typography, and personalized digital content.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/judy/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Creative Computing",
      "CSS Formatting",
      "Personal Portfolio",
      "Responsive Web"
    ],
    "vibePrompt": "Design a personalized student website showcasing web development exploration and digital creativity."
  },
  {
    "id": "y10-kathy",
    "year": "Year 10",
    "student": "Kathy",
    "title": "Kathy 個人主頁 (Kathy's Website)",
    "category": "Personal Homepage",
    "description": "Enthusiastic and colorful web showcase created by Kathy for Year 10 ICT, incorporating interactive sections and creative digital design.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kathy/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Visual Web Design",
      "Typography",
      "CSS Components",
      "Creative Arts"
    ],
    "vibePrompt": "Construct a cheerful and vibrant web showcase highlighting creative writing, school projects, and interactive layouts."
  },
  {
    "id": "y10-kaylin",
    "year": "Year 10",
    "student": "Kaylin",
    "title": "Kaylin 個人主頁 (Kaylin's Website)",
    "category": "Personal Homepage",
    "description": "Delightful student homepage created by Kaylin featuring video clips, favorite anime/cartoons (Gravity Falls), figurines, CodeMonkey coding reflections, and multilingual greetings.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kaylin/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Video Embeds",
      "Multilingual UI",
      "Media Galleries",
      "CSS Animations"
    ],
    "vibePrompt": "Build an engaging multimedia website with video streaming, cute figurine showcases, CodeMonkey reflections, and multilingual greetings."
  },
  {
    "id": "y10-nikki",
    "year": "Year 10",
    "student": "Nikki",
    "title": "Nikki 個人主頁 (Nikki's Website)",
    "category": "Personal Homepage",
    "description": "Modern personal profile designed by Nikki for the HKBC Year 10 computing curriculum, showcasing structured web sections and personal interests.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/nikki/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Structured Layout",
      "Responsive CSS",
      "Typography",
      "Web Fundamentals"
    ],
    "vibePrompt": "Create a clean and elegant personal website with responsive layouts, typography hierarchy, and student interests."
  },
  {
    "id": "y10-yang",
    "year": "Year 10",
    "student": "Yang",
    "title": "Yang 個人主頁 (Yang's Website)",
    "category": "Personal Homepage",
    "description": "Dynamic personal web portal created by Yang, highlighting computing curiosities, clean frontend layout techniques, and digital storytelling.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/657/",
    "badge": "10年級作品 Y10 Work",
    "tech": [
      "Web Engineering",
      "Modern CSS",
      "HTML5 Layouts",
      "Interactive Design"
    ],
    "vibePrompt": "Design an informative student computing portal exploring modern web technologies and interactive digital storytelling."
  }
];

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
  const y10Count = allProjects.filter(p => p.year === 'Year 10').length;
  
  const elAll = document.getElementById('count-all');
  const elY12 = document.getElementById('count-y12');
  const elY11 = document.getElementById('count-y11');
  const elY10 = document.getElementById('count-y10');
  const elTotal = document.getElementById('stat-total');
  
  if (elAll) elAll.textContent = allProjects.length;
  if (elY12) elY12.textContent = y12Count;
  if (elY11) elY11.textContent = y11Count;
  if (elY10) elY10.textContent = y10Count;
  if (elTotal) elTotal.textContent = allProjects.length;

  updateCategoryCounts();
}

function updateCategoryCounts() {
  const cohortPool = activeCohort === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.year === activeCohort);

  const elCatAll = document.getElementById('count-cat-all');
  const elCatGames = document.getElementById('count-cat-games');
  const elCatHomage = document.getElementById('count-cat-homage');

  const totalInCohort = cohortPool.length;
  const gamesInCohort = cohortPool.filter(p => Boolean(p.gameUrl)).length;
  const homageInCohort = cohortPool.filter(p => Boolean(p.homageUrl)).length;

  if (elCatAll) elCatAll.textContent = totalInCohort;
  if (elCatGames) elCatGames.textContent = gamesInCohort;
  if (elCatHomage) elCatHomage.textContent = homageInCohort;
}

function renderProjects() {
  const isHomageFilter = (activeCategory === 'Personal Homepage' || activeCategory === 'Personal Homage' || activeCategory === 'homepage' || activeCategory === 'website');
  const isGameFilter = (activeCategory === 'Games' || activeCategory === 'games');

  const filtered = allProjects.filter(p => {
    const matchesCohort = (activeCohort === 'all' || p.year === activeCohort);
    
    let matchesCategory = true;
    if (isGameFilter) {
      matchesCategory = Boolean(p.gameUrl);
    } else if (isHomageFilter) {
      matchesCategory = Boolean(p.homageUrl);
    }

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
  grid.innerHTML = filtered.map(p => createCardHTML(p, isHomageFilter, isGameFilter)).join('');

  // Attach modal trigger listeners
  grid.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const proj = allProjects.find(p => p.id === id);
      if (proj) openModal(proj);
    });
  });
}

function createCardHTML(p, isHomageFilter = false, isGameFilter = false) {
  const yearClass = p.year === 'Year 12' ? 'badge-y12' : (p.year === 'Year 11' ? 'badge-y11' : 'badge-y10');
  const displayYear = p.year === 'Year 12' ? '12年級 Year 12' : (p.year === 'Year 11' ? '11年級 Year 11' : '10年級 Year 10');
  const initial = p.student.charAt(0).toUpperCase();

  // Badges
  let catBadgesHtml = '';
  if (isHomageFilter) {
    catBadgesHtml = `<span class="badge badge-homage">🌐 個人主頁 Website</span>`;
  } else if (isGameFilter) {
    catBadgesHtml = `<span class="badge badge-game">🎮 互動遊戲 Game</span>`;
  } else {
    if (p.gameUrl && p.homageUrl) {
      catBadgesHtml = `<span class="badge badge-game">🎮 遊戲</span> <span class="badge badge-homage">🌐 主頁</span>`;
    } else if (p.gameUrl) {
      catBadgesHtml = `<span class="badge badge-game">🎮 互動遊戲</span>`;
    } else {
      catBadgesHtml = `<span class="badge badge-homage">🌐 個人主頁</span>`;
    }
  }

  let starBadgeHtml = '';
  if (p.badge && (p.badge.includes('精選') || p.badge.includes('Star'))) {
    starBadgeHtml = `<span class="badge badge-star">🌟 精選作品 Star Game</span>`;
  }

  // Action buttons
  let actionButtonsHtml = '';

  if (isHomageFilter && p.homageUrl) {
    // Under Personal Homepage filter, primary button directly opens their website!
    actionButtonsHtml = `
      <a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="新分頁瀏覽 ${p.student} 個人主頁">
        瀏覽主頁 Visit Website 🌐 ↗
      </a>
      <div class="card-sub-actions">
        ${p.gameUrl ? `
          <a href="${p.gameUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="試玩遊戲 ${p.title}">
            試玩遊戲 Play Game 🎮 ↗
          </a>
        ` : ''}
        <button class="btn btn-secondary btn-details" data-id="${p.id}" aria-label="查看 ${p.student} 詳細資料">
          詳情 Details ℹ️
        </button>
      </div>
    `;
  } else if (p.gameUrl && p.homageUrl) {
    actionButtonsHtml = `
      <a href="${p.gameUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="開啟遊戲試玩 ${p.title}">
        試玩遊戲 Play Game 🎮 ↗
      </a>
      <div class="card-sub-actions">
        <a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="瀏覽 ${p.student} 個人主頁">
          瀏覽網站 Website 🌐 ↗
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
      <a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="新分頁瀏覽 ${p.student} 的個人主頁">
        瀏覽主頁 Visit Website 🌐 ↗
      </a>
      <div class="card-sub-actions">
        <button class="btn btn-secondary btn-details" data-id="${p.id}" style="width: 100%;" aria-label="查看 ${p.title} 詳細資料">
          作品詳情 Details ℹ️
        </button>
      </div>
    `;
  } else {
    actionButtonsHtml = `
      <button class="btn btn-primary btn-details" data-id="${p.id}" style="width: 100%;" aria-label="查看 ${p.title} 詳細資料">
        作品詳情 Details ℹ️
      </button>
    `;
  }

  const cardTitle = (!p.gameUrl || isHomageFilter) ? `${p.student} 個人主頁 (${p.student}'s Website)` : p.title;

  return `
    <article class="project-card" role="listitem">
      <div class="card-top">
        <div class="card-badges">
          <span class="badge ${yearClass}">${displayYear}</span>
          ${catBadgesHtml}
          ${starBadgeHtml}
        </div>

        <div class="card-author">
          <div class="author-avatar">${initial}</div>
          <div>
            <div class="author-name">${p.student}</div>
            <div style="font-size: 0.8rem; color: #64748b;">${p.badge || '同學作品 Student Work'}</div>
          </div>
        </div>

        <h3 class="card-title">${cardTitle}</h3>

        <!-- Loaded Game / Website Screenshot Preview -->
        <div class="card-screenshot-wrapper">
          <img 
            src="./screenshots/${p.id}.png" 
            alt="${p.student} - ${cardTitle}" 
            class="card-screenshot"
            loading="lazy"
            onerror="this.onerror=null; this.parentElement.classList.add('no-screenshot');"
          />
        </div>
      </div>

      <div class="card-actions">
        ${actionButtonsHtml}
      </div>
    </article>
  `;
}

function openModal(p) {
  const isHomageFilter = (activeCategory === 'Personal Homepage' || activeCategory === 'Personal Homage' || activeCategory === 'homepage' || activeCategory === 'website');
  const displayYear = p.year === 'Year 12' ? '12年級 Year 12' : (p.year === 'Year 11' ? '11年級 Year 11' : '10年級 Year 10');
  const yearClass = p.year === 'Year 12' ? 'badge-y12' : (p.year === 'Year 11' ? 'badge-y11' : 'badge-y10');

  modalYear.textContent = displayYear;
  modalYear.className = `badge ${yearClass}`;
  
  if (isHomageFilter || !p.gameUrl) {
    modalCat.textContent = '🌐 個人主頁 Website';
    modalCat.className = 'badge badge-homage';
  } else {
    modalCat.textContent = '🎮 互動遊戲 Games';
    modalCat.className = 'badge badge-game';
  }
  
  const modalTitleText = (!p.gameUrl || isHomageFilter) ? `${p.student} 個人主頁 (${p.student}'s Website)` : p.title;
  modalAvatar.textContent = p.student.charAt(0).toUpperCase();
  modalTitle.textContent = modalTitleText;
  if (modalStudent) modalStudent.textContent = `${p.student} (${displayYear})`;
  modalDesc.textContent = p.description;

  modalTech.innerHTML = p.tech.map(t => `<span class="tech-pill" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('');
  
  if (!p.gameUrl || isHomageFilter) {
    modalPrompt.textContent = p.vibePrompt || '運用傳統 HTML（Traditional HTML）及現代網頁結構親手編寫。Built using traditional HTML and web development.';
  } else {
    modalPrompt.textContent = p.vibePrompt || '利用生成式 AI 提示工程及現代網頁技術構建。Built using AI-assisted prompt engineering & web development.';
  }

  if (isHomageFilter && p.homageUrl) {
    modalPrimaryBtn.textContent = '瀏覽個人主頁 Visit Website 🌐 ↗';
    modalPrimaryBtn.href = p.homageUrl;
    modalPrimaryBtn.style.display = 'inline-flex';
    if (p.gameUrl) {
      modalHubBtn.textContent = '開啟遊戲試玩 Play Game 🎮 ↗';
      modalHubBtn.href = p.gameUrl;
      modalHubBtn.style.display = 'inline-flex';
    } else {
      modalHubBtn.style.display = 'none';
    }
  } else {
    if (p.gameUrl) {
      modalPrimaryBtn.textContent = '開啟遊戲試玩 Play Game 🎮 ↗';
      modalPrimaryBtn.href = p.gameUrl;
      modalPrimaryBtn.style.display = 'inline-flex';
    } else if (p.homageUrl) {
      modalPrimaryBtn.textContent = '瀏覽個人主頁 Visit Website 🌐 ↗';
      modalPrimaryBtn.href = p.homageUrl;
      modalPrimaryBtn.style.display = 'inline-flex';
    } else {
      modalPrimaryBtn.style.display = 'none';
    }

    if (p.gameUrl && p.homageUrl) {
      modalHubBtn.textContent = '瀏覽個人主頁 Visit Website 🌐 ↗';
      modalHubBtn.href = p.homageUrl;
      modalHubBtn.style.display = 'inline-flex';
    } else {
      modalHubBtn.style.display = 'none';
    }
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
      updateCategoryCounts();
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
      updateCategoryCounts();
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
