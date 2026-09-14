import json

with open("src/data/projects.json", "r") as f:
    projects_json = f.read()

with open("app.js", "r") as f:
    app_code = f.read()

# Replace the init fetch logic with embedded data fallback
new_init = f"""const EMBEDDED_PROJECTS = {projects_json};

async function init() {{
  try {{
    const res = await fetch('./src/data/projects.json');
    if (res.ok) {{
      allProjects = await res.json();
    }} else {{
      allProjects = EMBEDDED_PROJECTS;
    }}
  }} catch (err) {{
    console.log('Using embedded projects dataset');
    allProjects = EMBEDDED_PROJECTS;
  }}
  updateCounts();
  renderProjects();
  setupEventListeners();
}}"""

# Replace in app.js
import re
app_mod = re.sub(r"async function init\(\) \{[\s\S]*?setupEventListeners\(\);\s*\}[\s\S]*?\}", new_init, app_code)

with open("app.js", "w") as f:
    f.write(app_mod)

print("Updated app.js with embedded data fallback!")
