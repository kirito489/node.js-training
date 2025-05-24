const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Todo API 首頁');
});

// 解析 JSON 格式
app.use(express.json());

// 建立一個陣列來儲存使用者資料
const todos = [];

// // GET
// app.get('/api/users', (req, res) => {
//   res.json(users);
// });

// // POST
// app.post('/api/users', (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     phone: req.body.phone
//   };
//   users.push(newUser);
//   res.status(201).json({  // 201 跟 200 的差異是 201 是建立新的資源
//     message: '使用者已建立',
//     user: newUser
//   });
// });

// // PUT
// app.put('/api/users/:id', (req, res) => {
//   const userId = Number.parseInt(req.params.id);
//   const userIndex = users.findIndex(user => user.id === userId);

//   if (userIndex === -1) {
//     return res.status(404).json({ message: '找不到該使用者' });
//   }

//   users[userIndex] = {
//     ...users[userIndex],
//     mail: req.body.mail
//   };

//   res.json({
//     message: '使用者已更新',
//     user: users[userIndex]
//   });
// });

// // DELETE
// app.delete('/api/users/:id', (req, res) => {
//   const userId = Number.parseInt(req.params.id);
//   const userIndex = users.findIndex(user => user.id === userId);

//   if (userIndex === -1) {
//     return res.status(404).json({ message: '找不到該使用者' });
//   }

//   users.splice(userIndex, 1);
//   res.json({ message: `使用者 ${userId} 已刪除` });
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });

// 練習實作

// GET
app.get('/todos', (req, res) => {
  res.json({
    message: '成功取得所有待辦事項',
    todos: todos,
    count: todos.length
  });
});

// GET - 取得單一待辦事項
app.get('/todos/:id', (req, res) => {
  const todoId = Number.parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === todoId);

  if (!todo) {
    return res.status(404).json({ 
      message: '找不到該待辦事項' 
    });
  }

  res.json({
    message: '成功取得待辦事項',
    todo: todo
  });
});

// POST
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const { completed } = req.body;
  // 驗證必要欄位
  if (!title || title.trim() === '') {
    return res.status(400).json({
      message: '標題為必填欄位且不能為空'
    });
  }
  const createTime = Date.now();
  const newTodo = {
    id: todos.length + 1,
    title: title.trim(), // 去除前後空白
    completed: completed || false,
    createdAt: createTime,
    createdAtReadable: new Date(createTime).toLocaleString('zh-TW')
  };
  todos.push(newTodo);
  res.status(201).json({  // 201 跟 200 的差異是 201 是建立新的資源
    message: '待辦事項已建立',
    todo: newTodo
  });
});

// PUT
app.put('/todos/:id', (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const updateTime = Date.now();
  const todoId = Number.parseInt(id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: '找不到該待辦事項' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    completed: completed !== undefined ? completed : false,
    updatedAt: updateTime,
    updatedAtReadable: new Date(updateTime).toLocaleString('zh-TW')
  };

  res.json({
    message: '使用者已更新',
    todo: todos[todoIndex]
  });
});

// PATCH - 部分更新待辦事項（新增）
app.patch('/todos/:id', (req, res) => {
  const todoId = Number.parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  const reviseTime = Date.now();

  if (todoIndex === -1) {
    return res.status(404).json({ 
      message: '找不到該待辦事項' 
    });
  }

  // PATCH 只更新提供的欄位
  if (req.body.title !== undefined) {
    if (req.body.title.trim() === '') {
      return res.status(400).json({
        message: '標題不能為空'
      });
    }
    todos[todoIndex].title = req.body.title.trim();
  }
  if (req.body.completed !== undefined) {
    todos[todoIndex].completed = req.body.completed;
  }
  
  todos[todoIndex].updatedAt = reviseTime;
  todos[todoIndex].updatedAtReadable = new Date(reviseTime).toLocaleString('zh-TW');

  res.json({
    message: '待辦事項已部分更新',
    todo: todos[todoIndex]
  });
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  const todoId = Number.parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  const deletedTodo = todos.splice(todoIndex, 1)[0];

  if (todoIndex === -1) {
    return res.status(404).json({ message: '找不到該待辦事項' });
  }

  res.json({ 
    message: '待辦事項已刪除',
    todo: deletedTodo
  });
});

// 全域錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '伺服器內部錯誤'
  });
});

// 404 處理
app.use((req, res) => {
  res.status(404).json({
    message: '找不到該路由'
  });
});

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
  console.log('可用的 API 端點：');
  console.log('GET    /todos       - 取得所有待辦事項');
  console.log('GET    /todos/:id   - 取得單一待辦事項');
  console.log('POST   /todos       - 建立新待辦事項');
  console.log('PUT    /todos/:id   - 完整更新待辦事項');
  console.log('PATCH  /todos/:id   - 部分更新待辦事項');
  console.log('DELETE /todos/:id   - 刪除待辦事項');
});
