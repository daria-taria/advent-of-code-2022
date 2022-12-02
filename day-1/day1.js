/**
 * The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line.
 * Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.
 * In case the Elves get hungry and need extra snacks, they need to know which Elf to ask:
 * they'd like to know how many Calories are being carried by the Elf carrying the most Calories.
 */

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

    /**
     * Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
     */

    const sortedArray = arrayOfSums.sort((a, b) => b - a).slice(0, 3);
    console.log(sortedArray.slice(0, 3).reduce((a, b) => a + b, 0))
});