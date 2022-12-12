const fs = require('fs');

const transformToPosition = (rowIndex, columnIndex) => {
    return +((rowIndex * 100).toString() + columnIndex)
}
const pathExists = (letter1, letter2) => {
    letter1 = letter1 === 'S' ? 'a' : letter1 === 'E' ? 'z' : letter1;
    letter2 = letter2 === 'S' ? 'a' : letter2 === 'E' ? 'z' : letter2;
    return letter2.charCodeAt() - letter1.charCodeAt() < 2;
}

const bfs = (graph, start, end) => {

    let queue = [[start, []]],
        seen = new Set;

    while (queue.length) {
        let [curVert, [...path]] = queue.shift();
        path.push(curVert);
        if (curVert === end) {
            return path;
        }

        if (!seen.has(curVert) && graph.get(curVert)) {
            queue.push(...graph.get(curVert).map(v => [v, path]));
        }
        seen.add(curVert);
    }

    return null;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data
        .split(/\r?\n/)
        .map(i => {
            return i.split('')
        });

    const rowLength = input[0].length;
    const columnLength = input.length;

    const graph = new Map();
    let start;
    let end;
    const possibleStartingPoints = [];

    input.forEach((row, rowIndex) => {
        row.forEach(
            (letter, columnIndex) => {
                const connections = [];

                if (letter === 'S') {
                    const startIndex = transformToPosition(rowIndex, columnIndex);
                    start = startIndex;
                    possibleStartingPoints.push(startIndex)
                }

                if (letter === 'a') {
                    const startIndex = transformToPosition(rowIndex, columnIndex);
                    possibleStartingPoints.push(startIndex)
                }

                if (letter === 'E') {
                    end = transformToPosition(rowIndex, columnIndex);
                }

                if (columnIndex !== 0) {
                    const letterBefore = input[rowIndex][columnIndex - 1]
                    if (pathExists(letter, letterBefore)) {
                        connections.push(transformToPosition(rowIndex, columnIndex - 1));
                    }
                }
                if (columnIndex !== rowLength - 1) {
                    const letterAfter = input[rowIndex][columnIndex + 1];
                    if (pathExists(letter, letterAfter)) {
                        connections.push(transformToPosition(rowIndex, columnIndex + 1));
                    }
                }
                if (rowIndex !== 0) {
                    const letterAbove = input[rowIndex - 1][columnIndex]
                    if (pathExists(letter, letterAbove)) {
                        connections.push(transformToPosition(rowIndex - 1, columnIndex));
                    }
                }
                if (rowIndex !== columnLength - 1) {
                    let letterBelow = input[rowIndex + 1][columnIndex]
                    if (pathExists(letter, letterBelow)) {
                        connections.push(transformToPosition(rowIndex + 1, columnIndex));
                    }
                }

                graph.set(transformToPosition(rowIndex, columnIndex), connections)
            })
    })

    console.log('PART 1', bfs(graph, start, end).length - 1);

    console.log('PART 2',
        Math.min(...
            possibleStartingPoints
                .map(s => bfs(graph, s, end))
                .filter(s => s != null)
                .map(m => m.length - 1)
        ));

});
