require('../src/db/mongoose')
const Task = require('../src/models/task')

// Remove a given task by ID and print the total number of incomplete tasks

// 6234abe63a23e92cdcde2b0b is the ID for task 'laundry'

Task.findByIdAndDelete('6234ad7b95699c1d5489ea6a').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})