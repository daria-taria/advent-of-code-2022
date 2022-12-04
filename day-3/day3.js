const fs = require('fs');

function findDuplicateItem(itemsInRucksack) {
    const numberOfItems = itemsInRucksack.length
    const firstCompartment = itemsInRucksack.substring(0, numberOfItems / 2).split('')
    const secondCompartment = itemsInRucksack.substring(numberOfItems / 2).split('')
    return firstCompartment.find(letter => secondCompartment.includes(letter))
}

function getPriority(letter) {
    const isUppercase = letter === letter.toUpperCase();
    let letterPriority = letter.toLowerCase().charCodeAt(0) - 96;
    return isUppercase ? (letterPriority + 26) : letterPriority;
}

function findCommonItem(itemsPerGroup) {
    const items1 = itemsPerGroup[0].split('')
    const items2 = itemsPerGroup[1].split('')
    const items3 = itemsPerGroup[2].split('')
    return items1.filter(letter => items2.includes(letter) && items3.includes(letter))[0];
}

function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}


fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const inputArrayWithElfes = data.split(/\r?\n/)
    const inputArrayWithElfGroups = spliceIntoChunks(inputArrayWithElfes, 3);

    let sumOfPrioritiesPerElf = 0;
    let sumOfPrioritiesPerGroup = 0;

    /** part1 */
    inputArrayWithElfes.forEach(itemsPerRucksack => {
        sumOfPrioritiesPerElf = sumOfPrioritiesPerElf + getPriority(findDuplicateItem(itemsPerRucksack.toString()))
    })

    /** part2 */
    inputArrayWithElfGroups.forEach(itemsPerGroup => {
        sumOfPrioritiesPerGroup = sumOfPrioritiesPerGroup + getPriority(findCommonItem(itemsPerGroup));
    })

    console.log(sumOfPrioritiesPerGroup)

});