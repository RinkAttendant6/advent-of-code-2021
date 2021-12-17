import fs from 'node:fs';

const input = fs
    .readFileSync(process.argv[2], 'utf-8')
    .match(
        /^target area: x=(?<minX>-?\d+)..(?<maxX>-?\d+), y=(?<minY>-?\d+)..(?<maxY>-?\d+)$/
    )?.groups!;

const { minX, minY, maxX, maxY } = input;

let validVelocities = 0;
let maxHeight = 0;

for (let dx0 = 1; dx0 <= Number(maxX); dx0++) {
    for (let dy0 = Number(-minY); dy0 >= Number(minY); dy0--) {
        let maxLocalHeight = 0;

        for (
            let x = 0, y = 0, dx = dx0, dy = dy0;
            x <= Number(maxX) && y >= Number(minY);
            dx -= Math.sign(dx), dy--
        ) {
            x += dx;
            y += dy;

            if (y > maxLocalHeight) {
                maxLocalHeight = y;
            }

            if (
                x >= Number(minX) &&
                x <= Number(maxX) &&
                y >= Number(minY) &&
                y <= Number(maxY)
            ) {
                ++validVelocities;
                maxHeight = Math.max(maxHeight, maxLocalHeight);
                break;
            }
        }
    }
}

console.log({ part1: maxHeight, part2: validVelocities });
