# Guía Completa de Husky
## ¿Qué es Husky?

Husky es una herramienta que facilita el uso de **Git hooks** en proyectos de Node.js. Los Git hooks son scripts que Git ejecuta automáticamente antes o después de eventos específicos como commits, push, merge, etc.

### Características principales:
* ✅ Fácil configuración y uso
* ✅ Soporte para todos los Git hooks
* ✅ Compatible con cualquier herramienta (ESLint, Prettier, tests, etc.)
* ✅ Ligero y rápido
* ✅ Sin dependencias pesadas

## ¿Por qué usar Husky?
### Beneficios:

1. **Calidad de código:** Ejecuta linters y formateadores antes de cada commit.
2. **Prevención de errores:** Ejecuta tests automáticamente antes de push.
3. **Estandarización:** Asegura que todo el equipo siga las mismas reglas.
4. **Automatización:** Reduce trabajo manual y errores humanos
5. **CI/CD local:** Detecta problemas antes de subirlos al repositorio

### Casos de uso comunes:

* Formatear código automáticamente antes de commit
* Validar mensajes de commit según convenciones
* Ejecutar tests antes de push
* Verificar que no haya código con errores de linting
* Prevenir commits en ramas protegidas

## Instalación
### Método 1: Instalación automática
```bash
# npm
npx husky-init && npm install

# pnpm
pnpm dlx husky-init && pnpm install

# yarn
npx husky-init && yarn
```
### Método 2: Instalación manual
```bash
# Instalar husky
npm install --save-dev husky

# Inicializar husky
npx husky install

# Añadir script en package.json para habilitar Git hooks después de install
npm pkg set scripts.prepare="husky install"
```
## Configuración Básica
### Estructura de archivos:

```
proyecto/
├── .husky/
│   ├── _/
│   │   └── husky.sh
│   ├── pre-commit
│   ├── commit-msg
│   └── pre-push
├── package.json
└── ...
```


## Hooks más Comunes
### 1. Pre-commit

Se ejecuta antes de crear un commit. Útil para linting y formateo.
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run format
```

### 2. Commit-msg

Valida el mensaje del commit. Útil para convenciones como Conventional Commits.
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

### 3. Pre-push

Se ejecuta antes de hacer push. Útil para ejecutar tests completos.

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:unit
npm run test:integration
```

### 4. Post-merge

Se ejecuta después de un merge. Útil para instalar dependencias nuevas.

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm install
```
