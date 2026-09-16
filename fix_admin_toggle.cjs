const fs = require('fs');

let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const targetFunction = `  const handleDeleteActivity = (id: string) => {`;
const insertFunction = `  const handleToggleApproval = (id: string) => {
    const updated = activities.map(a => {
      if (a.id === id) {
        return { ...a, isApproved: !a.isApproved };
      }
      return a;
    });
    setActivities(updated);
    localStorage.setItem('intercultural_activities_all', JSON.stringify(updated));
  };

  const handleDeleteActivity = (id: string) => {`;

content = content.replace(targetFunction, insertFunction);

// Update table headers
const oldTh = `<th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4 text-right">Acciones</th>`;
const newTh = `<th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4 text-center">Estado</th>
                      <th className="py-3 px-4 text-right">Acciones</th>`;
content = content.replace(oldTh, newTh);

// Update table body
const targetTr = `<td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">`;
const newTr = `<td className="py-3.5 px-4 text-center">
                          {act.isCustom ? (
                            <button
                              onClick={() => handleToggleApproval(act.id)}
                              className={\`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1 \${
                                act.isApproved 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }\`}
                              title={act.isApproved ? "Publicada. Clic para ocultar" : "Pendiente. Clic para publicar"}
                            >
                              {act.isApproved ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {act.isApproved ? 'Publicada' : 'Pendiente'}
                            </button>
                          ) : (
                            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Base
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">`;

// Note: act.isCustom could be true but with isApproved undefined. We should treat it explicitly. If existing ones are missing isApproved, we should handle it, but new ones have isApproved: false.
content = content.replace(targetTr, newTr);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
console.log('AdminPanel updated');
