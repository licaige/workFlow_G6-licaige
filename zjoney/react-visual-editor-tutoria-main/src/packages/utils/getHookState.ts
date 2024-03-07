import {defer} from "./defer";

export function getHookState<Setter extends (val: (current: any) => any) => void>(setter: Setter) {
    const dfd = defer<ReturnType<Parameters<typeof setter>[0]>>()
    setter((current) => {
        dfd.resolve(current)
        return current
    })
    return dfd.promise
}

