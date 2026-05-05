const fs = require('fs');
const content = fs.readFileSync('data/content.ts', 'utf8');
console.log(content.split('\n').slice(0, 5).join('\n'));
