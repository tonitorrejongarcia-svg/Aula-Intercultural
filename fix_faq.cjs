const fs = require('fs');

let content = fs.readFileSync('src/components/FAQ.tsx', 'utf8');

// Update Props
content = content.replace(
  'interface FAQProps {\n  faqs?: FAQItem[];\n}',
  'interface FAQProps {\n  faqs?: FAQItem[];\n  onGoToContact?: () => void;\n}'
);

content = content.replace(
  'export default function FAQ({ faqs = [] }: FAQProps) {',
  'export default function FAQ({ faqs = [], onGoToContact }: FAQProps) {'
);

// Update bottom text
const targetBottom = `<p className="text-xs text-orange-50">
              Accede al apartado de Contacto en el menú superior principal. Estaremos encantados de acompañarte o compartir dinámicas personalizadas creadas por otros centros escolares.
            </p>`;

const newBottom = `<p className="text-xs text-orange-50">
              Accede al apartado de <button onClick={onGoToContact} className="font-bold underline underline-offset-2 hover:text-white transition-colors cursor-pointer">Contacto</button> en el menú superior principal. Estaremos encantados de acompañarte o compartir dinámicas personalizadas creadas por otros centros escolares.
            </p>`;

content = content.replace(targetBottom, newBottom);

fs.writeFileSync('src/components/FAQ.tsx', content);
console.log('FAQ updated');
