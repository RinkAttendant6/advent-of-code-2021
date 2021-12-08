import process from 'node:process';
import { parseInput } from '../common/utils.js';

const input = parseInput(process.argv[2]).map((line) => {
    const [patterns, output] = line
        .split(` | `)
        .map((digits) =>
            digits.split(' ').map((wires) => [...wires].sort().join(''))
        );

    return { patterns, output };
});

const part1 = ((input) =>
    input.reduce(
        (acc, x) =>
            acc +
            x.output.filter((seg) => [2, 3, 4, 7].includes(seg.length)).length,
        0
    ))(input);

const part2 = ((input) =>
    input.reduce((acc, x) => {
        const digits: string[] = Array(10);

        digits[1] = x.patterns.find((segments) => segments.length === 2)!;
        digits[7] = x.patterns.find((segments) => segments.length === 3)!;
        digits[4] = x.patterns.find((segments) => segments.length === 4)!;
        digits[8] = x.patterns.find((segments) => segments.length === 7)!;
        digits[3] = x.patterns.find(
            (segments) =>
                segments.length === 5 &&
                [...digits[7]].every((s) => segments.includes(s))
        )!;
        digits[6] = x.patterns.find(
            (segments) =>
                segments.length === 6 &&
                [...digits[1]].some((s) => !segments.includes(s))
        )!;
        digits[9] = x.patterns.find(
            (segments) =>
                segments.length === 6 &&
                [...digits[4]].every((s) => segments.includes(s))
        )!;
        digits[0] = x.patterns.find(
            (segments) =>
                segments.length === 6 &&
                [...digits[7]].every((s) => segments.includes(s)) &&
                [...digits[4]].some((s) => !segments.includes(s))
        )!;
        digits[5] = x.patterns.find(
            (segments) =>
                segments.length === 5 &&
                [...segments].every((s) => digits[6].includes(s))
        )!;
        digits[2] = x.patterns.find(
            (segments) =>
                segments.length === 5 &&
                segments !== digits[3] &&
                segments !== digits[5]
        )!;

        const output = Number(
            x.output
                .map((segments) =>
                    digits.findIndex((digit) => digit === segments)
                )
                .reverse()
                .reduce((acc, digit, index) => acc + digit * 10 ** index, 0)
        );

        return acc + output;
    }, 0))(input);

console.log({ part1, part2 });
