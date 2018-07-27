var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('todoList', null, null, {
  dialect: 'sqlite',
  storage: './db/todo.sqlite'
});
const sha256 = require('sha256');

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.TEXT
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  list: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Task.sync({
  force: true
}).then(() => {});

/* GET todo listing. */
router.get('/', async (req, res, next) => {
  res.render('todo-home');
});

/* retrieve all in list via POST */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.list || !req.body.password) {
      res.status(400);
      res.json({
        success: false,
        message: 'List name or password was not provided.'
      });
      return;
    }

    const listName = req.body.list;
    const password = sha256.x2(req.body.password);

    let tasks = await Task.findAll({
      where: {
        list: listName,
        password: password
      }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

/* edit list via POST */
router.post('/edit', async (req, res, next) => {

  try {
    if (!req.body.list || !req.body.tasks || !req.body.password) {
      res.status(400);
      res.json({
        success: false,
        message: 'Tasks or password was not provided.'
      });
      return;
    }

    const listName = req.body.list;
    const newTasks = JSON.parse(req.body.tasks);
    const password = sha256.x2(req.body.password);

    Task.destroy({
      where: {
        list: listName,
        password: password
      }
    });

    let tasks = [];

    newTasks.forEach((task) => {
      tasks.push({
        name: task.name,
        complete: task.complete,
        list: listName,
        password: password
      })
    })

    await Task.bulkCreate(tasks);

    res.json({
      success: true,
      message: 'Tasks were saved successfully.'
    });
  } catch (err) {
    res.status(500);
    res.json({
      success: false,
      message: err.message
    });
  }
})

module.exports = router;
