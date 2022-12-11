const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data
        .split("\n\n")
        .map(d => d.split("\n")
            .slice(1)
            .map(v => v.trim())
            .map(v => {
                    if (v.startsWith('Operation')) {
                        return v.split('= ')[1]
                    } else {
                        return v.split(/[ ,]+/)
                            .filter(e => !isNaN(e))
                            .map(e => +e)
                    }
                }
            ))

    input.forEach(i => i.push(0))

    const commonMultiple = input.map(i => i[2]).flat().reduce((a, b) => a * b)

    for (var i = 0; i < 10000; i++) {

        input.forEach(monkeyInfo => {

            monkeyInfo[0].forEach(old => {

                const newWorryLevel = eval(monkeyInfo[1]);

                const newMonkeyItems = newWorryLevel % monkeyInfo[2] === 0 ?
                    input[monkeyInfo[3]][0] :
                    input[monkeyInfo[4]][0];

                newMonkeyItems.push(newWorryLevel % commonMultiple)

                monkeyInfo[5] = monkeyInfo[5] + 1;
            })

            monkeyInfo[0] = [];
        })
    }

    const sortedMonkeys = input.map(i => i[5]).sort((a, b) => b - a)

    console.log(sortedMonkeys[0] * sortedMonkeys[1])

});
