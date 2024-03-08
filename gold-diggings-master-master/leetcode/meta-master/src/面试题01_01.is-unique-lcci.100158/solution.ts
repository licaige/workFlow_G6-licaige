function isUnique (astr: string): boolean {
    const set = new Set<string>();
    for (const char of astr) {
        if (set.has(char)) {
            return false;
        }
        set.add(char);
    }
    return true;
}
