export const generateId = () => (Math.random().toString(36))
export const partial = (fn, ...args) => fn.bind(null,...args)