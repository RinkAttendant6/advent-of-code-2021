import process from 'node:process';
import { parseInput } from '../common/utils.js';

const input = parseInput(process.argv[2]).map((line) =>
    line.split('').map(Number)
);

/**
 * Recursively flashes an octopus
 * @param grid Grid
 * @param flashed History of flashes for current step
 * @param x
 * @param y
 */
const flashOctopus = (
    grid: number[][],
    flashed: string[],
    x: number,
    y: number
): void => {
    if (flashed.includes(x + ' ' + y)) {
        return;
    }

    flashed.push(x + ' ' + y);

    for (let dx = -1; dx <= 1; ++dx) {
        for (let dy = -1; dy <= 1; ++dy) {
            if (
                x + dx < 0 ||
                y + dy < 0 ||
                x + dx >= grid.length ||
                y + dy >= grid[0].length
            ) {
                // out of bounds
                continue;
            }

            grid[x + dx][y + dy]++;

            if ((dx || dy) && grid[x + dx][y + dy] > 9) {
                flashOctopus(grid, flashed, x + dx, y + dy);
            }
        }
    }
};

const part1 = ((grid, steps = 100) => {
    let flashes = 0;

    for (let step = 1; step <= steps; step++) {
        // Increment all cells
        grid = grid.map((row) => row.map((cell) => ++cell));

        // Flash
        const flashed: string[] = [];

        grid.forEach((row, x) =>
            row.forEach((cell, y) => {
                if (cell > 9) {
                    flashOctopus(grid, flashed, x, y);
                }
            })
        );

        // Reset
        grid = grid.map((row) => row.map((cell) => (cell > 9 ? 0 : cell)));

        flashes += flashed.length;
    }

    return flashes;
})(input.map((x) => [...x]));

const part2 = ((grid) => {
    for (let step = 1; true; ++step) {
        const flashed: string[] = [];

        // Increment all cells
        grid = grid.map((row) => row.map((cell) => ++cell));

        grid.forEach((row, x) =>
            row.forEach((cell, y) => {
                if (cell > 9) {
                    flashOctopus(grid, flashed, x, y);
                }
            })
        );

        // Reset
        grid = grid.map((row) => row.map((cell) => (cell > 9 ? 0 : cell)));

        if (grid.every((row) => row.every((cell) => cell === 0))) {
            return step;
        }
    }
})(input.map((x) => [...x]));

console.log({ part1, part2 });
