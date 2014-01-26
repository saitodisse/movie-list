var connect = require('connect');

console.log('http://localhost:8080');

connect.createServer(
    connect.static(__dirname)
).listen(8080);