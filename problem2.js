const fs = require('fs'),
      JSONStream = require('JSONStream'),
      es = require('event-stream');

let getStream = () => {
    let jsonData = 'users.json',
        stream = fs.createReadStream(jsonData, { encoding: 'utf8'}),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

let insert = () => {
    getStream()
    .pipe(es.mapSync((data) => {
        for (let item of data) {
            if (item.age > 24) {
                console.log(item);
            }
        }
    }));
}

insert();

/* 
    Note: Converted to ES6 (almost)
*/