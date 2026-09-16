const fs = require('fs');
let content = fs.readFileSync('src/components/Resources.tsx', 'utf8');

const optionsOld = `<option value="todos">Cualquier Duración</option>
              <option value="short">Corta (hasta 30 min)</option>
              <option value="med">Media (35 - 50 min)</option>
              <option value="long">Larga (más de 50 min)</option>`;

const optionsNew = `<option value="todos">Cualquier Duración</option>
              <option value="short">Corta (hasta 30 min)</option>
              <option value="med">Media (de 35 a 50 min)</option>
              <option value="long">Larga (más de 50 min)</option>`;

content = content.replace(optionsOld, optionsNew);

fs.writeFileSync('src/components/Resources.tsx', content);
console.log("Labels updated.");
