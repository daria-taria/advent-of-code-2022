const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data.split(/\r?\n/)

    const emptyLineIndex = input.findIndex(e => e === '')

    let instructions = input.slice(emptyLineIndex + 1);

    /** move-from-to */
    instructions = instructions
        .map(i => i
            .replace(/\D/g, ' ')
            .trim()
            .split(/\s+/)
            .map(i => +i));

    let rows = input.slice(0, emptyLineIndex);

    const numberOfPiles = +rows.pop().trim().split(/\s+/).pop();

    rows = rows.map(p => p
        .replaceAll('    ', '.')
        .replaceAll('[', '')
        .replaceAll(']', '')
        .replaceAll(' ', '')
    )

    for (var i = 0, piles = []; i < numberOfPiles; piles[i++] = []) ;
    rows.forEach(r => {
        for (const [i, value] of r.split('').entries()) {
            if (value !== '.') {
                piles[i].unshift(value)
            }
        }
    })

    instructions.forEach(instr => {
        /** part 1 - one by one */
        /**
         for (let i = 0; i < instr[0]; i++) {
            piles[instr[2] - 1].push(piles[instr[1] - 1].pop())
        }
         */

        /** part 2 - as a whole */
        piles[instr[2] - 1].push(...piles[instr[1] - 1].splice(-Math.abs(instr[0])))
    })

    console.log(piles.map(p => p.pop()))
});