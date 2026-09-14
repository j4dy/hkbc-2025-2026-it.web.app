import re
from bs4 import BeautifulSoup

with open("scripts/isaac_raw.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
modal = soup.find(id="gameModalWindow")

with open("scripts/isaac_game.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("scripts/isaac_game.js", "r", encoding="utf-8") as f:
    js = f.read()

# Modify JS so gameRunning starts true automatically
js_mod = js.replace("let gameRunning = false;", "let gameRunning = true;")

# Also remove dragging / modal positioning so it centers nicely on the screen
custom_override = """
<style>
body {
    background: #090d16;
    color: #e2e8f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    box-sizing: border-box;
}
.game-wrapper {
    width: 100%;
    max-width: 900px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    overflow: hidden;
}
.window-header {
    background: #1e293b;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #334155;
}
.window-title {
    font-weight: 700;
    font-size: 1.15rem;
    color: #38bdf8;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
.window-content {
    padding: 24px;
}
.back-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #1e293b;
}
.back-link {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
}
.back-link:hover {
    color: #38bdf8;
}
.author-badge {
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}
/* Ensure modal-window styles work inline without absolute position */
#gameModalWindow {
    display: block !important;
    position: static !important;
    transform: none !important;
    width: 100% !important;
    box-shadow: none !important;
    background: transparent !important;
    border: none !important;
}
.close-btn {
    display: none !important;
}
</style>
"""

content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Incremental Defense - Isaac (Y12)</title>
    <style>
{css}
    </style>
{custom_override}
</head>
<body>
    <div class="game-wrapper">
        <div class="window-header">
            <div class="window-title">🛡️ Incremental Defense</div>
            <div class="author-badge">By Isaac (Year 12 - HKBC)</div>
        </div>
        <div class="window-content">
            <div class="back-bar">
                <a href="https://duackyl.github.io/qwerty/" class="back-link" target="_blank" rel="noopener">← Visit Isaac's Personal Hub</a>
                <span style="font-size: 0.85rem; color: #64748b;">AI Vibe-Coded Web Game</span>
            </div>
            {modal.decode_contents()}
        </div>
    </div>

    <script>
{js_mod}
    </script>
</body>
</html>
"""

import os
os.makedirs("public/games", exist_ok=True)
with open("public/games/isaac-defense.html", "w", encoding="utf-8") as out:
    out.write(content)

print("Successfully created public/games/isaac-defense.html, size:", len(content))
