const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const inputArray = data.split(/\r?\n/)

    const arrayOfArrays = inputArray.reduce((resultArray, item) => {

        if (item === '') {
            resultArray.push([]);
        } else {
            resultArray[resultArray.length - 1].push(+item)
        }

        return resultArray
    }, [[]])

    const arrayOfSums = arrayOfArrays.map(array => array.reduce((a, b) => a + b, 0));

    console.log(Math.max(...arrayOfSums));

    /** part 2 */

    const sortedArray = arrayOfSums.sort((a, b) => b - a).slice(0, 3);
    console.log(sortedArray.slice(0, 3).reduce((a, b) => a + b, 0))
});