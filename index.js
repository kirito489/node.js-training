// const path = require('path');

// const fullPath = path.join(__dirname, 'file1.txt');
// console.log('完整路徑：', fullPath);

const http = require('http');

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const todos = ["學習 Node.js", "學習 HTTP 模組", "完成作業"];

	if(req.url === '/todos') {
		res.writeHead(200);
		res.end(JSON.stringify({ message: 'Success', status: 'Success', data: todos  }));
	} else if(req.url === '/todos/count') {
		res.writeHead(200);
		res.end(JSON.stringify({ status: 'Success', count: todos.length}));
	} else if(req.url === '/health') {
		res.writeHead(200);
		res.end(JSON.stringify({ status: 'ok' }));
	} else {
		res.writeHead(404);
		res.end(JSON.stringify({ error: '找不到' }));
	}
})

server.listen(3000, () => {
	console.log('http://localhost:3000/');
})