const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

const desktopTarget = `{item.label}
              </button>`;
const desktopReplacement = `{item.label}
                {item.id === 'intranet' && pendingCount > 0 && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>`;

content = content.replace(desktopTarget, desktopReplacement);

const mobileTarget = `{item.label}
                  </button>`;
const mobileReplacement = `{item.label}
                    {item.id === 'intranet' && pendingCount > 0 && (
                      <span className="relative flex h-2 w-2 ml-auto">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </button>`;

content = content.replace(mobileTarget, mobileReplacement);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Header replaced');
