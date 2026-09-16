const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Remove import
content = content.replace("import designedByDixome from '../assets/designed-by-dixome.png';\n", '');

// Remove state
content = content.replace("  const [dixomeError, setDixomeError] = useState(false);\n", '');

// Remove the JSX block
const jsxBlock = `            {/* Design attribution */}
            <a 
              href="https://horuelo.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-slate-550 text-[10px] font-semibold">Desarrollo y diseño por</span>
              {!dixomeError ? (
                <img 
                  src={designedByDixome} 
                  alt="Dixome" 
                  className="h-4.5 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                  onError={() => setDixomeError(true)}
                />
              ) : (
                <span className="text-orange-400 font-sans text-[11px] font-black tracking-tight hover:text-white transition-colors">Dixome</span>
              )}
            </a>

            <span className="hidden sm:inline text-slate-800">|</span>`;

content = content.replace(jsxBlock, '');

// Also remove it if the regex slightly mismatches by using a broader replace if needed
// Let's do a regex to be safe:
const jsxRegex = /\{\/\*\s*Design attribution\s*\*\/\}.*?<span className="hidden sm:inline text-slate-800">\|<\/span>/s;
content = content.replace(jsxRegex, '');

fs.writeFileSync('src/components/Footer.tsx', content);
console.log("Attribution removed.");
