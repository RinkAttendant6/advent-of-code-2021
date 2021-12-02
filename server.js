import child_process from 'node:child_process';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const day = process.argv[2];
const inputFile = process.argv[3] ?? `day-${day}.txt`;
const inputPath = join(__dirname, 'assets', 'data', inputFile);

child_process.spawn(
    'node',
    ['--loader', 'ts-node/esm', `src/day-${day}/index.ts`, inputPath],
    {
        shell: true,
        stdio: 'inherit',
    }
);
