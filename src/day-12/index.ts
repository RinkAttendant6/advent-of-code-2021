import process from 'node:process';
import { parseInput } from '../common/utils.js';

const input = parseInput(process.argv[2]);

const adjacencyMatrix: Record<string, string[]> = {};

input.forEach((line) => {
    const [a, b] = line.split('-');

    adjacencyMatrix[a] ??= [];
    adjacencyMatrix[a].push(b);
    adjacencyMatrix[b] ??= [];
    adjacencyMatrix[b].push(a);
});

const part1 = ((input) => {
    const traverse = (paths: string[][], visited: string[], node: string) => {
        const isStart = node === 'start';
        const isEnd = node === 'end';
        const isSmallCave = !isStart && node === node.toLowerCase();

        if (
            (isStart && visited.length > 0) ||
            (isSmallCave && visited.includes(node))
        ) {
            return;
        }

        if (isEnd) {
            paths.push(visited);
            return;
        }

        for (let next of input[node] ?? []) {
            traverse(paths, [...visited, node], next);
        }
    };

    const paths: string[][] = [];
    traverse(paths, [], 'start');
    return paths.length;
})(adjacencyMatrix);

const part2 = ((input) => {
    const traverse = (paths: string[][], visited: string[], node: string) => {
        const isStart = node === 'start';
        const isEnd = node === 'end';
        const isSmallCave = !isStart && node === node.toLowerCase();

        if (isEnd) {
            paths.push(visited);
            return;
        }

        if (isStart && visited.length > 0) {
            return;
        }

        if (isSmallCave) {
            const smallCavesVisited = visited.filter(
                (x) => x !== 'start' && x.toLowerCase() === x
            );

            if (smallCavesVisited.includes(node)) {
                const smallCaveVisitedTwice =
                    smallCavesVisited.filter(
                        (x, _, a) => a.indexOf(x) !== a.lastIndexOf(x)
                    ).length > 0;
                if (smallCaveVisitedTwice) {
                    return;
                }
            }
        }

        for (let next of input[node] ?? []) {
            traverse(paths, [...visited, node], next);
        }
    };

    const paths: string[][] = [];
    traverse(paths, [], 'start');
    return paths.length;
})(adjacencyMatrix);

console.log({ part1, part2 });
