//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a1c4666da6e06267bd9a767')
    // }, {
    //     $set: {
    //         complteted: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

      // findOneAndUpdate
      db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a1c4d5eda6e06267bd9a770')
    }, {
        $set: {
            name: 'Jura',
        },
        $inc: { 
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);        
    })


    db.close();
});