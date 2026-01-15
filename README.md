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
```bash
# npm
npx husky-init && npm install

# pnpm
pnpm dlx husky-init && pnpm install

# yarn
npx husky-init && yarn
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





## Pasos para crear una nueva tarea

### 1. Preparación inicial
# Asegurarte de estar en la rama principal actualizada
git checkout main
git pull origin main

# Verificar el estado
git status

2. Crear rama con nomenclatura consistente
# Nomenclatura recomendada: tipo/descripcion-corta
git checkout -b feature/implementar-login
git checkout -b fix/corregir-validacion-email
git checkout -b hotfix/error-critico-pago
git checkout -b chore/actualizar-dependencias


3. Trabajar en la rama
# Hacer cambios y commits frecuentes
git add .
git commit -m "feat: agregar formulario de login"

git add src/validation.js
git commit -m "feat: agregar validación de email"

# Commits atómicos y descriptivos
git add tests/
git commit -m "test: agregar pruebas para login"

4. Mantener la rama actualizada
# Traer cambios de main periódicamente
git checkout main
git pull origin main
git checkout feature/implementar-login
git merge main

# O usando rebase (mantiene historial más limpio)
git rebase main

5. Subir la rama al repositorio remoto
# Primera vez
git push -u origin feature/implementar-login

# Siguientes pushes
git push

#commit dos
