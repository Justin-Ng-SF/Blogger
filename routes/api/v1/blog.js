const { EDESTADDRREQ } = require('constants');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const Blog = require('../../../models/Blog');
const User = require('../../../models/User')

//@route blog api/blog
//@desc make a blog
//@access private
//write new wraper class for express validator
router.post('/new', [auth, [
    check('body', 'Body is required')
        .not()
        .isEmpty(),
    check('header', 'Header is required')
        .not()
        .isEmpty(),
] ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //select('-password') removes user.password from user object
        const user = await User.findById(req.user.id).select('-password');

        //user check, check if deleted or not
        if (user.isDisabled) {
            return res.status(401).json({ msg: 'Account Disabled' });
        }

        const newBlog = new Blog({
            header: req.body.header,
            body: req.body.body,
            firstName: user.firstName,
            lastName: user.lastName,
            user: req.user.id,
        })

        const blog = await newBlog.save();

        res.json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});

//@route get api/blog
//@desc get all blogs
//@access private
router.get('/', auth, async (req, res) => {
    try {
        //can use .limit(amount) and .skip(amount) for mongodb collections
        const blogs = await Blog.find({"isDeleted": "false"}).sort({postedOn: -1})
        res.json(blogs)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Blog Get All Error')
    }
})

//@route get api/blog/:id
//@desc get blog by id
//@access private
router.get('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        res.json(blog)

    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        res.status(500).send('Server Error')
    }
})

//@route delete api/blog/:id
//@desc delete by id
//@access private
router.put('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        
        if (blog.isDeleted) {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        //check if user owns blog
        //blog.user is originally an object
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });
        }

        blog.isDeleted = true;

        await blog.save();

        res.json(blog)
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        res.status(500).send('Server Blog Get Error')
    }
})
/* Old delete blog
router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        
        if (!blog) {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        //check if user owns blog
        //blog.user is originally an object
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });
        }

        await blog.remove();

        res.json(blog)
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        res.status(500).send('Server Blog Get Error')
    }
})
*/


//@route blog api/blog/:id
//@desc update by id
//@access private
router.put('/:id', [auth, [
    check('body', 'Body is required')
        .not()
        .isEmpty(),
    check('header', 'Header is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        //check if user owns blog
        //blog.user is originally an object
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });
        }

        blog.header = req.body.header
        blog.body = req.body.body
        blog.lastEdited = new Date();

        await blog.save();

        res.json(blog)
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Blog does not exist'})
        }
        res.status(500).send('Server Blog Update Error')
    }
})


//@route put api/blog/:id/like
//@desc like a blog
//@access priv 
router.put('/:id/like', auth, async(req, res)=> {
    try {
        const blog = await Blog.findById(req.params.id);

        //check if blog has been liked by user already
        //blog.likes of type array (filter through where filter takes in a function)
        //comparing current user to user logged in
        //remember to turn like.user into a string
        //req.user.id is the user logged in
        if (blog.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Blog already liked' });
        }

        blog.likes.unshift({ user: req.user.id });

        await blog.save();

        res.json(blog.likes)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route put api/blog/:id/unlike
//@desc unlike a blog
//@access priv 
router.put('/:id/unlike', auth, async(req, res)=> {
    try {
        const blog = await Blog.findById(req.params.id);

        //check if blog has been liked by user already
        if (blog.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Blog not yet liked' });
        }

        //get remove index
        const removeIndex = blog.likes.map(like => like.user.toString()).indexOf(req.user.id);

        blog.likes.splice(removeIndex, 1);

        await blog.save();

        res.json({ msg: 'blog unliked' })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;