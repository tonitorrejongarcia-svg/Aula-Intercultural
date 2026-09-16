const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// We will do a generic replacement of targetGrade values.
// Note: Some have "1º y 2º ESO", "3º y 4º ESO", etc.

const replacements = [
  { old: "'1º y 2º ESO'", new: "'ESO'" },
  { old: "'1º a 3º ESO'", new: "'ESO'" },
  { old: "'3º y 4º ESO, Bachillerato'", new: "'ESO y Bachillerato'" },
  { old: "'4º ESO y Bachillerato'", new: "'ESO y Bachillerato'" },
  { old: "'Educación Primaria (6-12 años)'", new: "'Primaria'" },
  { old: "'Educación Infantil (3-6 años)'", new: "'Infantil'" }
];

replacements.forEach(r => {
  content = content.split(r.old).join(r.new);
});

fs.writeFileSync('src/data.ts', content);
console.log("data.ts normalized.");
