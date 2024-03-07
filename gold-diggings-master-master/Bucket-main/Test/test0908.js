function equal(a, b, c) {
    if (a === b && b === c) {
        return "equal"
    } else {
        return "notequal"
    }
}
console.log(equal(1, 2, 3));
console.log(equal(1, 1, 1));