const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('/message API 首頁');
});

app.use(express.json());

const messages = [];

app.get('/messagesBoard', (req, res) => {
	res.json({
    status: '成功取得所有留言',
		count: messages.length,
    messages: messages
	});
});

app.get('/messagesBoard/:id', (req, res) => {
  const messageId = Number.parseInt(req.params.id);
  const message = messages.find(message => message.id === messageId);

  if (!message) {
    return res.status(404).json({ 
      status: '找不到該留言' 
    });
  }

  res.json({
    status: '成功取得留言',
    message: message
  });
});

app.post('/messagesBoard', (req, res) => {
	const { message, name } = req.body;
  if (!message || message.trim() === '') {
    return res.status(400).json({
      status: '留言為必填欄位且不能為空'
    });
  }

	if (!name || name.trim() === '') {
    return res.status(400).json({
      status: '留言者為必填欄位且不能為空'
    });
  }

  const createTime = Date.now();
  const newMessage = {
    id: messages.length + 1,
    message: message.trim(),
		name: name.trim(),
    createdAt: createTime,
    createdAtReadable: new Date(createTime).toLocaleString('zh-TW')
  };
  messages.push(newMessage);
  res.status(201).json({
    status: '留言已建立',
    message: newMessage
  });
});

app.put('/messagesBoard/:id', (req, res) => {
	const { id } = req.params;
  const messageId = Number.parseInt(id);
  const messageIndex = messages.findIndex(message => message.id === messageId);
	const { message, name } = req.body;
  const updateTime = Date.now();

	if (messageIndex === -1) {
    return res.status(404).json({ status: '找不到該留言' });
  }

	if (!message || message.trim() === '') {
    return res.status(400).json({
      status: '留言為必填欄位且不能為空'
    });
  }

	if (!name || name.trim() === '') {
    return res.status(400).json({
      status: '留言者為必填欄位且不能為空'
    });
  }

  messages[messageIndex] = {
    ...messages[messageIndex],
		message: message.trim(),
		name: name.trim(),
    updatedAt: updateTime,
    updatedAtReadable: new Date(updateTime).toLocaleString('zh-TW')
  };

  res.json({
    status: '留言已更新',
    message: messages[messageIndex]
  });
});

app.patch('/messagesBoard/:id', (req, res) => {
	const { id } = req.params;
  const messageId = Number.parseInt(id);
  const messageIndex = messages.findIndex(message => message.id === messageId);
	const { message, name } = req.body;
  const reviseTime = Date.now();

  if (messageIndex === -1) {
    return res.status(404).json({ 
      status: '找不到該留言' 
    });
  }

  if (message !== undefined) {
    messages[messageIndex].message = message.trim();
  }

  if (name !== undefined) {
    messages[messageIndex].name = name.trim();
  }
  
  messages[messageIndex].updatedAt = reviseTime;
  messages[messageIndex].updatedAtReadable = new Date(reviseTime).toLocaleString('zh-TW');

  res.json({
    status: '留言已部分更新',
    message: messages[messageIndex]
  });
});

app.delete('/messagesBoard/:id', (req, res) => {
	const { id } = req.params;
  const messageId = Number.parseInt(id);
  const messageIndex = messages.findIndex(message => message.id === messageId);

  if (messageIndex === -1) {
    return res.status(404).json({ status: '找不到該留言' });
  }

	const deletedMessage = messages.splice(messageIndex, 1)[0];

  res.json({ 
    status: '留言已刪除',
    message: deletedMessage
  });
});

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
  console.log('可用的 API 端點：');
  console.log('GET    /messagesBoard       - 取得所有留言');
  console.log('GET    /messagesBoard/:id   - 取得單一留言');
  console.log('POST   /messagesBoard       - 建立新留言');
  console.log('PUT    /messagesBoard/:id   - 完整更新留言');
  console.log('PATCH  /messagesBoard/:id   - 部分更新留言');
  console.log('DELETE /messagesBoard/:id   - 刪除留言');
});