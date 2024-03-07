import React from "react"
import User from "./User"

const Us = React.lazy(()=>import("one/xx"))
const Gooodss = React.lazy(()=>import("one/goods"))

let App = () => {
    return (
        <div>
            <h3>webpack55</h3>
            <User/>
            <React.Suspense fallback="Loading app">
                <Us />
                <Gooodss />
            </React.Suspense>
        </div>
    )
}
export default App;

