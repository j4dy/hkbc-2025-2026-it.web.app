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
    "id": "y12-isaac",
    "year": "Year 12",
    "student": "Isaac",
    "title": "Incremental Defense",
    "category": "Games",
    "tagline": "Realtime wave defense with automated currency minting & fortress fortification.",
    "description": "An incremental wave defense game where players balance currency minting, projectile throw damage, and wall health repairs against escalating waves of monsters. Built with dynamic automation loops, tier upgrades, and persistent battle states.",
    "gameUrl": "/games/isaac-defense.html",
    "homageUrl": "https://duackyl.github.io/qwerty/",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "Roblox-inspired baseball pitching, batting, and field stadium simulator.",
    "description": "A Roblox-styled baseball sports simulator featuring realistic ball trajectory physics, pitch variety, batting timing feedback, and custom stadium HUD designed for high-energy arcade gameplay.",
    "gameUrl": "https://jackiu17.github.io/jackieee/jackie_useful/game.html",
    "homageUrl": "https://jackiu17.github.io/jackieee/jackie_useful/jackie.html",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "Cyberpunk command-line retro terminal launcher for interactive web games.",
    "description": "A high-velocity cyber terminal styled with neon glowing borders and interactive system diagnostic feeds. Acts as Hinson's command center launching game experiences.",
    "gameUrl": "https://hinson1017.github.io/MyHomePage/GameTerminal.html",
    "homageUrl": "https://hinson1017.github.io/MyHomePage/",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "Fast-paced cyberpunk twin-stick canvas action game with dynamic particle systems.",
    "description": "A top-down shooter built on HTML5 Canvas featuring vibrant neon particle trails, fluid 360-degree aiming, enemy AI tracking, and adrenaline-pumping survival waves.",
    "gameUrl": "https://mkysugna.github.io/angus_personal_home_page/game.html",
    "homageUrl": "https://mkysugna.github.io/angus_personal_home_page/",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "Charming 8-bit retro arcade hide-and-seek interactive maze experience.",
    "description": "An interactive 8-bit retro web game crafted with Tailwind CSS and classic arcade fonts. Players explore rooms, search for hidden items, and avoid seekers within an immersive pixel-art interface.",
    "gameUrl": "https://bobo2111.github.io/Bobo/hideandseekgame.html",
    "homageUrl": "https://bobo2111.github.io/Bobo/",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "First-Person Shooter 3D web experience with canvas raycasting & target tracking.",
    "description": "A 3D First-Person Shooter experience running entirely in browser canvas without heavy game engines. Features pointer lock controls, target tracking, weapon animations, and responsive movement.",
    "gameUrl": "https://rene0510.github.io/rene_new_personal_page/webapp.html",
    "homageUrl": "https://rene0510.github.io/rene_new_personal_page/",
    "badge": "中五級作品 Y12 Work",
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
    "tagline": "3D first-person Pac-Man maze with canvas raycasting & dynamic ghost chasing AI.",
    "description": "A 3D first-person perspective adaptation of the arcade classic Pac-Man. Navigate winding corridors, collect power pellets, and evade dynamic ghost AI in a raycasted 3D canvas environment.",
    "gameUrl": "https://sedgwickhung0728-dot.github.io/Pac-Man/",
    "homageUrl": "https://bi.robi3.com/sedgwick-hung/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "High-speed 3D highway obstacle course and traffic evasion driving game.",
    "description": "A responsive 3D driving arcade game featuring oncoming vehicle hazards, road perspective scaling, score multipliers, and dynamic road curvature.",
    "gameUrl": "https://danielkiukiu322-art.github.io/test-game/",
    "homageUrl": "https://bi.robi3.com/daniel-l/",
    "badge": "中四級作品 Y11 Work",
    "tech": [
      "3D Canvas",
      "Collision Physics",
      "Speed Curves",
      "Dynamic Hazards"
    ],
    "vibePrompt": "Create a 3D endless highway driving runner where the player steers a speedster dodging traffic, collects fuel points, and tests reaction speed."
  },
  {
    "id": "y11-charlie",
    "year": "Year 11",
    "student": "Charlie",
    "title": "Cyber Dodge Game (Brickbreaker)",
    "category": "Games",
    "tagline": "Fast-paced arcade brick and hazard dodging survival challenge.",
    "description": "Action-packed arcade reflex game where players navigate neon defense bars, deflect projectiles, and rack up high combos under escalating speeds.",
    "gameUrl": "https://vvin830.github.io/Brickbreaker/",
    "homageUrl": "https://bi.robi3.com/charlie-chan/",
    "badge": "中四級作品 Y11 Work",
    "tech": [
      "HTML5 Canvas",
      "Reflex Mechanics",
      "Neon Visuals",
      "Combo Scoring"
    ],
    "vibePrompt": "Build a neon cyberpunk brickbreaker and hazard dodging survival game with escalating ball speeds and combo streak scoring."
  },
  {
    "id": "y11-vanessa",
    "year": "Year 11",
    "student": "Vanessa",
    "title": "Emoji Endless Runner",
    "category": "Games",
    "tagline": "Vibrant side-scrolling obstacle jumping runner with animated emojis.",
    "description": "A cheerful, fast-action infinite runner where players leap over ground hazards and flying obstacles with responsive jump physics and multiplier rewards.",
    "gameUrl": "https://bignuts676767-commits.github.io/hi/",
    "homageUrl": "https://bi.robi3.com/vanessa/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Voxel sandbox 3D engine with block placement, mining, and horizon terrain.",
    "description": "An in-browser 3D voxel sandbox inspired by Minecraft, featuring real-time voxel generation, block building and destruction mechanics, and first-person camera movement.",
    "gameUrl": "https://tp211162-art.github.io/Minecraft/",
    "homageUrl": "https://bi.robi3.com/jabbok/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "High-intensity neon agility game testing rapid target clicking and hazard avoidance.",
    "description": "A sleek neon reaction test game challenging players to tap targets while dodging pulsing hazards under a tight countdown clock.",
    "gameUrl": "https://tp211142-hub.github.io/doggame/",
    "homageUrl": "https://bi.robi3.com/elita/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Retro arcade starfield spaceship survival dodging incoming asteroid storms.",
    "description": "An intense 2D arcade starship flight game with glowing vector graphics, asteroid collision detection, progressive speed scaling, and space flight controls.",
    "gameUrl": "https://tp211168-jpg.github.io/cat-game/",
    "homageUrl": "https://bi.robi3.com/cherry/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Fun interactive bamboo gathering adventure with cute panda animations.",
    "description": "Guide a hungry panda across lush forest clearings to gather fresh bamboo shoots while dodging falling obstacles and earning special power snacks.",
    "gameUrl": "https://tp211140-creator.github.io/panadagame/",
    "homageUrl": "https://bi.robi3.com/cara-term3-mid-term/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Dual-mirror hero tactical combat arena with particle spells and boss battles.",
    "description": "An elaborate dual-character combat RPG experience featuring light magic casting, cooldown skill rotations, particle visual effects, and intense boss battles.",
    "gameUrl": "https://huangjingtao109-design.github.io/Abc/",
    "homageUrl": "https://bi.robi3.com/pictre/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Clean, precision-timed classic Tetris with responsive block rotations and line clears.",
    "description": "An elegant, distraction-free implementation of the classic Tetris tetromino falling puzzle with ghost pieces, hard drops, and smooth line-clear scoring.",
    "gameUrl": "https://wbk1145-lgtm.github.io/Y11A-KevinW/",
    "homageUrl": "https://bi.robi3.com/y11a-kevin-wang/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Fast-action typing basketball shootout testing rapid number keypad accuracy.",
    "description": "A sports typing hybrid where landing three-pointers requires rapid and accurate keypad entry of 6 and 7-digit strings against a shot clock.",
    "gameUrl": "https://jac0b1111.github.io/basketball/",
    "homageUrl": "https://bi.robi3.com/jacob-2/",
    "badge": "中四級作品 Y11 Work",
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
    "tagline": "Tamagotchi-style interactive virtual pet simulator with feeding and playtime.",
    "description": "A heartwarming virtual dog companion game where players feed, play fetch, groom, and maintain health meters for Jeffery the virtual puppy.",
    "gameUrl": "https://danielkiukiu322-art.github.io/jeffery/",
    "homageUrl": "https://bi.robi3.com/jeffery/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Lateisha's Art & Design Portfolio",
    "category": "Personal Homage",
    "tagline": "Year 11 Art & Design stream showcase blending visual aesthetics with ICT programming.",
    "description": "Curated portfolio website by Lateisha Leung exploring digital layout compositions, visual styling, and interactive web elements created in HKBC Year 11.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kkk/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Phoebe's Creative Web Space",
    "category": "Personal Homage",
    "tagline": "Year 11 Art & Design student interactive showcase exploring books, pets, and visual layouts.",
    "description": "A personal homepage crafted by Phoebe featuring creative storytelling, reflections on literature, artwork showcases, and modern web styling.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/phoebe/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Regan's Digital Hub",
    "category": "Personal Homage",
    "tagline": "Year 11 ICT personal homepage demonstrating responsive web structure and styling.",
    "description": "Interactive digital hub designed by Regan highlighting creative frontend design, modular layout architecture, and personal identity.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/regan-2/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Eunes's Music & Creative Hub",
    "category": "Personal Homage",
    "tagline": "Year 11 ICT personal web project celebrating music, songs, and creativity.",
    "description": "Vibrant student homepage by Eunes showcasing music passions, favorite musical groups, and expressive web storytelling crafted during Year 11 ICT.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/eunes/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Hyman's Fencing & Digital Space",
    "category": "Personal Homage",
    "tagline": "Year 11 personal portfolio highlighting fencing passion, sports goals, and web design.",
    "description": "Personal portfolio by Hyman Poon presenting his dedication to competitive fencing, athletic aspirations, and modern web design techniques.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/hyman-2/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Shelly's Creative Studio",
    "category": "Personal Homage",
    "tagline": "Year 11 computing project featuring interactive multimedia presentation and web typography.",
    "description": "Modern web studio page created by Shelly Lin showcasing digital storytelling, clean typographic layout, and personalized visual flair.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/shelly/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Shereen's Web Showcase",
    "category": "Personal Homage",
    "tagline": "Year 11 student digital showcase exploring frontend user interface and design components.",
    "description": "Personal homepage created by Shereen for Year 11 ICT, demonstrating intuitive web navigation, responsive containers, and creative expression.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/shereen/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "William's Tech Showcase",
    "category": "Personal Homage",
    "tagline": "Year 11 web computing project exploring personal web architecture and digital identity.",
    "description": "Web computing showcase created by William, presenting technological interests, computing concepts, and personalized digital identity.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/william/",
    "badge": "中四級作品 Y11 Work",
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
    "title": "Vio's Digital Showcase",
    "category": "Personal Homage",
    "tagline": "Year 11 interactive personal homepage exploring layout design and digital styling.",
    "description": "Creative web project created by Vio exploring personal expression, color palettes, and structured web layouts in Year 11 ICT.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/vio-4/",
    "badge": "中四級作品 Y11 Work",
    "tech": [
      "Visual Layouts",
      "Color Systems",
      "Web Storytelling",
      "CSS Styling"
    ],
    "vibePrompt": "Craft an aesthetic and expressive digital homepage with custom color schemes and multimedia elements."
  },
  {
    "id": "y11-bright",
    "year": "Year 11",
    "student": "Bright",
    "title": "Bright's Creative Homepage",
    "category": "Personal Homage",
    "tagline": "Year 11 ICT student digital portal & creative computing project.",
    "description": "Student project created by Bright for the Year 11 ICT curriculum, exploring frontend web layouts and generative AI development.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/y11/y11-authors/",
    "badge": "中四級作品 Y11 Work",
    "tech": [
      "Web Fundamentals",
      "Creative Computing",
      "AI Prompting",
      "HTML5"
    ],
    "vibePrompt": "Build a personal showcase homepage representing creative computing explorations in Year 11 ICT."
  },
  {
    "id": "y11-daniel-wong",
    "year": "Year 11",
    "student": "Daniel Wong",
    "title": "Daniel Wong's Creative Homepage",
    "category": "Personal Homage",
    "tagline": "Year 11 ICT student digital space and computing showcase.",
    "description": "Personal digital showcase developed by Daniel Wong within the HKBC Year 11 ICT curriculum, focusing on interactive design and modern web technology.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/y11/y11-authors/",
    "badge": "中四級作品 Y11 Work",
    "tech": [
      "Interactive Design",
      "HTML5 & CSS3",
      "Web Tools",
      "Creative Coding"
    ],
    "vibePrompt": "Design a modern digital portfolio for Year 11 computing class showcasing student work and web technology."
  },
  {
    "id": "y10-billy",
    "year": "Year 10",
    "student": "Billy",
    "title": "S1mon's Personal Web Studio",
    "category": "Personal Homage",
    "tagline": "Year 10 ICT student personal web studio and creative computing portfolio.",
    "description": "Interactive personal web page designed by Billy in Year 10 ICT, showcasing student interests, web design fundamentals, and creative multimedia layouts.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/s1mon/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Bird's Digital Space",
    "category": "Personal Homage",
    "tagline": "Year 10 creative personal homepage exploring digital expression and typography.",
    "description": "Playful and imaginative digital space crafted by Bird for the Year 10 ICT curriculum, showcasing custom layout styling and multimedia integration.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/weqweqwewqweqewqeqweqweqweqweqw-edfsdfq%e5%8d%83%e4%b8%87%e5%af%8c%e7%bf%81%e5%be%88%e5%a4%9a%e5%8f%91%e9%a1%ba%e4%b8%b0%e5%a6%82%e6%9e%9c%e4%bb%96%e5%8f%916b-d-jjkasdujhfuguytfgsuohtguihtgawenuotaui/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "My Hobby · Coco's World",
    "category": "Personal Homage",
    "tagline": "Year 10 interactive personal blog exploring student passions and leisure hobbies.",
    "description": "Vibrant student homepage by Coco presenting personal hobbies, creative storytelling, and responsive web aesthetics created during Year 10 computing.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/my-hobby/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Frank's Website",
    "category": "Personal Homage",
    "tagline": "Year 10 student web portal exploring computing principles and modern web styling.",
    "description": "Clean personal homepage created by Frank showcasing introductory web development topics, layout composition, and interactive elements.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/frank-website/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Janice's Creative Showcase",
    "category": "Personal Homage",
    "tagline": "Year 10 computing project highlighting creative digital storytelling and design.",
    "description": "Expressive digital homepage created by Janice featuring personalized aesthetic touches, modular design blocks, and student project highlights.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/janice/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Jennifer's Digital Hub",
    "category": "Personal Homage",
    "tagline": "Year 10 personal homepage demonstrating responsive web structure and visual identity.",
    "description": "Structured student homepage designed by Jennifer, featuring multimedia galleries, clean component styling, and personalized self-introduction.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/jennifer/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Judy's Student Web Space",
    "category": "Personal Homage",
    "tagline": "Year 10 student personal portfolio exploring computing creativity and web aesthetics.",
    "description": "Personal web space designed by Year 10 student Judy, exploring creative web layout fundamentals, typography, and personalized digital content.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/judy/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Kathy's Digital Corner",
    "category": "Personal Homage",
    "tagline": "Year 10 student personal portal celebrating digital creativity and self-expression.",
    "description": "Enthusiastic and colorful web showcase created by Kathy for Year 10 ICT, incorporating interactive sections and creative digital design.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kathy/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Kaylin's Creative Wonderland",
    "category": "Personal Homage",
    "tagline": "Year 10 student multimedia hub featuring video embeds, figurines, and animation.",
    "description": "Delightful student homepage created by Kaylin featuring video clips, favorite anime/cartoons (Gravity Falls), figurines, CodeMonkey coding reflections, and multilingual greetings.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/kaylin/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Nikki's Personal Space",
    "category": "Personal Homage",
    "tagline": "Year 10 ICT personal web project exploring clean typography and responsive layout.",
    "description": "Modern personal profile designed by Nikki for the HKBC Year 10 computing curriculum, showcasing structured web sections and personal interests.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/nikki/",
    "badge": "中三級作品 Y10 Work",
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
    "title": "Yang's Tech & Creative Portal",
    "category": "Personal Homage",
    "tagline": "Year 10 ICT student digital space and practical web showcase.",
    "description": "Dynamic personal web portal created by Yang, highlighting computing curiosities, clean frontend layout techniques, and digital storytelling.",
    "gameUrl": null,
    "homageUrl": "https://bi.robi3.com/657/",
    "badge": "中三級作品 Y10 Work",
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
  const yearClass = p.year === 'Year 12' ? 'badge-y12' : (p.year === 'Year 11' ? 'badge-y11' : 'badge-y10');
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
        瀏覽網站 Visit Website 🌐 ↗
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

  const displayYear = p.year === 'Year 12' ? '中五級 Year 12' : (p.year === 'Year 11' ? '中四級 Year 11' : '中三級 Year 10');
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

        <!-- Direct Game & Website Links -->
        <div class="card-links-panel">
          <div class="card-link-row">
            <span class="link-label">🎮 遊戲 Game:</span>
            ${p.gameUrl 
              ? `<a href="${p.gameUrl}" target="_blank" rel="noopener noreferrer" class="link-url" title="新分頁開啟遊戲 ${p.title}">${p.title} ↗</a>` 
              : `<span class="link-url text-muted">開發中 In Development</span>`
            }
          </div>
          <div class="card-link-row">
            <span class="link-label">🌐 網站 Website:</span>
            ${p.homageUrl 
              ? `<a href="${p.homageUrl}" target="_blank" rel="noopener noreferrer" class="link-url" title="新分頁瀏覽 ${p.student} 個人主頁">${p.student} 個人主頁 ↗</a>` 
              : `<span class="link-url text-muted">待發佈 Coming Soon</span>`
            }
          </div>
        </div>

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
  const displayYear = p.year === 'Year 12' ? '中五級 Year 12' : (p.year === 'Year 11' ? '中四級 Year 11' : '中三級 Year 10');
  const yearClass = p.year === 'Year 12' ? 'badge-y12' : (p.year === 'Year 11' ? 'badge-y11' : 'badge-y10');

  modalYear.textContent = displayYear;
  modalYear.className = `badge ${yearClass}`;
  
  modalCat.textContent = p.category === 'Games' ? '🎮 互動遊戲 Games' : '🌐 個人主頁 Homage';
  modalCat.className = `badge ${p.category === 'Games' ? 'badge-game' : 'badge-homage'}`;
  
  modalAvatar.textContent = p.student.charAt(0).toUpperCase();
  modalTitle.textContent = p.title;
  modalStudent.textContent = `${p.student} (${displayYear})`;
  modalDesc.textContent = p.description;

  modalTech.innerHTML = p.tech.map(t => `<span class="tech-pill" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('');
  modalPrompt.textContent = p.vibePrompt || '利用生成式 AI 提示工程及現代網頁技術構建。Built using AI-assisted prompt engineering & web development.';

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
