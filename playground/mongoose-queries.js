const {ObjectID}  = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a1d3e0216acd719c26565e5';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });


// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });


// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

User.findById('5a1d473ada6e06267bd9a773').then((todo) => {
    if(!todo){
        return console.log('Id not found');
    }
    console.log('User by Id', todo);
}).catch((e) => console.log(e));