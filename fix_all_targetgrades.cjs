const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Use a replacer function for targetGrade
content = content.replace(/targetGrade:\s*'([^']+)'/g, (match, currentGrade) => {
    let newGrade = currentGrade;
    const lower = currentGrade.toLowerCase();
    
    if (lower.includes('todas las etapas') || lower.includes('todos los niveles')) {
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
    
    return `targetGrade: '${newGrade}'`;
});

fs.writeFileSync('src/data.ts', content);
console.log("Updated data.ts");
