const fs = require('fs');
let content = fs.readFileSync('src/components/CircleTimeDebate.tsx', 'utf8');

content = content.replace(
  'Generando reflexión con IA (puede tardar unos 10-15 seg)...',
  'Generando reflexión (puede tardar unos 10-15 seg)...'
);

fs.writeFileSync('src/components/CircleTimeDebate.tsx', content);
console.log("Text replaced successfully.");
