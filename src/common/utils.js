import fs from 'node:fs';
import readline from 'node:readline';

/**
 * Parses an input to an array of strings
 * @param {string} filePath
 * @returns {string[]}
 */
export const parseInput = (filePath) =>
    fs.readFileSync(filePath, { encoding: 'utf8' }).trim().split('\n');

/**
 * Parses a multipart input where each part is separated by a blank line
 * @param {string} filePath
 * @return {string[][]}
 */
export const parseInputMultipart = (filePath) =>
    fs
        .readFileSync(filePath, { encoding: 'utf8' })
        .trim()
        .split('\n\n')
        .map((line) => line.split('\n'));

/**
 * Parses an input to an array of numbers
 * @param {string} filePath
 * @returns {number[]}
 */
export const parseNumericInput = (filePath) => parseInput(filePath).map(Number);

/**
 * Parses input line by line
 * @param {string} filePath
 * @returns {readline.Interface}
 */
export const parseInputAsync = (filePath) =>
    readline.createInterface({
        input: fs.createReadStream(filePath),
    });
