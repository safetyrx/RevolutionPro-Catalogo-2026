REVOLUTION PRO - CATÁLOGO 2026 - V20

Esta versión mantiene el catálogo y editor de V19 corregido, incluyendo el mapeo definitivo de productos, y actualiza la base de Electron a 41.0.2 para corregir el problema de arranque observado en macOS.

CAMBIOS V20
- Electron actualizado a 41.0.2.
- Ventana creada inicialmente oculta y mostrada al evento ready-to-show.
- contextIsolation y sandbox activos.
- Mantiene Guardar PDF nativo.
- macOS: DMG + ZIP Universal (Intel + Apple Silicon).
- Windows: instalador NSIS x64.
- Sin login, servidor, base de datos ni backend.
- Mantiene los datos localmente.

GITHUB
1. Sube todo el contenido de esta carpeta al repositorio.
2. Ve a Actions.
3. Ejecuta "Build Revolution Pro Catalogo 2026 V20".
4. Descarga el artifact "Revolution-Pro-macOS-V20".
5. Dentro encontrarás el .dmg y el .zip Universal.

NOTA
El DMG generado seguirá siendo sin firma/notarización si no se configuran certificados Apple. Esta V20 corrige la base de ejecución; la firma/notarización es un paso independiente de distribución.
