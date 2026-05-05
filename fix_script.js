const fs = require('fs');
let fileContent = fs.readFileSync('data/content.ts', 'utf8');

// The file syntax is totally mangled for b2 and b3. 
// I need to roll it back from git, and then apply b2 and b3 using a better script!
