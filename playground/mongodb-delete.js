//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Some to do'}).then((result) => {
    //     console.log(result);
    // })


    // deleteOne
    // db.collection('Todos').deleteOne({text:'Some to do'}).then((result) => {
    //     console.log(result);
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:true}).then((result) => {
    //     console.log(result);
    // })

    //db.collection('Users').deleteMany({name: 'Jura'});
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a1c333010dad247653bf58c')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    db.close();
});