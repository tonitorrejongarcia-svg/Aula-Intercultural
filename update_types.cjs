const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes('isApproved?: boolean;')) {
    content = content.replace(
      'isCustom?: boolean; // to differentiate user-created activities',
      'isCustom?: boolean; // to differentiate user-created activities\n  isApproved?: boolean; // to require admin approval before publishing'
    );
    fs.writeFileSync('src/types.ts', content);
    console.log("Types updated");
}
