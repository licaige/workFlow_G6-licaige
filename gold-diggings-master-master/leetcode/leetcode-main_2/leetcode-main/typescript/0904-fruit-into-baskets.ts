function totalFruit(fruits: number[]): number {
    let count = new Map();
    let [left, total, res] = [0, 0, 0];

    for (let fruit of fruits) {
        count.set(fruit, (count.get(fruit) || 0) + 1);
        total++;

        while (count.size > 2) {
            let f = fruits[left];
            count.set(f, count.get(f) - 1);
            total--;
            left++;
            if (!count.get(f)) {
                count.delete(f);
            }
        }

        res = Math.max(res, total);
    }

    return res;
}
