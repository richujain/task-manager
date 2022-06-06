const { Mongoose } = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
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