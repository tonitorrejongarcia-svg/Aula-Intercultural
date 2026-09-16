const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        parsed = parsed.map(a => {
           let lower = (a.targetGrade || '').toLowerCase();`;

const replacement = `        // Remove any corrupted data (e.g. FAQ items that accidentally got saved as activities)
        parsed = parsed.filter(a => a.title && a.id);

        parsed = parsed.map(a => {
           let lower = (a.targetGrade || '').toLowerCase();`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx filtered.");
