import fs from 'fs';
const content = fs.readFileSync('data/content.ts', 'utf8');

function getLen(id) {
    const idx = content.indexOf('"id": "' + id + '"');
    if (idx === -1) return 0;
    const titleIdx = content.indexOf('"title":', idx);
    const contentIdx = content.indexOf('"content":', titleIdx);
    const endIdx = content.indexOf('"\n        }', contentIdx);
    return endIdx - contentIdx;
}

console.log('b1-1 length:', getLen('ctf-b1-1'));
console.log('b2-1 length:', getLen('ctf-b2-1'));
console.log('b10-1 length:', getLen('ctf-b10-1'));
