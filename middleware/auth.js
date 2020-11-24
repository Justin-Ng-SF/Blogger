const jwt = require('jsonwebtoken');
const config = require('config')
//make it so that we can send that token back to authenticate an access protected route

//a middleware function is something that has access to request,response cycle/objects
//next is a callback that must run after its done to move onto next middleware

//to use this, put in as second parameter in a route
module.exports = function (req, res, next) {
    //get token from header
    //x-auth-token is header key that we want to send token in, token is 'value' in postman, x-auth-token is 'key'
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    //verify token
    try {
        //decodes token (grabs the mongodb generated _id), 
        //verify takes in the actual token send into header and the secret
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        /*
        decoded = {
            user: { id: '5fbd81c51b7f6d91381422ec' },
            iat: 1606255045,
            exp: 1606615045
        }
        */
        
        //take req object and assign a val to user
        req.user = decoded.user;
        //next is always used in any middleware
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}