const express = require('express');
const app = express();
const port = 3000;

// // 解析 JSON 格式
// app.use(express.json());

// const firstMiddleware = (req, res, next) => {
// 	console.log('firstMiddleware');
// 	next();
// }
// const authMiddleware = (req, res, next) => {
//   const token = Date.now();
//   if (!token) {
//     return res.status(401).json({ error: '未提供認證 token' });
//   }
//   // 驗證 token 邏輯
//   next();
// };

// app.use(firstMiddleware);
// app.use(authMiddleware);

// app.get('/', (req, res) => {
//   res.send('Todo API 首頁');
// });

// app.get('/hello', (req, res) => {
// 	res.send('Hello')
// })

// app.listen(port, () => {
// 	console.log(`伺服器已啟用在 http://localhost:${port}`);
// });

// 實作練習
const requestLogs = [];

const logMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
	res.on('finish', () => {
		const endTime = Date.now();
		const duration = endTime - startTime;

		const log = {
			timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${ duration }ms` 
		};
		requestLogs.push(log);
	});
  next();
};

app.use(logMiddleware);

app.get('/', (req, res) => {
  res.send('Todo API 首頁');
});

app.get('/hello', (req, res) => {
	res.send('Hello')
})

app.get('/logs', (req, res) => {
  res.send(requestLogs);
});

app.use((req, res) => {
  res.status(404).json({ error: '路徑錯誤' });
});

app.listen(port, () => {
	console.log(`伺服器已啟用在 http://localhost:${port}`);
});