const http = require('http');

const server = http.createServer((request, response) => {
    response.write('hello~');
    response.end();
});

server.listen(3000, () => {
    console.log('the server is on')
});