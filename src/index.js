const e = require('express')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
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
app.use((req, res, next) => {
    res.status(503).send('The site is under maintainance. Please try again after sometime.')
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    //1st arg: An ID, which will be dynamic (User ID).
    // 2nd arg: Any series of characters just to check whether our token has been tampered. 
    // const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' }) 
    // console.log(token)

    // const data = jwt.verify(token, 'thisismynewcourse')
    // console.log(data)
}

myFunction()