function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph = createGraph(numCourses, prerequisites);
    let seen = new Set();
    let seeing = new Set();

    function explore(course: number): boolean {
        if (seen.has(course)) {
            return true;
        }
        if (seeing.has(course)) {
            return false;
        }

        seeing.add(course);
        for (let neighbor of graph[course]) {
            if (!explore(neighbor)) {
                return false;
            }
        }

        seen.add(course);
        seeing.delete(course);
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!explore(i)) {
            return false;
        }
    }
    return true;
}

function createGraph(numCourses: number, edges: number[][]): number[][] {
    const graph = Array.from({ length: numCourses }, () => []);

    for (let edge of edges) {
        let [a, b] = edge;

        if (!(a in graph)) {
            graph[a] = [];
        }
        if (!(b in graph)) {
            graph[b] = [];
        }
        graph[a].push(b);
    }
    return graph;
}
