import process from 'node:process';
import { parseInput } from '../common/utils.js';

type OpeningChar = '(' | '{' | '[' | '<';
type ClosingChar = ')' | '}' | ']' | '>';
type ChunkChar = OpeningChar | ClosingChar;

const input = parseInput(process.argv[2]).map(
    (line) => line.split('') as ChunkChar[]
);

const PAIRS: Record<ClosingChar, OpeningChar> = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
};

const SCORES: Record<ClosingChar, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const part1 = ((input) =>
    input.reduce((score, chunk) => {
        const stack: OpeningChar[] = [];

        for (const char of chunk) {
            if ('({[<'.includes(char)) {
                stack.push(char as OpeningChar);
            } else {
                if (stack.pop() !== PAIRS[char as ClosingChar]) {
                    return score + SCORES[char as ClosingChar];
                }
            }
        }

        return score;
    }, 0))(input);

const part2 = ((input) => {
    const points = input
        .filter((chunk) => {
            const stack: OpeningChar[] = [];

            for (const char of chunk) {
                if ('({[<'.includes(char)) {
                    stack.push(char as OpeningChar);
                } else {
                    if (stack.pop() !== PAIRS[char as ClosingChar]) {
                        return false;
                    }
                }
            }

            return true;
        })
        .map((chunk) => {
            const stack: OpeningChar[] = [];

            for (const char of chunk) {
                if ('({[<'.includes(char)) {
                    stack.push(char as OpeningChar);
                } else {
                    const peek = stack[stack.length - 1] ?? null;
                    if (peek === PAIRS[char as ClosingChar]) {
                        stack.pop();
                    }
                }
            }

            return stack
                .reverse()
                .reduce((acc, char) => 5 * acc + ` ([{<`.indexOf(char), 0);
        })
        .sort((a, b) => a - b);

    return points[Math.floor(points.length / 2)];
})(input);

console.log({ part1, part2 });
