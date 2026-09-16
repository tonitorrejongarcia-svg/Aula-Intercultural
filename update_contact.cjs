const fs = require('fs');
let content = fs.readFileSync('src/components/Contact.tsx', 'utf8');

// Update new activity payload
content = content.replace(
  'isCustom: true,',
  'isCustom: true,\n      isApproved: false,'
);

// Update success message
const oldMsg = 'Tu propuesta ha sido incorporada a la base de datos local de forma inmediata. Navega a la pestaña de <strong>"Recursos de Aula"</strong> en la cabecera para verla publicada con todas sus fases de aplicación.';
const newMsg = 'Tu propuesta ha sido enviada con éxito. Un administrador revisará la dinámica desde el panel de control antes de que sea publicada en la pestaña de <strong>"Recursos de Aula"</strong>.';
content = content.replace(oldMsg, newMsg);

fs.writeFileSync('src/components/Contact.tsx', content);
console.log("Contact updated");
