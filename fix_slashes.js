const fs = require('fs');
let content = fs.readFileSync('data/content.ts', 'utf8');

// The file currently contains literal '\' followed by 'n'.
// We want to replace it with '\n' (which in TS evaluates to a newline).
// Wait, we WANT the TS file to contain exactly one '\' and one 'n'.
// Right now it contains two '\' and one 'n'.
// So we replace '\\n' with '\n'.
content = content.replace(/\\\\n/g, '\\n');

fs.writeFileSync('data/content.ts', content);
console.log('Fixed double backslashes in content.ts');
