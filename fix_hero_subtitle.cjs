const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        if (parsed.heroSubtitle === oldSub) {
           parsed.heroSubtitle = newSub;
           localStorage.setItem('intercultural_general_texts', JSON.stringify(parsed));
        }`;

const replacement = `        if (parsed.heroSubtitle && parsed.heroSubtitle.includes('docentes de educación secundaria')) {
           parsed.heroSubtitle = parsed.heroSubtitle.replace('docentes de educación secundaria', 'docentes de todas las etapas (Infantil, Primaria, Secundaria, Bachillerato)');
           localStorage.setItem('intercultural_general_texts', JSON.stringify(parsed));
        }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx hero subtitle update logic fixed.");
