const fs = require('fs');

let content = fs.readFileSync('src/components/HateSpeech.tsx', 'utf8');

const targetStart = `{/* Telefonos */}`;
const targetEnd = `</section>`;
const startIndex = content.indexOf(targetStart);
const endIndex = content.lastIndexOf(targetEnd) + targetEnd.length;

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find boundaries.");
    process.exit(1);
}

const replacement = `{/* Telefonos */}
          <div className="space-y-4 md:col-span-2 mb-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Teléfonos de Asistencia Oficiales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">021 - Discriminación Racial o Étnica</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Servicio estatal gratuito y confidencial de atención a víctimas (CEDRE).</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">017 - Ciberseguridad e INCIBE</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Línea de ayuda gratuita para casos de ciberacoso y odio en redes sociales.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces Expandidos */}
          <div className="space-y-4 md:col-span-2 mt-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Plataformas, Entidades y Recursos para el Aula
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="https://www.inclusion.gob.es/oberaxe/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">OBERAXE</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Observatorio Español del Racismo. Estudios y guías oficiales.</span>
                </div>
              </a>

              <a href="https://www.educatolerancia.com/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Educa Tolerancia</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Portal del Movimiento contra la Intolerancia. Materiales y campañas.</span>
                </div>
              </a>

              <a href="https://maldita.es/malditamigracion/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Maldita Migración</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Fact-checking periodístico para desmontar bulos de odio en el aula.</span>
                </div>
              </a>

              <a href="https://www.cear.es/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">CEAR</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Comisión Española de Ayuda al Refugiado. Campañas escolares.</span>
                </div>
              </a>

              <a href="https://www.fad.es/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Fundación FAD</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Programas para la prevención del odio y machismo en adolescentes.</span>
                </div>
              </a>

              <a href="https://www.es.amnesty.org/en-que-estamos/temas/educacion-en-derechos-humanos/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-orange-600 group-hover:text-orange-700 block text-sm">Amnistía Internacional</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Red de Escuelas y recursos globales en Derechos Humanos.</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

const newContent = content.substring(0, startIndex) + replacement + "\n  );\n}\n";

fs.writeFileSync('src/components/HateSpeech.tsx', newContent);
console.log('Links updated successfully');
