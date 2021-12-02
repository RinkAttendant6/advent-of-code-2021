import process from 'node:process';
import { parseInput } from '../common/utils.js';

type Direction = 'up' | 'down' | 'forward';

const input = parseInput(process.argv[2]).map((l) => {
    const [direction, value] = l.split(' ') as [Direction, number];
    return { direction, value: Number(value) };
});

const part1 = ((input) => {
    const horizontal = input
        .filter((el) => el.direction === 'forward')
        .reduce((acc, el) => acc + el.value, 0);

    const depth = input
        .filter((el) => el.direction !== 'forward')
        .reduce(
            (acc, el) => acc + el.value * (el.direction === 'up' ? -1 : 1),
            0
        );

    console.debug('part 1: ', { horizontal, depth });

    return horizontal * depth;
})(input);

const part2 = ((input) => {
    let horizontal = 0;
    let aim = 0;
    let depth = 0;

    input.forEach((el) => {
        switch (el.direction) {
            case 'up':
                aim -= el.value;
                break;
            case 'down':
                aim += el.value;
                break;
            case 'forward':
                horizontal += el.value;
                depth += aim * el.value;
                break;
        }
    });

    console.debug('part 2: ', { horizontal, depth });

    return horizontal * depth;
})(input);

console.log({ part1, part2 });
