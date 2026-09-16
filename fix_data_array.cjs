const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The rogue FAQ items start after line 733 and end at line 755
const fixPattern = /,\s*\{\s*question:\s*'Los alumnos se quejan de que.*[\s\S]*?Pedagogía Aplicada'\s*\}\s*\];/;
if (content.match(fixPattern)) {
    content = content.replace(fixPattern, '\n];');
    fs.writeFileSync('src/data.ts', content);
    console.log('Fixed INITIAL_ACTIVITIES array.');
} else {
    console.log('Could not find the rogue FAQ pattern.');
}

