require('../src/db/mongoose')
const Task = require('../src/models/task')

// Remove a given task by ID and print the total number of incomplete tasks

// 6234abe63a23e92cdcde2b0b is the ID for task 'laundry'

// Task.findByIdAndDelete('62349c35e195363538ca8d1b').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
} 

deleteTaskAndCount('623356fa9b38064bfbd46f0c').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})