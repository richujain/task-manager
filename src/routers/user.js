const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {
    
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
router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req,res) => {

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

router.delete('/users/:id', async (req, res) => {
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



module.exports = router