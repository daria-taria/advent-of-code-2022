/**
 * The winner of the whole tournament is the player with the highest score.
 * Your total score is the sum of your scores for each round.
 * The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
 * plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
 */

function roundScoreBasedValueEncoded(input)  {
    switch (input[1]) {
        case 'X': return 1 + (input[0] ==='A' ? 3 : input[0] ==='B' ? 0 : 6);
        case 'Y': return 2 + (input[0] ==='A' ? 6 : input[0] ==='B' ? 3 : 0);
        case 'Z': return 3 + (input[0] ==='A' ? 0 : input[0] ==='B' ? 6 : 3);
    }
    return 0;
}

function roundScoreResultEncoded(input)  {
    switch (input[1]) {
        case 'X': return 0 + (input[0] ==='A' ? 3 : input[0] ==='B' ? 1 : 2);
        case 'Y': return 3 + (input[0] ==='A' ? 1 : input[0] ==='B' ? 2 : 3);
        case 'Z': return 6 + (input[0] ==='A' ? 2 : input[0] ==='B' ? 3 : 1);
    }
    return 0;
}

const fs = require('fs');
fs.readFile('input2.txt', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const inputArray = data.split(/\r?\n/)

    let score = 0;

    inputArray.forEach(pair => {
        score = score + roundScoreResultEncoded(pair.split(' '))
    })

    console.log(score);
});