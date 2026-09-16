const fs = require('fs');
const path = require('path');

const directories = ['src', 'src/components'];

const replacements = {
  'teal-50': 'orange-50',
  'teal-100': 'orange-100',
  'teal-200': 'orange-200',
  'teal-400': 'orange-400',
  'teal-500': 'orange-500',
  'teal-600': 'orange-600',
  'teal-700': 'orange-700',
  'teal-800': 'orange-800',
  'indigo-50': 'emerald-50',
  'indigo-100': 'emerald-100',
  'indigo-200': 'emerald-200',
  'indigo-400': 'emerald-500',
  'indigo-500': 'emerald-600',
  'indigo-600': 'emerald-700',
  'indigo-700': 'emerald-800',
  'indigo-800': 'emerald-900',
  'amber-400': 'slate-400',
  'amber-500': 'slate-500',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'assets') processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      
      for (const [oldClass, newClass] of Object.entries(replacements)) {
        // Regex with boundaries to prevent partial matches like 'teal-500' becoming 'orange-500' then 'orange-50' replacing part of it.
        // Actually, sorting the keys by length descending will fix that.
      }
      
      const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
      for (const oldClass of sortedKeys) {
        const newClass = replacements[oldClass];
        const regex = new RegExp(oldClass, 'g');
        newContent = newContent.replace(regex, newClass);
      }

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src');
