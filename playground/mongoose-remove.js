const {ObjectID}  = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5a1d3ee08298d31fe817be13'}).then((todo) => {
//     console.log(tobo);
// });

// Todo.findByIdAndRemove('5a1d6f914c72935bf5566305').then((todo) => {
//     console.log(todo);
// });