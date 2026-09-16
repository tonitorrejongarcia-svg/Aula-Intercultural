const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        } else {
          setActivities(parsed);
          // Force save to persist the cleaned up targetGrades
          localStorage.setItem('intercultural_activities_all', JSON.stringify(parsed));
        }`;

const replacement = `        } else {
          setActivities(parsed);
          // Force save to persist the cleaned up targetGrades and removed blank items
          localStorage.setItem('intercultural_activities_all', JSON.stringify(parsed));
        }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx saving updated.");
