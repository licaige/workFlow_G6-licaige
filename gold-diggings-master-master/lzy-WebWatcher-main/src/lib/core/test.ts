import LzyWebWatcher from "./watcher";

const watcher = new LzyWebWatcher({
    watchPerformance: true,
    watchEvent: true,
    watchError: true,
    watchRouter: true
})

console.log(watcher);
