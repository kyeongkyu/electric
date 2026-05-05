import fs from 'fs';

const filePath = 'components/Visualizations.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Convert any standalone text-white that represents main text to be theme-aware.
// Heuristic: if it's text-white and NOT part of an icon badge (bg-red, bg-blue etc.)
// A common structure is: <span className="... text-white ...">
content = content.replace(/(class|className)=["']([^"']*\btext-white\b(?:(?!\bbg-(?:red|blue|green|sky|amber|rose|violet|fuchsia|emerald|teal|orange|pink|yellow)\b).)*)["']/g, (match) => {
    // replace text-white with text-slate-900 dark:text-white
    return match.replace(/\btext-white\b/g, 'text-slate-900 dark:text-white');
});

// 2. We replace the main backgrounds
content = content.replace(/(?<!from-|via-|to-|dark:)\bbg-slate-900(?!(\/[0-9]+)? dark:)/g, 'bg-slate-50 dark:bg-slate-900');
content = content.replace(/(?<!from-|via-|to-|dark:)\bbg-slate-800(?!(\/[0-9]+)? dark:)/g, 'bg-slate-100 dark:bg-slate-800');
content = content.replace(/(?<!from-|via-|to-|dark:)\bborder-slate-800\b/g, 'border-slate-200 dark:border-slate-800');
content = content.replace(/(?<!from-|via-|to-|dark:)\bborder-slate-700\b/g, 'border-slate-300 dark:border-slate-700');
content = content.replace(/(?<!dark:)\btext-slate-400\b/g, 'text-slate-600 dark:text-slate-400');
content = content.replace(/(?<!dark:)\btext-slate-300\b/g, 'text-slate-700 dark:text-slate-300');
content = content.replace(/(?<!dark:)\btext-white\/90\b/g, 'text-slate-900 dark:text-white/90');
content = content.replace(/(?<!dark:)\btext-white\/70\b/g, 'text-slate-700 dark:text-white/70');
content = content.replace(/(?<!dark:)\btext-white\/50\b/g, 'text-slate-500 dark:text-white/50');

// Additional UI Polishes! Let's make all Visualizations a bit more animated and beautiful.
// Any div that has `ring-white/10` should also be `ring-black/5 dark:ring-white/10`
content = content.replace(/\bring-white\/10\b/g, 'ring-black/5 dark:ring-white/10');

fs.writeFileSync(filePath, content);
console.log('Advanced replacements saved.');
