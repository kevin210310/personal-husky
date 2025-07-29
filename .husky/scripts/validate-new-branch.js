const { execSync , exec} = require('child_process');
const process = require('process');
const { promisify } = require('util');

const execAsync = promisify(exec);
/**
 * Patrones RegEx para validación de nombres de rama
 * Formato: proyecto-TituloTarea-tipo123
 */

// Patrón completo (todo en uno)
const COMPLETE_PATTERN = /^[a-z]+-[A-Z][a-zA-Z0-9]*-(tsk|hst|fix)[0-9]+$/;

// Patrones específicos para cada parte
const PATTERNS = {
    // Estructura: exactamente 3 partes separadas por guiones
    structure: /^[^-]+-[^-]+-[^-]+$/,
    
    // Primera parte: proyecto (solo lowercase)
    project: /^[a-z]+$/,
    
    // Segunda parte: título en camelCase (empieza con mayúscula)
    taskTitle: /^[A-Z][a-zA-Z0-9]*$/,
    
    // Tercera parte: tipo + números (tsk, hst, fix seguido de dígitos)
    taskType: /^(tsk|hst|fix)[0-9]+$/
};

/**
 * Función de validación simple
 * @param {string} branchName - Nombre de la rama
 * @returns {object} Resultado de validación
 */
function validateBranch(branchName) {
    // Validación rápida con patrón completo
    if (COMPLETE_PATTERN.test(branchName)) {
        return { valid: true, message: '✅ Rama válida' };
    }

    // Validación detallada para errores específicos
    const parts = branchName.split('-');
    
    if (parts.length !== 3) {
        return { 
            valid: false, 
            error: 'structure',
            message: `❌ Debe tener exactamente 3 partes separadas por guiones (encontradas: ${parts.length})`,
            expected: 'proyecto-TituloTarea-tipo123'
        };
    }

    const [project, taskTitle, taskType] = parts;

    // Validar proyecto
    if (!PATTERNS.project.test(project)) {
        return { 
            valid: false, 
            error: 'project',
            message: '❌ El nombre del proyecto debe ser lowercase sin números ni caracteres especiales',
            received: project,
            expected: 'myproject, webapp, api'
        };
    }

    // Validar título
    if (!PATTERNS.taskTitle.test(taskTitle)) {
        return { 
            valid: false, 
            error: 'taskTitle',
            message: '❌ El título debe estar en camelCase empezando con mayúscula, sin espacios ni guiones bajos',
            received: taskTitle,
            expected: 'AgregarLogin, FixBugAuth, UpdateDocs'
        };
    }

    // Validar tipo de tarea
    if (!PATTERNS.taskType.test(taskType)) {
        return { 
            valid: false, 
            error: 'taskType',
            message: '❌ El tipo debe ser tsk, hst o fix seguido de números',
            received: taskType,
            expected: 'tsk123, hst456, fix789'
        };
    }

    return { valid: true, message: '✅ Rama válida' };
}
const sendCommand = async(command) => {
    try {
        const { stdout } = await execAsync(command);
        return stdout.trim();
    } catch (error) {
        return undefined
    }
}
const backBranch = async (currentBranch) => {
    try {
        console.log("🚀 Iniciando proceso de eliminación y retorno de la trama.")
        // Volver a la rama anterior
        const checkoutResult = await sendCommand('git checkout -');
        const deleteResult = await sendCommand(`git branch -d ${currentBranch}`)
        
        console.log("✅ Se volvió a la rama anterior.");
        
    } catch (error) {
        console.error("❌ Error en el proceso de retorno a la rama anterior.", {error})
    }
}

const verifyBranch = async () => {
    try {
        process.env.HUSKY = '0';
        console.log("🚀 Verificando la validez de tu nueva rama")

        const currentBranch = await sendCommand('git branch --show-current') 
        console.log("🔍 tu rama creada es: ", currentBranch);

        if(currentBranch === 'main') return console.log("ℹ️ Rama main es omitida por defecto.")
            
        const reflogEntry = await sendCommand('git reflog -1 --pretty=format:"%gs"') 
        
        if(!reflogEntry?.includes('checkout: moving from')) return console.error("❌ No es un cambio de rama.")
        console.log("✅ Es un cambio de rama.")

        const validation = validateBranch(currentBranch)

        if(!!validation.valid) return console.log("✅ Tu rama actual cumple con las validaciones.")
        
        console.error("❌ Tu rama no cumple con los estándares.")
        console.error("Tipo error: ", validation.message)
        console.error("Recibido: ", validation.received)
        console.error("Esperado: ", validation.expected)
        await backBranch(currentBranch);

    } catch (error) {
        console.error("❌ Error en el proceso de verificación de rama.", {error})
    } finally {
        delete process.env.HUSKY
    }
}

verifyBranch()