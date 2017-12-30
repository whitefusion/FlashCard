export const generateDeckId = () => (Math.random().toString(36))
export const generateCardId = () => (Math.random().toString(36))
export const partial = (fn, ...args) => fn.bind(null,...args)