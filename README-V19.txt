REVOLUTION PRO CATALOGO 2026 - V19 MULTIPLATAFORMA

Windows: npm install && npm run build:win
macOS: npm install && npm run build:mac (en un Mac)

También incluye .github/workflows/build.yml para generar ambos instaladores con GitHub Actions. La compilación macOS se ejecuta en un runner macOS y genera un DMG universal para Intel y Apple Silicon.

Para distribución pública en macOS, firma/notarización con Apple Developer es recomendable.
