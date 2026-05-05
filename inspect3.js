import fs from 'fs';
const content = fs.readFileSync('components/Visualizations.tsx', 'utf-8');
const startIdx = content.indexOf('function EtfA8L3Visual');
const endIdx = content.indexOf('function ZapIcon');
console.log(content.substring(startIdx, endIdx));
