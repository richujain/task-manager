const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const { options } = require('mongoose')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    // ...req.body (ES6 Spread operator - ...) It copies all the value of that object.
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=10(2nd page)
// GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 //sort.completed (We can't use it because we need it dynamic. Since we can't use the dot operator, we are using bractet notations)
    }

    try{
        // const tasks = await Task.find({})
        // const tasks = await Task.find({ owner: req.user._id })
        // res.status(201).send(tasks)
        //await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)

        const task = await Task.findOne({ _id, owner: req.user._id })
        console.log('ID is '+ _id)
        console.log('User ID is '+ req.user._id)
        console.log('Task is '+ task)
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!task){
            return res.status(404).send()
        }
        res.send(task) //status 200 by default
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router