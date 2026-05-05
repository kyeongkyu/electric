import fs from 'fs';

const content = fs.readFileSync('components/Visualizations.tsx', 'utf8');

const strings = content.match(/[\uAC00-\uD7A3]+/g) || [];
const uniqueStrings = [...new Set(strings)];
console.log(uniqueStrings.slice(0, 50).join(', '));
console.log('Total unique korean phrases:', uniqueStrings.length);
