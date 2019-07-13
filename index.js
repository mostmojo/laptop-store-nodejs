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

    // PRODUCTS OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' }) // header response w/ 200 meaning all is OK, with content text/html,

    }

    // LAPTOP DETAILS
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html' })

        // Read the whole template.laptop.html file!
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    }

    // URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('URL was not found on the server!');
    }

});

// Port & server, with callback string to ensure it works
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now :)');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}