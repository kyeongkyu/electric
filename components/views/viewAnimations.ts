export const staggerContainer = {
 hidden: { opacity: 0 },
 show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export const staggerItem = {
 hidden: { opacity: 0, scale: 0.95, y: 15 },
 show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};
