import fs from 'fs';
const content = fs.readFileSync('components/Visualizations.tsx', 'utf-8');
const funcs = content.split('function Etf').slice(1).map(s => s.split('()')[0]);
console.log(`Found ${funcs.length} functions.`);
