const fs = require('fs');
let content = fs.readFileSync('src/components/Resources.tsx', 'utf8');

const logicOld = `    const matchesStage = 
      stageFilter === 'todos' ||
      (stageFilter === 'infantil' && (targetGradeSafe.includes('infantil') || targetGradeSafe.includes('3-6'))) ||
      (stageFilter === 'primaria' && (targetGradeSafe.includes('primaria') || targetGradeSafe.includes('6-12'))) ||
      (stageFilter === '1_2_eso' && (targetGradeSafe.includes('1º') || targetGradeSafe.includes('2º'))) ||
      (stageFilter === '3_4_eso' && (targetGradeSafe.includes('3º') || targetGradeSafe.includes('4º'))) ||
      (stageFilter === 'bach' && (targetGradeSafe.includes('bach')));`;

const logicNew = `    const matchesStage = 
      stageFilter === 'todos' ||
      (stageFilter === 'infantil' && (targetGradeSafe.includes('infantil') || targetGradeSafe.includes('3-6'))) ||
      (stageFilter === 'primaria' && (targetGradeSafe.includes('primaria') || targetGradeSafe.includes('6-12'))) ||
      (stageFilter === 'eso' && targetGradeSafe.includes('eso')) ||
      (stageFilter === 'bachillerato' && targetGradeSafe.includes('bach'));`;

content = content.replace(logicOld, logicNew);

const dropOld = `<option value="todos">Todos los Niveles</option>
              <option value="infantil">Infantil</option>
              <option value="primaria">Primaria</option>
              <option value="1_2_eso">1º - 2º ESO</option>
              <option value="3_4_eso">3º - 4º ESO</option>
              <option value="bach">Bachillerato</option>`;
              
const dropNew = `<option value="todos">Todos los Niveles</option>
              <option value="infantil">Infantil</option>
              <option value="primaria">Primaria</option>
              <option value="eso">ESO</option>
              <option value="bachillerato">Bachillerato</option>`;

content = content.replace(dropOld, dropNew);

fs.writeFileSync('src/components/Resources.tsx', content);
console.log("Updated Resources.tsx");
