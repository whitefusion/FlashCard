export const generateDeckId = () => (Math.random().toString(36).substr(2, 22))
export const generateCardId = () => (Math.random().toString(36).substr(2, 21))
export const partial = (fn, ...args) => fn.bind(null,...args)