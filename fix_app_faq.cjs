const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<FAQ faqs={faqs} />',
  '<FAQ faqs={faqs} onGoToContact={() => setActiveTab(\'contacto\')} />'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App updated');
