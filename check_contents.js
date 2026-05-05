import fs from 'fs';
const content = fs.readFileSync('data/content.ts', 'utf8');

const id1 = 'ctf-b6-1';
const id2 = 'ctf-b9-1';

for (const id of [id1, id2]) {
    const idx = content.indexOf('"id": "' + id + '"');
    if (idx !== -1) {
        const titleIdx = content.indexOf('"title":', idx);
        const contentIdx = content.indexOf('"content":', titleIdx);
        const endIdx = content.indexOf('"', contentIdx + 12);
        console.log(id, '->', content.substring(contentIdx, endIdx + 50));
    }
}
