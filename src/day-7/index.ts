import fs from 'node:fs';

const input = fs
    .readFileSync(process.argv[2], 'utf-8')
    .trim()
    .split(',')
    .map(Number);

const min = Math.min(...input);
const max = Math.max(...input);

const part1 = ((input) => {
    const fuelCosts = [];

    for (let pos = min; pos <= max; ++pos) {
        fuelCosts[pos] = input.reduce((acc, x) => acc + Math.abs(x - pos), 0);
    }

    return Math.min(...fuelCosts);
})(input);

const part2 = ((input) => {
    const fuelCosts = [];

    for (let pos = min; pos <= max; ++pos) {
        fuelCosts[pos] = input.reduce((acc, x) => {
            let fuel = 0;
            const movement = Math.abs(x - pos);
            for (let step = 0; step <= movement; step++) {
                fuel += step;
            }
            return acc + fuel;
        }, 0);
    }

    return Math.min(...fuelCosts);
})(input);

console.log({ part1, part2 });
