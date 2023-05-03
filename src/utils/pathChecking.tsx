export default function pathChecking(path: string, match: string): boolean {
    if (path && match) {
        if (path === match) {
            return true;
        }
        return false;
    }
    return false;
}
