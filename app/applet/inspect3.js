import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(process.cwd(), '../..');
const content = fs.readFileSync(path.join(rootPath, 'components/Visualizations.tsx'), 'utf-8');

const startIdx = content.indexOf('function EtfA8L3Visual');
const endIdx = content.indexOf('function ZapIcon');
console.log(content.substring(startIdx, endIdx));
