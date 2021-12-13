import process from 'node:process';
import { parseInputMultipart } from '../common/utils.js';

type TransparencySheet = boolean[][];

const [coords, folds] = parseInputMultipart(process.argv[2]);

let map: TransparencySheet = [];

// Map the coordinates
coords.forEach((c) => {
    const [x, y] = c.split(',').map(Number);
    map[y] ??= [];
    map[y][x] = true;
});

// Fill in holes
for (let i = 0; i < map.length; ++i) {
    map[i] ??= [];
}

/**
 * Fold transparency sheet vertically (along x)
 * @param map
 * @param x
 */
const foldVertically = (
    map: TransparencySheet,
    x: number
): TransparencySheet => {
    for (let dx = 1; dx <= x; ++dx) {
        for (let y = 0; y < map.length; ++y) {
            map[y][x - dx] ||= map[y][x + dx];
        }
    }

    for (let y = 0; y < map.length; ++y) {
        map[y] = map[y].slice(0, x);
    }

    return map;
};

/**
 * Fold transparency sheet horizontally (along y)
 * @param map
 * @param y
 * @returns
 */
const foldHorizontally = (
    map: TransparencySheet,
    y: number
): TransparencySheet => {
    for (let dy = 1; y + dy < map.length; ++dy) {
        for (let x = 0; x < map[dy + y].length; ++x) {
            map[y - dy][x] ||= map[y + dy][x];
        }
    }

    return map.slice(0, y);
};

folds.forEach((fold, idx) => {
    const [, foldDirection, unitsRaw] = fold.match(
        /^fold along (x|y)=(\d+)$/
    ) as string[];
    const units = Number(unitsRaw);

    map =
        foldDirection === 'y'
            ? foldHorizontally(map, units)
            : foldVertically(map, units);

    if (idx === 0) {
        console.log({ part1: map.flat().filter((x) => x === true).length });
    }
});

map.forEach((row) =>
    console.log(row.map((cell) => (cell === true ? '#' : ' ')).join(''))
);
