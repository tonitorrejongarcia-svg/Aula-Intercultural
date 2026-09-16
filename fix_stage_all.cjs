const fs = require('fs');
let content = fs.readFileSync('src/components/Resources.tsx', 'utf8');

const target = `    const matchesStage = 
      stageFilter === 'todos' ||
      (stageFilter === 'infantil' && (targetGradeSafe.includes('infantil') || targetGradeSafe.includes('3-6'))) ||
      (stageFilter === 'primaria' && (targetGradeSafe.includes('primaria') || targetGradeSafe.includes('6-12'))) ||
      (stageFilter === 'eso' && targetGradeSafe.includes('eso')) ||
      (stageFilter === 'bachillerato' && targetGradeSafe.includes('bach'));`;

const replacement = `    const matchesStage = 
      stageFilter === 'todos' ||
      targetGradeSafe.includes('todos') ||
      (stageFilter === 'infantil' && (targetGradeSafe.includes('infantil') || targetGradeSafe.includes('3-6'))) ||
      (stageFilter === 'primaria' && (targetGradeSafe.includes('primaria') || targetGradeSafe.includes('6-12'))) ||
      (stageFilter === 'eso' && targetGradeSafe.includes('eso')) ||
      (stageFilter === 'bachillerato' && targetGradeSafe.includes('bach'));`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/Resources.tsx', content);
console.log("matchesStage updated.");
