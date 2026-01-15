const { execSync } = require('child_process');

const getCurrentBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('Error al obtener la rama actual:', error.message);
    process.exit(1);
  }
};

const branchRules = {
  patterns: [
    /^(feature|feat)\/[a-z0-9-]+$/,
    /^(fix|bugfix)\/[a-z0-9-]+$/,
    /^(hotfix)\/[a-z0-9-]+$/,
    /^(chore)\/[a-z0-9-]+$/,
    /^(docs)\/[a-z0-9-]+$/,
    /^(refactor)\/[a-z0-9-]+$/,
    /^(test)\/[a-z0-9-]+$/,
    /^[A-Z]+-[A-Za-z0-9]+-[A-Z]+\d+$/,
  ],
  protected: ['main', 'master', 'develop', 'staging'],
  maxLength: 50,
};

const validateBranchName = (branchName) => {
  if (branchRules.protected.includes(branchName)) {
    return { valid: true, errors: [] };
  }
  
  const errors = [];
  
  if (branchName.length > branchRules.maxLength) {
    errors.push(`Nombre muy largo (${branchName.length}>${branchRules.maxLength})`);
  }
  
  const matchesPattern = branchRules.patterns.some(pattern => pattern.test(branchName));
  if (!matchesPattern) {
    errors.push('No sigue ningún patrón permitido');
  }
  
  return { valid: errors.length === 0, errors };
};

const main = () => {
  const currentBranch = getCurrentBranch();
  const validation = validateBranchName(currentBranch);
  
  if (!validation.valid) {
    console.error('\n❌ Nombre de rama inválido:', currentBranch);
    console.error('\nErrores:');
    validation.errors.forEach(error => console.error(`  • ${error}`));
    console.error('\n📝 Patrones válidos:');
    console.error('  • feature/descripcion');
    console.error('  • fix/descripcion');
    console.error('  • SNAPP-AgregarReadme-TAK001');
    process.exit(1);
  }
  
  console.log(`✅ Nombre de rama válido: ${currentBranch}`);
};

main();
