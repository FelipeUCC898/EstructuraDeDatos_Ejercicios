✅ Opción 1 — Ejecutar directamente con ts-node

Asegúrate de tener instalado TypeScript y ts-node:

npm install -g typescript ts-node


Luego ejecuta tu archivo:

ts-node history.ts


🧠 Esto es lo más rápido y recomendado para pruebas o desarrollo.

✅ Opción 2 — Compilar y luego ejecutar con Node.js

Compila el archivo a JavaScript:

tsc history.ts


Esto generará un archivo history.js.

Ejecuta el archivo compilado:

node history.js


📁 Si no tienes un tsconfig.json, TypeScript lo creará con configuraciones por defecto.

🟨 Si tu archivo ya es JavaScript (.js)

Por ejemplo: history.js

Simplemente ejecútalo con Node:

node history.js

⚙️ Verifica que Node esté instalado

Puedes confirmar que todo está bien con:

node -v


Y para TypeScript:

tsc -v
