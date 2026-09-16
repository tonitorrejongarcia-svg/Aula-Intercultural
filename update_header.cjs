const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Add pending count to props
content = content.replace(
  'interface HeaderProps {\n  activeTab: string;\n  setActiveTab: (tab: string) => void;\n}',
  'interface HeaderProps {\n  activeTab: string;\n  setActiveTab: (tab: string) => void;\n  pendingCount?: number;\n}'
);

content = content.replace(
  'export default function Header({ activeTab, setActiveTab }: HeaderProps) {',
  'export default function Header({ activeTab, setActiveTab, pendingCount = 0 }: HeaderProps) {'
);

// Map over menuItems to add the red dot for intranet
const targetDesktopItem = `{item.label}
              </button>`;
              
const newDesktopItem = `{item.label}
                {item.id === 'intranet' && pendingCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>`;
// WAIT. We need to be careful with the exact HTML. Let's see how desktop menu is rendered.
