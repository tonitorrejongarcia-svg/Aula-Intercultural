const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetHeader = '<Header activeTab={activeTab} setActiveTab={setActiveTab} />';
const replaceHeader = '<Header activeTab={activeTab} setActiveTab={setActiveTab} pendingCount={activities.filter(a => a.isCustom && !a.isApproved).length} />';

content = content.replace(targetHeader, replaceHeader);
fs.writeFileSync('src/App.tsx', content);
console.log('App header replaced');
