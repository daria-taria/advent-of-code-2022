const fs = require('fs');

const Directions = {
    Right: 'R',
    Left: 'L',
    Up: 'U',
    Down: 'D'
}

let positionsVisitedByTail = [[0, 0]];

/** head - ... - tail */
const positionsOfKnots = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

followPreviousNode = (headIndex, tailIndex) => {

    const verticalGap = positionsOfKnots[headIndex][1] - positionsOfKnots[tailIndex][1];
    const horizontalGap = positionsOfKnots[headIndex][0] - positionsOfKnots[tailIndex][0];

    if (Math.abs(verticalGap) > 1) {
        positionsOfKnots[tailIndex][1] = positionsOfKnots[tailIndex][1] + Math.sign(verticalGap);
        positionsOfKnots[tailIndex][0] = Math.abs(horizontalGap) > 1 ?
            positionsOfKnots[tailIndex][0] + Math.sign(horizontalGap) :
            positionsOfKnots[headIndex][0]

    } else if (Math.abs(horizontalGap) > 1) {
        positionsOfKnots[tailIndex][0] = positionsOfKnots[tailIndex][0] + Math.sign(horizontalGap);
        positionsOfKnots[tailIndex][1] = positionsOfKnots[headIndex][1]

    } else {
        return;
    }

    if (tailIndex === positionsOfKnots.length - 1) {
        positionsVisitedByTail.push([...positionsOfKnots[tailIndex]])
    } else {
        followPreviousNode(tailIndex, tailIndex + 1)
    }
}

move = (direction) => {
    const positionHead = positionsOfKnots[0];

    switch (direction) {
        case Directions.Right:
            positionHead[0] = positionHead[0] + 1;
            break;
        case Directions.Left:
            positionHead[0] = positionHead[0] - 1;
            break;
        case Directions.Up:
            positionHead[1] = positionHead[1] + 1;
            break;
        case Directions.Down:
            positionHead[1] = positionHead[1] - 1;
            break;
    }

    followPreviousNode(0, 1);
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const instructions = data.split(/\r?\n/).map(a => a.split(' '));
    instructions.forEach(instr => {

        for (var i = 0; i < +instr[1]; i++) {
            move(instr[0]);
        }
    })

    positionsVisitedByTail = positionsVisitedByTail.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t[0] === value[0] && t[1] === value[1]
            ))
    )

    console.log(positionsVisitedByTail.length)

});
