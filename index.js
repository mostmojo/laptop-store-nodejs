const fs = require('fs'); //file system on this machine
const http = require('http');
const url = require('url');


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // go find files locally and read them
const laptopData = JSON.parse(json); // convert JSON to JavaScript object => array of 5 objects

// HTTP request & HTTP response
const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    console.log(url.parse(req.url, true));

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' }) // header response w/ 200 meaning all is OK, with content text/html,
        res.end('This is the PRODUCTS page'); // then response following the header. Can change 200 to 404 it'll go red :)
    }

    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(`This is the LAPTOP page for laptop ${id}!`);
    }

    else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('URL was not found on the server!');
    }

});

// Port & server, with callback string to ensure it works
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now :)');
});