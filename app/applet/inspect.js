import fs from 'fs';
import path from 'path';

// Let's go up two levels to reach the workspace root
const rootPath = path.resolve(process.cwd(), '../..');
const content = fs.readFileSync(path.join(rootPath, 'components/Visualizations.tsx'), 'utf-8');

const startIdx = content.indexOf('function EtfA8L1Visual');
const endIdx = content.indexOf('function EtfA8L3Visual');
console.log(content.substring(startIdx, endIdx));
