const fs = require('fs');
let content = fs.readFileSync('src/components/FAQ.tsx', 'utf8');

const target = `  const [openIndex, setOpenIndex] = useState<number | null>(0);`;
const replacement = `  const [openIndex, setOpenIndex] = useState<number | null>(null);`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FAQ.tsx', content);
console.log("FAQ state updated.");
