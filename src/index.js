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

