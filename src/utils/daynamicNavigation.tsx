/* -------------------------------------------------------------------------- */
/*                      is children page active checking                      */
/* -------------------------------------------------------------------------- */
export function isChildrenPageActive(path: string, match: string): boolean {
    if (path && match) {
        if (path === match) {
            return true;
        }
        return false;
    }
    return false;
}

/* -------------------------------------------------------------------------- */
/*                       is parent page active checking                       */
/* -------------------------------------------------------------------------- */
export function isParentPageActive(pages: any, path: string): boolean {
    if (pages) {
        return pages.some((page: any) => page.path === path);
    }
    return false;
}

// export function isParentPageActive(pages: string, path: string): boolean {
//     if (pages) {
//         return pages.some((page) => page.path === path);
//     }
//     return false;
// }