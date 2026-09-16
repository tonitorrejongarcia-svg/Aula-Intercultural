const fs = require('fs');

let content = fs.readFileSync('src/components/HateSpeech.tsx', 'utf8');

// 1. Remove numbering from the title
const targetTitle = "Caso Práctico {activeExercise + 1} de {exercises.length}";
const replacementTitle = "Caso Práctico";
content = content.replace(targetTitle, replacementTitle);

// 2. Make sure Phone is imported
if (!content.includes('Phone,')) {
    content = content.replace('ExternalLink,', 'ExternalLink, Phone,');
}

// 3. Add the resources section before the closing tags
const targetEnd = `      </div>
    </section>
  );
}`;

const resourcesBlock = `      </div>

      {/* Additional Resources Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-extrabold text-[#111827] text-xl md:text-2xl tracking-tight">
              Directorio de Ayuda y Recursos
            </h3>
            <p className="font-sans text-sm text-slate-500 mt-1">
              Información útil, contactos de emergencia y herramientas contra el odio y la discriminación.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Telefonos */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Teléfonos de Asistencia
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">021 - Discriminación Racial o Étnica</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Servicio estatal gratuito y confidencial de atención y asesoramiento a víctimas de discriminación racial o étnica (CEDRE).</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">017 - Ciberseguridad e INCIBE</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Línea de ayuda gratuita y confidencial para casos de ciberacoso, odio en redes sociales y problemas en internet.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Plataformas y Entidades
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <a href="https://www.observatoriolaracismo.es/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline block">
                    OBERAXE
                  </a>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Observatorio Español del Racismo y la Xenofobia. Estudios, recursos didácticos y guías para docentes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <a href="https://www.movimientocontralaintolerancia.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline block">
                    Movimiento contra la Intolerancia
                  </a>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-1">Organización de Derechos Humanos. Denuncia de delitos de odio, materiales educativos y apoyo integral a víctimas.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}`;

content = content.replace(targetEnd, resourcesBlock);

fs.writeFileSync('src/components/HateSpeech.tsx', content);
console.log('Update successful');
