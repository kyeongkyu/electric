import fs from 'fs';

const content = fs.readFileSync('components/Visualizations.tsx', 'utf8');
const a7start = content.indexOf('function EtfA7L1Visual');
const a7content = content.substring(a7start);

const strings = a7content.match(/>([^<]*[\uAC00-\uD7A3]+[^<]*)</g) || [];
// remove >< and print uniquely
const unique = [...new Set(strings.map(s => s.slice(1, -1).trim()))];
console.log(unique.join('\n'));
