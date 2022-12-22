const fs = require('fs');

const dict = {};

const evaluate = (exp) => {
    const isInt = Number.isInteger(+exp);
    if (isInt) {
        return exp;
    } else {
        const expAsArray = exp.trim().split(' ')
        const fromDictLeft = dict[expAsArray[0]];
        const fromDictRight = dict[expAsArray[2]];

        if (fromDictRight == null || fromDictLeft == null) {
            console.log('l, r', fromDictLeft, fromDictRight)
            return
        }

        return '(' + evaluate(fromDictLeft)
            + ' ' + expAsArray[1] + ' '
            + evaluate(fromDictRight) + ')'

    }
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const input = data.trim()
        .split("\n\n")
        .map(i => i.trim()
            .split(/\r?\n/)
            .map(i => i.trim().split(":"))
        )[0];

    input.forEach(pair => dict[pair[0]] = pair[1])

    console.log('PART 1: root monkey will yell ', eval(evaluate(dict['root'])));

    console.log('PART 2: I should yell');

});
