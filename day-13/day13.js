const fs = require('fs');

const orderIsCorrect = (left, right) => {

    if (Number.isInteger(left) && Number.isInteger(right) && left !== right) {
        return left < right;

    } else if (Array.isArray(left) && Array.isArray(right)) {

        if (left.length === 0 && right.length === 0) {
            return undefined;
        }

        if (left.length === 0) {
            return true;

        } else if (right.length === 0) {
            return false;

        } else {

            const isCorrectForTheFirstElm = orderIsCorrect(left[0], right[0]);

            return !!isCorrectForTheFirstElm === isCorrectForTheFirstElm ?
                isCorrectForTheFirstElm :
                orderIsCorrect(left.slice(1), right.slice(1));
        }

    } else if (Array.isArray(left)) {
        return orderIsCorrect(left, [right])

    } else if (Array.isArray(right)) {
        return orderIsCorrect([left], right)
    }
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data.trim()
        .split("\n\n")
        .map(i => {
            return i.trim().split(/\r?\n/).map(i => eval(i.trim()))
        });

    const input2 = data.trim()
        .split(/\r?\n/)
        .map(i => eval(i.trim()))
        .filter(e => e);

    const indexesOfCorrectPairs = [];

    input.forEach((pair, index) => {
        if (orderIsCorrect(pair[0], pair[1])) {
            indexesOfCorrectPairs.push(index + 1)
        }
    })

    const sortedArray = input2.sort((a, b) => orderIsCorrect(a, b) ? -1 : 1);
    const index1 = sortedArray.findIndex(x => x.length === 1 && x[0].length === 1 && x[0][0] === 2) + 1;
    const index2 = sortedArray.findIndex(x => x.length === 1 && x[0].length === 1 && x[0][0] === 6) + 1;

    console.log('PART 1: indexes of correct pairs', indexesOfCorrectPairs.reduce((partialSum, a) => partialSum + a, 0));
    console.log('PART 2: multiply indexes of two divider packets', index1, index2, index1 * index2);

});
