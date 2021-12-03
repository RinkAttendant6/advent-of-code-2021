import { parseInput } from '../common/utils.js';

const input = parseInput(process.argv[2]);
const bits = input[0].length;

const part1 = ((input) => {
    let gamma = 0;
    let epsilon = 0;

    for (let i = 0; i < bits; ++i) {
        const isOneMoreCommon =
            input.filter((v) => Number(v[i])).length > input.length / 2;

        // Left shift
        gamma <<= 1;
        epsilon <<= 1;

        if (isOneMoreCommon) {
            gamma += 1;
        } else {
            epsilon += 1;
        }
    }

    return gamma * epsilon;
})(input);

const part2 = ((input) => {
    let oxygen = Array.from(input);
    let co2 = Array.from(input);

    for (let i = 0; i < bits && oxygen.length > 1; ++i) {
        const mostCommonBit =
            oxygen.filter((v) => Number(v[i])).length >= oxygen.length / 2
                ? 1
                : 0;
        oxygen = oxygen.filter((v) => +v[i] === mostCommonBit);
    }

    for (let i = 0; i < bits - 1 && co2.length > 1; ++i) {
        const leastCommonBit =
            co2.filter((v) => Number(v[i])).length < co2.length / 2 ? 1 : 0;
        co2 = co2.filter((v) => +v[i] === leastCommonBit);
    }

    console.debug(oxygen, co2);

    return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
})(input);

console.log({ part1, part2 });
