import fs from 'fs';
const content = fs.readFileSync('components/Visualizations.tsx', 'utf-8');
const etfA8 = content.substring(content.indexOf('function EtfA8L1Visual'), content.indexOf('function EtfA8L3Visual'));
console.log(etfA8);
