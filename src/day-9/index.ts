import process from 'node:process';
import { parseInput } from '../common/utils.js';

type Coordinate = [number, number];

const input = parseInput(process.argv[2]).map((line) =>
    line.split('').map(Number)
);

const part1 = ((input) => {
    const lowPoints: Coordinate[] = [];

    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[i].length; ++j) {
            const value = input[i][j];
            if (
                value < (input[i - 1]?.[j] ?? Infinity) &&
                value < (input[i + 1]?.[j] ?? Infinity) &&
                value < (input[i][j - 1] ?? Infinity) &&
                value < (input[i][j + 1] ?? Infinity)
            ) {
                lowPoints.push([i, j]);
            }
        }
    }

    return lowPoints.reduce((acc, point) => {
        const [x, y] = point;
        return acc + input[x][y] + 1;
    }, 0);
})(input);

const part2 = ((input) => {
    const basins: number[][] = Array(input.length)
        .fill(null)
        .map(() => Array(input[0].length).fill(undefined));

    const traverse = (currentCounter: number, x: number, y: number): number => {
        if (
            x < 0 ||
            y < 0 ||
            x >= input.length ||
            y >= input[0].length ||
            basins[x][y]
        ) {
            // out of bounds or already checked
            return 0;
        }

        if (input[x][y] == 9) {
            // mountain
            basins[x][y] = 0;
            return 0;
        }

        basins[x][y] = currentCounter;

        return (
            1 +
            traverse(currentCounter, x + 1, y) +
            traverse(currentCounter, x - 1, y) +
            traverse(currentCounter, x, y + 1) +
            traverse(currentCounter, x, y - 1)
        );
    };

    const counters = [];
    let counter = 1;

    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[i].length; ++j) {
            const basinSize = traverse(counter, i, j);
            if (basinSize) {
                counters[counter] = basinSize;
                ++counter;
            }
        }
    }

    return counters
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, x) => acc * x, 1);
})(input);

console.log({ part1, part2 });
