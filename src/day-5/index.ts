import { parseInputAsync } from '../common/utils.js';

type FloorMap = Record<number, Record<number, number>>;

const markCoordinate = (map: FloorMap, x: number, y: number) => {
    map[x] ??= {};
    map[x][y] ??= 0;
    map[x][y]++;
};

const markHorizontalLine = (
    map: FloorMap,
    row: number,
    start: number,
    end: number
) => {
    if (start > end) {
        [start, end] = [end, start];
    }

    for (let i = start; i <= end; ++i) {
        markCoordinate(map, row, i);
    }
};

const markVerticalLine = (
    map: FloorMap,
    col: number,
    start: number,
    end: number
) => {
    if (start > end) {
        [start, end] = [end, start];
    }

    for (let i = start; i <= end; ++i) {
        markCoordinate(map, i, col);
    }
};

const markDiagonalLine = (
    map: FloorMap,
    x1: number,
    x2: number,
    y1: number,
    y2: number
) => {
    const right = x2 > x1;
    const down = y2 > y1;
    const length = Math.abs(x2 - x1);

    for (let i = 0; i <= length; ++i) {
        markCoordinate(map, x1 + (right ? i : -i), y1 + (down ? i : -i));
    }
};

const countOverlaps = (map: FloorMap) =>
    Object.values(map).reduce(
        (acc, row) => acc + Object.values(row).filter((x) => x > 1).length,
        0
    );

const map1: FloorMap = {};
const map2: FloorMap = {};

for await (const line of parseInputAsync(process.argv[2])) {
    const [src, dest] = line.split(' -> ');
    const [x1, y1] = src.split(',').map(Number);
    const [x2, y2] = dest.split(',').map(Number);

    if (x1 === x2) {
        markHorizontalLine(map1, x1, y1, y2);
        markHorizontalLine(map2, x1, y1, y2);
    } else if (y1 === y2) {
        markVerticalLine(map1, y1, x1, x2);
        markVerticalLine(map2, y1, x1, x2);
    } else {
        markDiagonalLine(map2, x1, x2, y1, y2);
    }
}

const part1 = countOverlaps(map1);
const part2 = countOverlaps(map2);

console.log({ part1, part2 });
