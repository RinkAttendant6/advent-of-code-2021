import fs from 'node:fs/promises';
import { dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const input = (
    await fs.readFile(process.argv[2] ?? __dirname + '/input.txt', 'utf-8')
)
    .split('\n')
    .map(Number);

/**
 * Find the number of increases in an array of numbers
 * @param acc Number of increases (accumulator)
 * @param value Current value
 * @param index Array index
 * @param arr Array
 * @returns
 */
const findIncreases = (
    acc: number,
    value: number,
    index: number,
    arr: number[]
): number => (index > 0 && value > arr[index - 1] ? acc + 1 : acc);

/**
 * Produce a rolling window sum array
 * @param arr Input array
 * @param size Size of rolling window
 * @returns
 */
const rollingWindowSums = (arr: number[], size: number = 3): number[] => {
    return arr
        .map((_, index) => {
            if (index >= arr.length - size) {
                return NaN;
            }

            return arr
                .slice(index, index + size)
                .reduce((acc, v) => acc + v, 0);
        })
        .filter((value) => !Number.isNaN(value));
};

const part1 = input.reduce(findIncreases, 0);
const part2 = rollingWindowSums(input).reduce(findIncreases, 0);

console.log({ part1, part2 });
