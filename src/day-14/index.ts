import process from 'node:process';
import { parseInputMultipart } from '../common/utils.js';

const [template, pairs] = parseInputMultipart(process.argv[2]);
const replacementMap: Record<string, string> = {};

pairs.forEach((pair) => {
    const [src, dest] = pair.split(` -> `);
    replacementMap[src] = dest;
});

const part1 = ((template, replacements, steps = 10) => {
    let t = template[0];
    const polymers: Record<string, number> = {};

    for (let i = 0; i < steps; i++) {
        let template2 = t[0];
        for (let j = 1; j < t.length; j++) {
            template2 += replacements[t[j - 1] + t[j]] + t[j];
        }
        t = template2;
    }

    [...t].forEach((p) => {
        polymers[p] ??= 0;
        polymers[p]++;
    });

    return (
        Math.max(...Object.values(polymers)) -
        Math.min(...Object.values(polymers))
    );
})(template, replacementMap);

const part2 = ((template, replacements, steps = 40) => {
    const t = template[0];
    let pairMap: Record<string, number> = {};
    const polymers: Record<string, number> = {};

    for (let j = 0; j < t.length - 1; j++) {
        pairMap[t[j] + t[j + 1]] ??= 0;
        pairMap[t[j] + t[j + 1]]++;

        polymers[t[j]] ??= 0;
        polymers[t[j]]++;
    }

    polymers[t[t.length - 1]] ??= 0;
    polymers[t[t.length - 1]]++;

    for (let i = 0; i < steps; i++) {
        const pairMap2: Record<string, number> = {};

        for (const [pair, quantity] of Object.entries(pairMap)) {
            const replacement = replacements[pair];

            polymers[replacement] ??= 0;
            pairMap2[pair[0] + replacement] ??= 0;
            pairMap2[replacement + pair[1]] ??= 0;

            polymers[replacement] += quantity;
            pairMap2[pair[0] + replacement] += quantity;
            pairMap2[replacement + pair[1]] += quantity;
        }

        pairMap = pairMap2;
    }

    return (
        Math.max(...Object.values(polymers)) -
        Math.min(...Object.values(polymers))
    );
})(template, replacementMap);

console.log({ part1, part2 });
