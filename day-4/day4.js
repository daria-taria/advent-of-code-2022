const fs = require('fs');

/** part 1 */
hasFullOverlap = (array) => {
    const start1 = +array[0];
    const end1 = +array[1];
    const start2 = +array[2];
    const end2 = +array[3];
    return ((start1 <= start2 && end1 >= end2) || (start1 >= start2 && end1 <= end2));
}

/** part 2 */
hasSomeOverlap = (array) => {
    const start1 = +array[0];
    const end1 = +array[1];
    const start2 = +array[2];
    const end2 = +array[3];
    return ((start1 <= start2 && end1 >= start2) || (start2 <= start1 && end2 >= start1));
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const inputAssignments = data.split(/\r?\n/)
    let numberOfFullOverlaps = 0;
    inputAssignments.forEach(i => numberOfFullOverlaps = numberOfFullOverlaps + (hasSomeOverlap(i.split(/,|-/)) ? 1 : 0));

    console.log(numberOfFullOverlaps)

});