const fs = require('fs');
let content = fs.readFileSync('src/components/Glossary.tsx', 'utf8');

const target = `                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                        {term.word}
                      </h3>
                      {term.etymology && (
                        <span className="text-[10px] font-sans font-extrabold text-slate-400 italic leading-none shrink-0 border border-slate-200 px-2 py-1 rounded-md bg-slate-50">
                          {term.etymology.split('.')[0]}
                        </span>
                      )}
                    </div>`;

const replacement = `                    <div className="flex flex-col items-start gap-2">
                      <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                        {term.word}
                      </h3>
                      {term.etymology && (
                        <span className="text-[10px] font-sans font-extrabold text-slate-500 italic leading-snug border border-slate-200 px-2 py-1.5 rounded-md bg-slate-50 max-w-full">
                          {term.etymology.split('.')[0]}
                        </span>
                      )}
                    </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/Glossary.tsx', content);
console.log("Glossary layout updated.");
