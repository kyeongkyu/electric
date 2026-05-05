const fs = require('fs');

const filePaths = ['./app/page.tsx', './components/Navigation.tsx', './components/MarkdownRenderer.tsx', './components/Visualizations.tsx'];

const replacements = [
  [/bg-slate-50/g, 'bg-slate-50 dark:bg-black'],
  [/bg-white/g, 'bg-white dark:bg-black'],
  [/bg-slate-100/g, 'bg-slate-100 dark:bg-slate-900'],
  [/border-slate-100/g, 'border-slate-100 dark:border-slate-800'],
  [/border-slate-200/g, 'border-slate-200 dark:border-slate-800'],
  [/text-slate-900/g, 'text-slate-900 dark:text-gray-100'],
  [/text-slate-800/g, 'text-slate-800 dark:text-gray-200'],
  [/text-slate-700/g, 'text-slate-700 dark:text-gray-300'],
  [/text-slate-600/g, 'text-slate-600 dark:text-gray-400'],
  [/text-slate-500/g, 'text-slate-500 dark:text-gray-500'],
  [/text-slate-400/g, 'text-slate-400 dark:text-gray-600'],
];

filePaths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Prevent double replacements if already added
    content = content.replace(/dark:bg-black/g, '');
    content = content.replace(/dark:bg-slate-900/g, '');
    content = content.replace(/dark:border-slate-800/g, '');
    content = content.replace(/dark:text-gray-\d00/g, '');
    content = content.replace(/dark:text-white/g, '');
    content = content.replace(/dark:text-slate-\d00/g, '');

    // cleanup any loose spaces created by removal
    content = content.replace(/  +/g, ' ');

    replacements.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
});
