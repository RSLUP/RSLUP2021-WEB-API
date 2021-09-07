const http = require('http');

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    if (req.url === '/api/v1' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hi' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});

//  CREATE POST
//  READ GET
//  UPDATE PUT / PATCH
//  DELETE DELETE
