require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(req.params.id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', async(req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    try {
        var todo = await Todo.findByIdAndRemove(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    } catch (e) {
        res.status(400).send(e);
    };
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});



/**
 * Create user
 */
app.post('/users', async(req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    try {
        await user.save();
        let token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send(e);
    };
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user); 
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};