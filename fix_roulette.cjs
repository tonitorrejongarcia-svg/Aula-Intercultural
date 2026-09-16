const fs = require('fs');
let content = fs.readFileSync('src/components/CircleTimeDebate.tsx', 'utf8');

const targetSection = `      {/* Add / Manage own questions */}
      <div className="mt-8 border-t border-slate-200/80 pt-6 space-y-4">
        <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider">
          Añade o Gestiona el Banco de Preguntas ({questions.length})
        </h4>

        <form onSubmit={handleAddQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Propón una pregunta de debate para tu aula..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-sans text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            id="debate-custom-input"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center gap-1.5 font-sans font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            id="debate-add-btn"
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
        </form>

        {/* Scrollable list of existing questions */}
        <div className="max-h-[140px] overflow-y-auto pr-2 space-y-1.5">
          {questions.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-white/60 hover:bg-white border border-slate-100 rounded-lg text-[11px] font-sans text-slate-600 transition-all">
              <span className="line-clamp-1 flex-1 leading-normal">
                {idx + 1}. {q}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(idx)}
                className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors shrink-0"
                title="Eliminar pregunta"
                id={\`delete-question-\${idx}\`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>`;

content = content.replace(targetSection, '');

fs.writeFileSync('src/components/CircleTimeDebate.tsx', content);
console.log("Removed question management section from Roulette.");
