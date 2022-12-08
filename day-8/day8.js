const fs = require('fs');

transpose = m => m[0].map((x, i) => m.map(x => x[i]))

isUniqueMax = (value, arr) => value === Math.max(...arr) && arr.filter(a => a === value).length === 1;

getNumberOfVisible = (value, array) => {
    let counter = 0;
    for (const i in array) {
        if (value > array[i]) {
            counter = counter + 1
        } else {
            counter = counter + 1;
            return counter;
        }
    }
    return counter;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data.split(/\r?\n/).map(a => a.split('').map(b => +b));
    const transposedInput = transpose(input);

    /** part 1 */

    /**

     let numberVisible = 0

     input.forEach((treesInRow, columnIndex) => {

        treesInRow.forEach((tree, rowIndex) => {
            if (isUniqueMax(tree, treesInRow.slice(0, rowIndex + 1)) ||
                isUniqueMax(tree, treesInRow.slice(rowIndex)) ||
                isUniqueMax(tree, transposedInput[rowIndex].slice(0, columnIndex + 1)) ||
                isUniqueMax(tree, transposedInput[rowIndex].slice(columnIndex))) {
                numberVisible = numberVisible + 1
            }
        })
    })
     console.log(numberVisible)

     */


    /** part 2 */

    let visiblityFromTrees = [];

    input.forEach((treesInRow, columnIndex) => {

        treesInRow.forEach((tree, rowIndex) => {

            if (columnIndex === 0 ||
                rowIndex === 0 ||
                columnIndex === input.length - 1 ||
                rowIndex === treesInRow.length - 1) {
                visiblityFromTrees.push(0);
            } else {
                const up = getNumberOfVisible(tree, transposedInput[rowIndex].slice(0, columnIndex).reverse())
                const down = getNumberOfVisible(tree, transposedInput[rowIndex].slice(columnIndex + 1))
                const left = getNumberOfVisible(tree, treesInRow.slice(0, rowIndex).reverse())
                const right = getNumberOfVisible(tree, treesInRow.slice(rowIndex + 1))
                visiblityFromTrees.push(up * down * right * left)
            }
        })
    })

    console.log(Math.max(...visiblityFromTrees))
});
