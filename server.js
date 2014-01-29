var connect = require('connect');

console.info('http://localhost:8080');

connect.createServer(
    connect.static(__dirname)
).listen(8080);