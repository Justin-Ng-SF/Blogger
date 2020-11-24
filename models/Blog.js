const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//ref users refers to users model which allows us to know what came from which user (ie the blog or the likes)
const BlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ]

})

moduloe.exports = Post = mongoose.model('post', BlogSchema)