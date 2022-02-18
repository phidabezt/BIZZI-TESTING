// const fs = require('fs'),
//       JSONStream = require('JSONStream'),
//       es = require('event-stream');

import * as fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
export const JSONStream = require('JSONStream');
export const es = require('event-stream');

export const getStream = () => {
    const jsonData = 'users.json',
          stream = fs.createReadStream(jsonData, { encoding: 'utf8'}),
          parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

export let insertUserToJSON = () => {
    getStream()
    .pipe(es.mapSync((data) => {
        for (let item of data) {
            if (item.age > 24) {
                console.log(item);
            }
        }
    }));
}

/* 
    Note: Converted to ES6 (almost)
*/