const fs = require('fs');
let content = fs.readFileSync('src/components/HateSpeech.tsx', 'utf8');

content = content.replace(
  'href="https://maldita.es/malditamigracion/"',
  'href="https://maldita.es/migracion/"'
);

fs.writeFileSync('src/components/HateSpeech.tsx', content);
console.log("Maldita link fixed");
