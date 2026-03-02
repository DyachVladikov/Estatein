export function img(path: string) {
    let currentPath 
    path.startsWith('/') ?  currentPath = path.slice(1) : currentPath = path
    
    return `${import.meta.env.BASE_URL}${currentPath}`
}