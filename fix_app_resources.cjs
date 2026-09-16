const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldCustomActivities = `  // Derived state: customActivities for Contact page community board
  const customActivities = activities.filter(a => a.isCustom);`;

const newCustomActivities = `  // Derived state: customActivities for Contact page community board
  const customActivities = activities.filter(a => a.isCustom && a.isApproved);
  
  // Derived state: approved activities to show in Resources
  const approvedActivities = activities.filter(a => !a.isCustom || a.isApproved);`;

content = content.replace(oldCustomActivities, newCustomActivities);

// Replace activities={activities} with activities={approvedActivities} for Resources
content = content.replace(
  '<Resources activities={activities} />',
  '<Resources activities={approvedActivities} />'
);

// Verify AdminPanel gets all activities
// it gets activities={activities}, which is correct.
// Verify CircleTimeDebate gets all? Or just approved? Wait, where is it used?

fs.writeFileSync('src/App.tsx', content);
console.log('App updated');
