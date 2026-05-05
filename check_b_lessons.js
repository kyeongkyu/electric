import fs from 'fs';
const content = fs.readFileSync('data/content.ts', 'utf8');
const ids = [...content.matchAll(/"id": "(ctf-b[2-9]-\d+)"/g)].map(m => m[1]);
console.log('Total:', ids.length);
console.log('Sample:', ids.slice(0, 15).join(', '));
const grouped = {};
for(const id of ids) {
    const prefix = id.split('-').slice(0,2).join('-');
    grouped[prefix] = (grouped[prefix] || 0) + 1;
}
console.log(grouped);
