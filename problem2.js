var fs = require('fs'),
    JSONStream = require('JSONStream'),
    es = require('event-stream');

var getStream = function () {
    var jsonData = 'users.json',
        stream = fs.createReadStream(jsonData, { encoding: 'utf8'}),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

var insert = function () {
    getStream()
    .pipe(es.mapSync(function (data) {
        for (var item of data) {
            if (item.age > 24) {
                console.log(item);
            }
        }
    }));
}

insert();