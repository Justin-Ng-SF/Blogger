const express = require('express');
const router = express.Router();

const auth = require('../../../middleware/auth')
//usermodel
const User = require('../../../models/User')

//@route get api/auth
//@desc 
//@access public
router.get('/', auth, async (req, res)=>{
    try {
        //select('-password') removes user.password from user object
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;