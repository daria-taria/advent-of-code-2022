const fs = require('fs');

function getIndexAfterFirstNonDuplicateSequence(data, numberOfNonDuplicates) {
    for (let i = numberOfNonDuplicates - 1; i < data.length - 1; i++) {
        if (!/(.).*\1/.test(data.substring(i - numberOfNonDuplicates + 1, i + 1))) {
            return i + 1
        }
    }
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    console.log(getIndexAfterFirstNonDuplicateSequence(data, 14))
});
