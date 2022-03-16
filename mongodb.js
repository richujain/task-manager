// CRUD 

// const monbodb = require('mongodb')
// const MongoClient = monbodb.MongoClient
// //Generate ObjectID
// const ObjectID = monbodb.ObjectID

//Destructuring
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => { // useNewUrlParser is used to make connectionURL work
    if(error) {
        return console.log('Unable to connect to database!')
    }
    
    const db = client.db(databaseName)
    
    // db.collection('users').deleteMany({
    //     age: 29
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteOne({
    //     age: 30,
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    







   


    

    

}) 














// db.collection('users').insertMany([{
//         name: 'Jen',
//         age: 28
//         },
//         {
//             name: 'George',
//             age: 30
//         },
//     ], (error, result) => {
//         if(error){
//             return console.log('Unable to insert documents!')
//         }

//         console.log(result.ops)
//     })
    // db.collection('users').insertMany([{
    //         description: 'Essay One',
    //         completed: true
    //     },
    //     {
    //         description: 'Essay Two',
    //         completed: false
    //     },
    //     {
    //         description: 'Essay Three',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents!')
    //     }
        
    //     console.log(result.ops)
    // })



    //Update
// db.collection('users').updateOne({ 
    //     _id: new ObjectID('622d5922c62f0364747bcba5')
    // }, {
    //     // $set: {
    //     //     name: 'Richu',
    //     //     age: 28,
    //     // }
    //        $inc: {
    //            age: 1
    //        } 
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').updateMany({ 
    //     completed: false 
    //     },{
    //         $set: {
    //             completed: true
    //         }
    //     }).then((result) => {
    //             console.log(result)
    //     }).catch((error) => {
    //             console.log(error)
    // })



     // find and findOne
    // db.collection('users').findOne({ _id: new ObjectID("622d5922c62f0364747bcba5") } , (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch!')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 26 }).toArray((error, users) => {
    //     if(error){
    //         return console.log('Unable to fetch!')
    //     }
    //     console.log(users)
    // })
    // db.collection('users').find({ age: 26 }).count((error, count) => {
    //     if(error){
    //         return console.log('Unable to fetch!')
    //     }
    //     console.log(count)
    // })
    
    // db.collection('users').findOne({ _id: new ObjectID("622d9f87791617ac58a915ff") },(error, user) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({ completed: false }).toArray((error, tasks) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(tasks)
    // })