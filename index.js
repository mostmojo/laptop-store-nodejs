const fs = require('fs');
const http = require('http');


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // go find files locally and read them
const laptopData = JSON.parse(json); // convert JSON to JavaScript object


const server = http.createServer((req, res) => {
    console.log('Someone did access the server!');
});

// Port & server, with callback string to ensure it works
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now :)');
});