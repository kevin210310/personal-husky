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