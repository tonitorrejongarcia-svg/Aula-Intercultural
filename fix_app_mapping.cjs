const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        parsed = parsed.map(a => {
           let tg = a.targetGrade;
           if (tg === '1º y 2º ESO' || tg === '1º a 3º ESO') tg = 'ESO';
           else if (tg === '3º y 4º ESO, Bachillerato' || tg === '4º ESO y Bachillerato') tg = 'ESO y Bachillerato';
           else if (tg === 'Educación Primaria (6-12 años)') tg = 'Primaria';
           else if (tg === 'Educación Infantil (3-6 años)') tg = 'Infantil';
           a.targetGrade = tg;
           return a;
        });`;

const replacement = `        parsed = parsed.map(a => {
           let lower = (a.targetGrade || '').toLowerCase();
           let newGrade = a.targetGrade;
           if (lower.includes('todas las etapas') || lower.includes('todos los niveles') || lower.includes('cualquier')) {
               newGrade = 'Todos los Niveles';
           } else if (lower.includes('eso') && lower.includes('bachillerato')) {
               newGrade = 'ESO y Bachillerato';
           } else if (lower.includes('eso')) {
               newGrade = 'ESO';
           } else if (lower.includes('bachillerato')) {
               newGrade = 'Bachillerato';
           } else if (lower.includes('primaria')) {
               newGrade = 'Primaria';
           } else if (lower.includes('infantil')) {
               newGrade = 'Infantil';
           }
           a.targetGrade = newGrade;
           return a;
        });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated mapping in App.tsx");
