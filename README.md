# R8 Road Drive – Android

1. Create a GitHub repo and push everything in this folder (keep the `.github` folder).
2. Open the **Actions** tab → **Build Android APK** (runs on every push, or press *Run workflow*).
3. When it finishes, download the **R8-Road-Drive-apk** artifact, unzip it, install `app-debug.apk`.

Game files live in `www/` (`index.html`, `r8.glb`, `trees.glb`). three.js is bundled into the app at build time, so it runs fully offline.
