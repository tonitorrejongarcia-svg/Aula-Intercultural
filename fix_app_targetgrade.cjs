const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      const storedActivities = localStorage.getItem('intercultural_activities_all');
      if (storedActivities) {
        const parsed = JSON.parse(storedActivities);`;

const replacement = `      const storedActivities = localStorage.getItem('intercultural_activities_all');
      if (storedActivities) {
        let parsed = JSON.parse(storedActivities);
        // Normalize targetGrades globally
        parsed = parsed.map(a => {
           let tg = a.targetGrade;
           if (tg === '1º y 2º ESO' || tg === '1º a 3º ESO') tg = 'ESO';
           else if (tg === '3º y 4º ESO, Bachillerato' || tg === '4º ESO y Bachillerato') tg = 'ESO y Bachillerato';
           else if (tg === 'Educación Primaria (6-12 años)') tg = 'Primaria';
           else if (tg === 'Educación Infantil (3-6 años)') tg = 'Infantil';
           a.targetGrade = tg;
           return a;
        });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx mapped.");
