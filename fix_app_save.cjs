const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        if (!hasNewDefaults || !hasSituations || !hasInfantil) {
          const merged = [...INITIAL_ACTIVITIES, ...parsed.filter(a => a.isCustom)];
          setActivities(merged);
          localStorage.setItem('intercultural_activities_all', JSON.stringify(merged));
        } else {
          setActivities(parsed);
        }`;

const replacement = `        if (!hasNewDefaults || !hasSituations || !hasInfantil) {
          const merged = [...INITIAL_ACTIVITIES, ...parsed.filter(a => a.isCustom)];
          setActivities(merged);
          localStorage.setItem('intercultural_activities_all', JSON.stringify(merged));
        } else {
          setActivities(parsed);
          // Force save to persist the cleaned up targetGrades
          localStorage.setItem('intercultural_activities_all', JSON.stringify(parsed));
        }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated App.tsx saving logic");
