import os

for root, dirs, files in os.walk("."):
    # skip node_modules, .git, etc
    if any(p in root for p in ["node_modules", ".git", ".vercel", "dist", ".netlify"]):
        continue
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "H2 Batters" in content:
                    print(f"FOUND in: {path}")
        except Exception as e:
            pass
