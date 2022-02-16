let onlyBracket = (input) => {
    let inputWithBracketOnly = "";
    let brackets = "(){}[]";
    for (let i = 0; i < input.length; i++) {
        if (brackets.indexOf(input[i]) >= 0) {
            inputWithBracketOnly += input[i];
        }
    }
    return inputWithBracketOnly;
}

let isMatched = (input) => {
    let inputWithBracketOnly = onlyBracket(input),
        stack = [],
        brackets = "(){}[]";
    
    switch (true) {
        case (inputWithBracketOnly.length === 0): return "NO-WORRIES";
        
        case (inputWithBracketOnly.length !== 0): 
            for (let i = 0; i < inputWithBracketOnly.length; i++) {
                let bracketsIndex = brackets.indexOf(inputWithBracketOnly[i]);
        
                if (bracketsIndex % 2 === 0) {      // Hit openning bracket
                    stack.push(bracketsIndex + 1);
                } else {                            // Hit closing bracket
                    if (stack.pop() !== bracketsIndex) {
                        return "ALL-MATCHING";
                    }
                }
            }
        case (stack.length === 0): return "UNMATCHED";
    }
}

let main = () => {
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }   

    let fs = require('fs'), 
        filename = process.argv[2];
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        let lines = data.split('\n');
        for (let line of lines) {
            console.log(isMatched(line));
        }
    });
    //CMD syntax: node problem1.js input.txt
    /*
    Note: 
        + Used switch case
        + Converted to ES6 (almost)
        + Optimized early return by directly points out the string result
        + Regex ... impossible for me
     */
}

main();
