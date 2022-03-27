const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '') //replace to remove Bearer word from token
        const decoded = jwt.verify(token, 'thisismynewcourse')
        //This function will find the user with the ID and the token we passed. 
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) 
        console.log('User is: '+ user)
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()

    } catch(e){
        console.log('a' + e)
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

module.exports = auth