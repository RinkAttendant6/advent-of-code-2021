import fs from 'node:fs';

const input = fs
    .readFileSync(process.argv[2], 'utf-8')
    .trim()
    .split(',')
    .map(Number);

const part1 = ((input: number[], days: number): number => {
    for (let day = 0; day < days; ++day) {
        const currentPopulation = input.length;

        for (let fish = 0; fish < currentPopulation; ++fish) {
            if (input[fish] === 0) {
                input.push(8);
                input[fish] = 6;
            } else {
                --input[fish];
            }
        }
    }

    return input.length;
})([...input], 80);

const part2 = ((input: number[], days: number): number => {
    const groups = [];

    for (let group = 0; group <= 8; ++group) {
        groups[group] = input.filter((v) => v === group).length;
    }

    for (let day = 0; day < days; ++day) {
        let reproductionGroup: number = groups.shift()!;
        groups[6] += reproductionGroup;
        groups.push(reproductionGroup);
    }

    return groups.reduce((acc, v) => acc + v, 0);
})([...input], 256);

console.log({ part1, part2 });
