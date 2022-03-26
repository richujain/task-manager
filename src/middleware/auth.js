const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '') //replace to remove Bearer word from token
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.find({ _id: decoded._id, 'tokens.token': token }) //This function will find the user with the ID and the token we passed. 
        
        if(!user){
            throw new Error()
        }
        req.user = user
        next()

    } catch(e){
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

module.exports = auth