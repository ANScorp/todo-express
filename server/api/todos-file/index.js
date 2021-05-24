const todosApi = require('express').Router({ mergeParams: true });
const { resolve } = require('path');
const fs = require('fs').promises;

const file = resolve(__dirname, '../..', 'data', 'todos.json');

module.exports = todosApi;

fs.readFile(file)
  .catch(() => {
    fs.writeFile(file, '[]');
  });

todosApi.get('/', (req, res) => {
  res.sendFile(file, {}, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err });

      return;
    }
    console.log(`SENT: ${file}`);
  });
});

todosApi.post('/', (req, res) => {
  if (!req.body.todo) {
    const message = 'body is empty';
    res.json({ res: 0, action: 'add', message });
  }

  let { todo } = req.body;

  fs.readFile(file, 'utf8')
    .then((data) => {
      const todos = JSON.parse(data) ?? [];
      const id = todos.length ? todos.slice(-1)[0].id + 1 : 1;

      console.log(`current todos: ${data}`);
      todo = { id, ...todo };
      todos.push(todo);

      return fs.writeFile(file, JSON.stringify(todos));
    })
    .then(() => {
      console.log(`${new Date()} - todo added: ${JSON.stringify(todo)}`);
      res.json({ res: 1, action: 'add', todo });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

todosApi.post('/all', (req, res) => {
  if (!req.body.todos) {
    const message = 'body is empty';
    res.json({ res: 0, action: 'add', message });
  }
  fs.writeFile(file, req.body.todos, 'utf8')
    .then(() => res.json({ res: 1 }))
    .catch((err) => res.status(500).json({ error: err }));
});

todosApi.put('/:id(\\d+)', (req, res) => {
  if (!req.body.todo) {
    const message = 'body is empty';
    res.json({ res: 0, action: 'update', message });
  }

  const { todo } = req.body;
  const { id } = todo;

  fs.readFile(file, 'utf8')
    .then((data) => {
      let todos = JSON.parse(data) ?? [];

      console.log(`current todos: ${data}`);
      todos = todos.map((item) => (
        item.id === id ? todo : item
      ));

      return fs.writeFile(file, JSON.stringify(todos));
    })
    .then(() => {
      console.log(`${new Date()} - todo updated: ${JSON.stringify(todo)}`);
      res.json({ res: 1, action: 'update', todo });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

todosApi.post('/toggle', (req, res) => {
  if (!req.body) {
    const message = 'body is empty';
    res.json({ res: 0, action: 'update/toggle', message });
  }

  const { checked } = req.body;

  fs.readFile(file, 'utf8')
    .then((data) => {
      const todos = JSON.parse(data) ?? [];

      console.log(`current todos: ${data}`);
      todos.forEach((item) => {
        const todo = item;
        todo.completed = checked;
      });

      return fs.writeFile(file, JSON.stringify(todos));
    })
    .then(() => {
      console.log(`${new Date()} - todos checked: ${checked}`);
      res.json({ res: 1, action: 'update/toggle', checked });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

todosApi.delete('/:id(\\d+)', (req, res) => {
  let { id } = req.params;
  id = Number(id);

  fs.readFile(file, 'utf8')
    .then((data) => {
      let todos = JSON.parse(data) ?? [];

      console.log(`current todos: ${data}`);
      todos = todos.filter((todo) => todo.id !== id);

      return fs.writeFile(file, JSON.stringify(todos));
    })
    .then(() => {
      console.log(`${new Date()} - todo removed: ${id}`);
      res.json({ res: 1, action: 'delete', id });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

todosApi.delete('/completed', (req, res) => {
  fs.readFile(file, 'utf8')
    .then((data) => {
      let todos = JSON.parse(data) ?? [];

      console.log(`current todos: ${data}`);
      todos = todos.filter((todo) => !todo.completed);

      return fs.writeFile(file, JSON.stringify(todos));
    })
    .then(() => {
      console.log(`${new Date()} - completed todos removed`);
      res.json({ res: 1, action: 'delete' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
