import process from 'node:process';
import { parseInput } from '../common/utils.js';

const input = parseInput(process.argv[2]).map((n) => [...n].map(Number));

/**
 * Find the path of least risk using Djikstra's algorithm
 * @param input Grid
 */
const runJockstrap = (input: number[][]): number => {
    console.time('jockstrap');

    const height = input.length;
    const width = input[0].length;

    const coordinatesToId = (x: number, y: number) => x * width + y;

    const flatInput = input.flat();
    const jockstrap = Array(height * width).fill(Infinity);
    const visited = Array(height * width).fill(false);

    const destinationId = height * width - 1;

    let currentId = 0;
    jockstrap[currentId] = 0;

    for (let i = 0; i < height * width && !visited[destinationId]; ++i) {
        const [x, y] = [Math.floor(currentId / width), currentId % width];

        const adjacent = [
            x > 0 && coordinatesToId(x - 1, y),
            y > 0 && coordinatesToId(x, y - 1),
            x < height - 1 && coordinatesToId(x + 1, y),
            y < width - 1 && coordinatesToId(x, y + 1),
        ];

        for (const adjacentId of adjacent) {
            if (adjacentId) {
                jockstrap[adjacentId] = Math.min(
                    jockstrap[adjacentId],
                    jockstrap[currentId] + flatInput[adjacentId]
                );
            }
        }

        visited[currentId] = true;

        // Find smallest distance unvisited
        // cannot use Math.max(...values) due to call stack size
        // https://stackoverflow.com/q/42623071/404623

        const smallestUnvisitedDistance = jockstrap.reduce(
            (min, distance, idx) =>
                !visited[idx] && distance < min ? distance : min,
            Infinity
        );

        currentId = jockstrap.findIndex(
            (cell, idx) => cell === smallestUnvisitedDistance && !visited[idx]
        );

        if (i % ((height * width) / 10) === 0) {
            console.debug({
                computed: i,
                progress: Math.fround((i / (height * width)) * 100),
            });
            console.timeLog('jockstrap');
        }
    }

    console.timeEnd('jockstrap');
    return jockstrap[destinationId];
};

const part1 = runJockstrap(input);

const part2 = ((input) => {
    const originalHeight = input.length;
    const originalWidth = input[0].length;

    const fullMap = Array(originalHeight * 5)
        .fill(null)
        .map((_) => Array(originalWidth * 5).fill(undefined));

    // extend horizontally
    for (let i = 0; i < originalHeight; ++i) {
        for (let j = 0; j < originalWidth; ++j) {
            for (let k = 0; k < 5; ++k) {
                let value = k
                    ? fullMap[i][j + originalWidth * (k - 1)] + 1
                    : input[i][j];
                if (value > 9) {
                    value = 1;
                }
                fullMap[i][j + originalWidth * k] = value;
            }
        }
    }

    // extend vertically
    for (let i = 0; i < originalHeight; ++i) {
        for (let j = 0; j < originalWidth * 5; ++j) {
            for (let k = 1; k < 5; ++k) {
                let value = fullMap[i + originalHeight * (k - 1)][j] + 1;
                if (value > 9) {
                    value = 1;
                }
                fullMap[i + originalHeight * k][j] = value;
            }
        }
    }

    return runJockstrap(fullMap);
})(input);

console.log({ part1, part2 });
