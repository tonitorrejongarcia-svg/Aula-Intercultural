const fs = require('fs');

let content = fs.readFileSync('src/components/Contact.tsx', 'utf8');

// Fix default value
content = content.replace(
  "const [propGrade, setPropGrade] = useState('1º y 2º ESO');",
  "const [propGrade, setPropGrade] = useState('ESO');"
);

// Fix dropdown options
const selectOld = `<option value="1º y 2º ESO font-medium">1º y 2º ESO</option>
                      <option value="3º y 4º ESO font-medium">3º y 4º ESO</option>
                      <option value="Bachillerato font-medium">Bachillerato</option>
                      <option value="Cualquier curso font-medium">Todos los Cursos</option>`;

const selectNew = `<option value="Infantil">Infantil</option>
                      <option value="Primaria">Primaria</option>
                      <option value="ESO">ESO</option>
                      <option value="Bachillerato">Bachillerato</option>
                      <option value="Todos los Niveles">Todos los Niveles</option>`;

content = content.replace(selectOld, selectNew);

fs.writeFileSync('src/components/Contact.tsx', content);
console.log("Contact.tsx updated.");
