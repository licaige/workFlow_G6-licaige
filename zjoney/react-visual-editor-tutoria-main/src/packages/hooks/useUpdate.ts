import {useCallback, useState} from "react";

export function useUpdate() {
    const [count, setCount] = useState(0)
    return useCallback(() => setCount(count + 1), [count])
}