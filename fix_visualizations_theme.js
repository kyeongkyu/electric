import fs from 'fs';

const filePath = 'components/Visualizations.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// First, some specific cleanup. Some places might already have dark: variants.
// We only want to target hardcoded dark classes that DON'T have dark: prefixes.

// Replace `bg-slate-900` with `bg-slate-50 dark:bg-slate-900` 
// but avoid if it's already preceded by something or is inside a gradient like from-slate-900!
content = content.replace(/(?<!from-|via-|to-|dark:)\bbg-slate-900\b/g, 'bg-slate-50 dark:bg-slate-900');

// Replace `bg-slate-800` -> `bg-slate-100 dark:bg-slate-800`
content = content.replace(/(?<!from-|via-|to-|dark:)\bbg-slate-800(?!(\/[0-9]+)? dark:)/g, 'bg-slate-100 dark:bg-slate-800');

// Replace `border-slate-800` -> `border-slate-200 dark:border-slate-800`
content = content.replace(/(?<!from-|via-|to-|dark:)\bborder-slate-800\b/g, 'border-slate-200 dark:border-slate-800');

// Replace `border-slate-700` -> `border-slate-300 dark:border-slate-700`
content = content.replace(/(?<!from-|via-|to-|dark:)\bborder-slate-700\b/g, 'border-slate-300 dark:border-slate-700');

// Refine text-white. Sometimes it's text-white/90. 
// We want `text-slate-900 dark:text-white/90` or `text-slate-900 dark:text-white`.
// But wait, what if `text-white` is used inside a colored badge? E.g., `bg-blue-500 text-white`.
// If we change it to text-slate-900, it will be unreadable on blue background!
// Let's only replace text-white and text-white/* when it's NOT in the same class string as bg-blue-*, bg-rose-*, bg-sky-*, etc.
// But this is too complex for simple regex. Instead of global text-white replacement, let's target `text-slate-400`, `text-slate-300` which are generally used as text colors.

content = content.replace(/(?<!dark:)\btext-slate-400\b/g, 'text-slate-600 dark:text-slate-400');
content = content.replace(/(?<!dark:)\btext-slate-300\b/g, 'text-slate-700 dark:text-slate-300');

// For text-white/90 which is specifically used for headings.
content = content.replace(/(?<!dark:)\btext-white\/90\b/g, 'text-slate-900 dark:text-white/90');

// For specific text-white that are headings or main descriptions, but not in badges.
// Looking at the code, typical heading: <h4 className="text-white font-bold ...
// It's safer to leave text-white alone unless it's an issue. 
// Actually, `text-white` on `bg-slate-50` is completely invisible! This is a BIG issue.
// Let's manually write a regex to replace `text-white` with `text-slate-900 dark:text-white` 
// ONLY if the class string ALSO contains `bg-slate-50` or `bg-slate-100`, OR if it's near `bg-slate-900/50`.

fs.writeFileSync(filePath, content);
console.log('Done basic replacement');
