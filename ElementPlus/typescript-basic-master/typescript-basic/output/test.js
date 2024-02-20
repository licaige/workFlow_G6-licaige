var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function isString(value) {
    return (typeof value === 'string') || (value instanceof String);
}
export function isNumber(value) {
    return (typeof value === 'number') || (value instanceof Number);
}
export function isArray(value) {
    return Array.isArray(value);
}
export function copyArray(value) {
    return __spreadArrays(value);
}
