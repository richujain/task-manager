const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port // Removed 3000 local port because we set it as dev environmental variable in /config/dev.env
//const port = process.env.PORT || 3000 //

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})



// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//         // There are other limits also we can use. 
//     },
//     fileFilter(req, file, cb) {
//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }
//         // Google Slide 37
//         if (!file.originalname.match(/\.(doc|docx)$/)) { // Regular expressions are written inside forward slashes
//             return cb(new Error('Please upload a Word document'))
//         }
//         cb(undefined, true)
//         // cb(new Error('File must be a PDF')) // Reject upload with error
//         // cb(undefined, true) // Upload Success
//         // cb(undefined, false) // Reject upload silently
//     }
// })
// Commenting for referance. Removing the middleware to add custom middleware to return JSON error instead of the default HTML error
// app.post('/upload', upload.single('upload'), (req,res) => {
//     res.send()
// })
// Error handling using custom middleware. Will be combining with upload.single() at the bottom
// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }

// app.post('/upload', errorMiddleware, (req,res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })
// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }
// // It is required to pass all four arguments to let the express know that it's the function to be executed when it catches an error. The four arguments are error, req, res, next
// app.post('/upload', upload.single('upload'), (req,res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })



// const Task = require('./models/task')
// const User = require('./models/user')

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