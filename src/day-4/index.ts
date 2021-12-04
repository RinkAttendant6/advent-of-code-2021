import process from 'node:process';
import { parseInputMultipart } from '../common/utils.js';

type BoardRow = [number, number, number, number, number];
type Board = [BoardRow, BoardRow, BoardRow, BoardRow, BoardRow];

const input = parseInputMultipart(process.argv[2]);

/**
 * Check if a board has won
 * @param board
 * @param numbersCalled
 * @returns
 */
const hasWon = (board: Board, numbersCalled: number[]) => {
    return (
        board.some((row) => row.every((nbr) => numbersCalled.includes(nbr))) ||
        [0, 1, 2, 3, 4].some((col) =>
            board.every((row) => numbersCalled.includes(row[col]))
        )
    );
};

/**
 * Calculates the score of the board
 * @param board
 * @param numbersCalled
 * @returns
 */
const calculateScore = (board: Board, numbersCalled: number[]) => {
    return board
        .flat()
        .reduce(
            (score, number) =>
                score + (numbersCalled.includes(number) ? 0 : number),
            0
        );
};

const numbers: number[] = input.shift()![0].split(',').map(Number);
const boards: Board[] = input.map(
    (board) =>
        board.map((row) =>
            row.replaceAll(/\s+/g, ' ').trim().split(' ').map(Number)
        ) as Board
);

const numbersCalled: number[] = [];
const winningBoards: number[] = [];

let part1: number | undefined = undefined;
let part2: number | undefined = undefined;

for (
    let i = 0;
    i < numbers.length && winningBoards.length < boards.length;
    ++i
) {
    const currentNumber = numbers[i];

    numbersCalled.push(currentNumber);

    for (let b = 0; b < boards.length; ++b) {
        if (!winningBoards.includes(b) && hasWon(boards[b], numbersCalled)) {
            winningBoards.push(b);
        }
    }

    if (part1 === undefined && winningBoards.length === 1) {
        part1 =
            calculateScore(boards[winningBoards[0]], numbersCalled) *
            currentNumber;
    }

    if (part2 === undefined && winningBoards.length === boards.length) {
        part2 =
            calculateScore(
                boards[winningBoards[boards.length - 1]],
                numbersCalled
            ) * currentNumber;
    }
}

console.log({ part1, part2 });
