const { Mongoose } = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})








//Learning purpose -- only for reference
// const task = new tasks({
//     description: '   Wash the dishes   ',
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error!',error)
// })