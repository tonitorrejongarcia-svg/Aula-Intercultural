const fs = require('fs');
let content = fs.readFileSync('src/components/Resources.tsx', 'utf8');

const filterLogicOld = `    let matchesDuration = true;
    const dur = Number(act.duration) || 0;
    if (durationFilter === 'short') matchesDuration = dur < 30;
    else if (durationFilter === 'med') matchesDuration = dur >= 30 && dur <= 50;
    else if (durationFilter === 'long') matchesDuration = dur > 50;`;

const filterLogicNew = `    let matchesDuration = true;
    const dur = Number(act.duration) || 0;
    if (durationFilter === 'short') matchesDuration = dur <= 30;
    else if (durationFilter === 'med') matchesDuration = dur > 30 && dur <= 50;
    else if (durationFilter === 'long') matchesDuration = dur > 50;`;

content = content.replace(filterLogicOld, filterLogicNew);

const optionsOld = `<option value="todos">Cualquier Duración</option>
              <option value="short">Corta (&lt; 30 min)</option>
              <option value="med">Media (30 - 50 min)</option>
              <option value="long">Larga (&gt; 50 min)</option>`;

const optionsNew = `<option value="todos">Cualquier Duración</option>
              <option value="short">Corta (hasta 30 min)</option>
              <option value="med">Media (35 - 50 min)</option>
              <option value="long">Larga (más de 50 min)</option>`;

content = content.replace(optionsOld, optionsNew);

fs.writeFileSync('src/components/Resources.tsx', content);
console.log("Duration filter updated.");
