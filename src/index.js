const e = require('express')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
        // There are other limits also we can use. 
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a PDF'))
        // }
        // Google Slide 37
        if (!file.originalname.match(/\.(doc|docx)$/)) { // Regular expressions are written inside forward slashes
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
        // cb(new Error('File must be a PDF')) // Reject upload with error
        // cb(undefined, true) // Upload Success
        // cb(undefined, false) // Reject upload silently
    }
})
app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

const Task = require('./models/task')
const User = require('./models/user')







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