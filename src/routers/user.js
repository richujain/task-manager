const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        // The code here runs only if the above code runs successfully without any error. 
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
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

router.post('/users/login', async (req, res) => {
    try{
        //You can create your own functions to check login only if we create custom schemas and add it to statics in user model. (findByCredentials)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user, token })
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e){
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e){
    //     res.status(500).send()
    // }

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
})

router.patch('/users/me', auth, async (req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    //return allowedUpdates.includes(update)
    // every returns false if one of the condition is false. True only if all the conditions are true.
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        //const user =await User.findById(req.params.id)
        updates.forEach((update) => {
            req.user[update] = req.body[update] //We can't use dot operator as the values are dynamic and so it keeps changing. So we have to use bracket notations. 
        })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })
        // {new: true} will make the function return the updated user rather than the one before updating. 
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user) //status 200 by default
    } catch(e){
        res.status(500).send()
    }
})

const multer = require('multer')
const upload = multer({
    // When we don't specify dest, the multer is not going to save it in the file storage, instead it's gonna pass that responsibility to the cb function (req,res){}
    // dest: 'avatars', // Changing the destination from file storage to database buffer. File storage will be wiped everytime we deploy the project to heroku
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})
// Avatar CRUD Operations
// Create and Update
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    // Multer is processing the file, checking the validation and all. The callback function
    // is saving the file as buffer into the user database.
    res.send()
},  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
})

//Fetching an avatar
// Read
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(404).send()
    }
})


module.exports = router

// Changing static ID to dynamic 
// router.delete('/users/:id', auth, async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user) //status 200 by default
//     } catch(e){
//         res.status(500).send()
//     }
// })

// router.patch('/users/:id', async (req,res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     //return allowedUpdates.includes(update)
//     // every returns false if one of the condition is false. True only if all the conditions are true.
//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid updates!'})
//     }
//     try{
//         const user =await User.findById(req.params.id)
//         updates.forEach((update) => {
//             user[update] = req.body[update] //We can't use dot operator as the values are dynamic and so it keeps changing. So we have to use bracket notations. 
//         })
//         await user.save()
//         //const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })
//         // {new: true} will make the function return the updated user rather than the one before updating. 
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })