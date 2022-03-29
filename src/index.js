const e = require('express')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled!')
//     } else{
//         next()
//     }
// })

//Setup middleware for maintainance mode
// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintainance. Please try again after sometime.')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('6241cd025a325da89d54d7fb')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('624167855dd5b46a3d6d2815')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()