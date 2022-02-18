import { rejects } from 'assert';
import { resolve } from 'path';
import * as fs from 'fs';

export const brackets = "(){}[]";

export let onlyBracket = (input) => {
    let inputWithBracketOnly = "";
    for (const char of input) {
        if (brackets.includes(char)) {
            inputWithBracketOnly += char;
        }
    }
    return inputWithBracketOnly;
}

export const isMatched = (input) => {
    let inputWithBracketOnly = onlyBracket(input),
        stack = [];

    if (inputWithBracketOnly.length === 0) return -1;
    if (inputWithBracketOnly.length % 2 !== 0) return 0;
    
    for (const char of inputWithBracketOnly) {
        let bracketsIndex = brackets.indexOf(char);

        if (bracketsIndex % 2 === 0) {      // Hit openning bracket
            stack.push(bracketsIndex + 1);
        } else {                            // Hit closing bracket
            if (stack.pop() !== bracketsIndex) {
                return 0;
            }
        }
    }

    if (stack.length === 0) return 1;
}

export const main = () => {
    if (process.argv.length < 3) {
        console.log(`Usage: node  ${process.argv[1]}  FILENAME`);
        process.exit(1);
    }   

    let filename = process.argv[2];
    const checkValidFile = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject("Invalid file ...");
            } else {
                let lines = data.split('\n');
                let results = [];
                for (let line of lines) {
                    switch(isMatched(line)) {
                        case -1: 
                            results.push("NO-WORRIES");
                            break;
                        case 0:
                            results.push("UNMATCHED");
                            break;
                        case 1:
                            results.push("ALL-MATCHING");
                            break;
                        default:
                            results.push("SOMETHING'S WRONG WITH YOUR INPUT");
                    }
                }
                resolve(results);
            }
        });
    });

    checkValidFile.then(results=> {
        for (const result of results) {
            console.log(result);
        }
    }).catch(error => {
        console.log(error);
    });

    /*
    Note: 
        + Used switch case
        + Converted to ES6 (almost)
        + Optimized early return
        + Regex ... impossible for me
     */
}