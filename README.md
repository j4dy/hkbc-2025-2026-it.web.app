# HKBC Vibe Coding Showcase (Year 11 & Year 12)

Official showcase portfolio of work done by **ICT students in Year 11 and Year 12** during **academic year 2025–2026 (Apr–Jun 2026)**, led by **Miss Judy** ([judy@j4dy.net](mailto:judy@j4dy.net)) at **Hong Kong Bluebell College (香港紫荊書院)**.

🌐 **Live Website:** [https://hkbc-2025-2026-it.web.app](https://hkbc-2025-2026-it.web.app)  
🏫 **School Website:** [https://www.hkbc.edu.hk/en/](https://www.hkbc.edu.hk/en/)

---

## 🚀 Features

- **Cohort Filtering:** Filter by **Year 11** and **Year 12** student cohorts.
- **Category Filtering:** Filter between **🎮 Vibe Games** and **🌐 Web Apps**.
- **Real-Time Search:** Search dynamically across student names, project titles, and technology tags.
- **Project Detail Modals:** View detailed project stories, AI tools utilized, prompt frameworks, and learning highlights.
- **Direct Standalone Launchers:** All student game simulators and personal hubs open cleanly in separate dedicated windows (`target="_blank"`).
- **Official HKBC Branding:** Styled with official Hong Kong Bluebell College royal purple (`#620673`) and sage green (`#b8d8af`) colorscheme.

---

## 🛠️ Project Structure

```text
portfolio/
├── .firebaserc              # Firebase project alias (hkbc-2025-2026-it)
├── firebase.json            # Firebase Hosting configuration
├── index.html               # Main showcase web page
├── style.css                # HKBC theme styles
├── app.js                   # Filtering, search, and dynamic card rendering
├── src/
│   └── data/
│       └── projects.json    # Student project records and metadata
├── public/
│   └── games/
│       └── isaac-defense.html # Standalone window launcher for Isaac's game
└── scripts/
    ├── build.sh             # Compiles assets into dist/
    ├── deploy.sh            # Builds and deploys to Firebase Hosting
    └── dev.sh               # Local Firebase emulator server
```

---

## 💻 Development & Deployment

### Build
```bash
./scripts/build.sh
```

### Deploy to Firebase Hosting
```bash
./scripts/deploy.sh
```

Curated for Hong Kong Bluebell College (HKBC) ICT & Computing Department.
