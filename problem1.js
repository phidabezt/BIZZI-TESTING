function onlyBracket(input) {
    var inputWithBracketOnly = "";
    var brackets = "(){}[]";
    for (var i = 0; i < input.length; i++) {
        if (brackets.indexOf(input[i]) >= 0) {
            inputWithBracketOnly += input[i];
        }
    }
    return inputWithBracketOnly;
}

function isMatched(input) {
    var inputWithBracketOnly = onlyBracket(input);

    if (inputWithBracketOnly.length === 0) return -1;
    var stack = [];
    var brackets = "(){}[]";

    for (var i = 0; i < inputWithBracketOnly.length; i++) {
        var bracketsIndex = brackets.indexOf(inputWithBracketOnly[i]);

        if (bracketsIndex % 2 === 0) {      // Hit openning bracket
            stack.push(bracketsIndex + 1);
        } else {                            // Hit closing bracket
            if (stack.pop() !== bracketsIndex) {
                return 0;
            }
        }
    }
    if (stack.length === 0) {               // Stack need to be empty for matching statement
        return 1;
    }
}

function main() {
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }

    var fs = require('fs'), 
        filename = process.argv[2];
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        var lines = data.split('\n');
        for (var line of lines) {
            if (isMatched(line) === 1) {
                console.log("ALL-MATCHING");
            } else if (isMatched(line) === 0) {
                console.log("UNMATCHED");
            } else {
                console.log("NO-WORRIES");
            }
        }
    });
    //CMD syntax: node problem1.js input.txt
}

main();