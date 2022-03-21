const e = require('express')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        // The code here runs only if the above code runs successfully without any error. 
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) =>{
    //     res.status(400).send(e)
    //     //res.send(e)
    // })
})

app.get('/users', async (req, res) => {
    
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e){
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
      
})



// Express provides route parameters to catch the parameters passed through the url.
//req.params contains all the parameters we add. In this case, it is an object with a single property, ie, id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.patch('/users/:id', async (req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    //return allowedUpdates.includes(update)
    // every returns false if one of the condition is false. True only if all the conditions are true.
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })
        // {new: true} will make the function return the updated user rather than the one before updating. 
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user) //status 200 by default
    } catch(e){
        res.status(500).send()
    }
})


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
    
    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task) //status 200 by default
    } catch(e){
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
