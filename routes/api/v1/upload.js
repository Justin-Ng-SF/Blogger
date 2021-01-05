//delete later?
//or make a delete endpoint

const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../../../middleware/auth');
const preset = 'mzsg1npr'
const url = 'https://api.cloudinary.com/v1_1/jstazn/upload';
const FormData = require('form-data')

const dotenv = require('dotenv').config();

const formidable = require('formidable');

const app = express();
var fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles: true
}))


var cloudinary = require('cloudinary').v2;
const config = require('config')


cloudinary.config({
    cloud_name: config.get('cloudinaryName'),
    api_key: config.get('cloudinaryKey'),
    api_secret: config.get('cloudinarySecret')

})
//@route post api/upload
//@desc uploads picture
//@access private
router.get('/', async (req, res) => {
    try {
        const timestamp = Math.round((new Date).getTime()/1000)

        // var formData = new formidable.IncomingForm();

        // formData.parse(req);

        // formData.on('')

        //photo: req.files.photo
        //var formData = new FormData();
        // var signature = await cloudinary.utils.sign_request(
        //     req.files.file,
        //     timestamp,
        //     config.get('cloudinarySecret')
        // )
        //new formData(); 
        
        //console.log('signature: ', signature)
        
        // axios(url, {
        //     method: "POST",
        //     body: formData
        //   })
        //       .then((response) => {
        //         console.log('hi')
        //       return response.text();
        //     })
        //       .then((data) => {
        //         console.log(JSON.parse(data).url)
        //         console.log(JSON.parse(data).public_id)
        //         //document.getElementById("data").innerHTML += data;
        //     });
        // let header = {
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     }
        // }
        // var formData = new FormData();
        // formData.append('file', req.files.file)
        // formData.append('upload_preset', 'gqnfw2b1')

        // var formData = {
        //     'file': req.files.file,
        //     'upload_preset': 'gqnfw2b1'
        // }
//console.log(req.body)
        // await axios.post(url, req)
        
        


        //console.log(req.files.file)
        
        //works
        //console.log(req.files.photo)

        // console.log()
        //         cloudinary.utils.sign_request(form.body.file, Date.now(), {api_key, api_secret})
        const pictureURL = 'https://res.cloudinary.com/jstazn/image/upload/v1608689934/u9cqslmboierpv08qz5g.jpg'
        
        var pictureID = pictureURL.substring(pictureURL.length-24,pictureURL.length-4)
        cloudinary.uploader.destroy(pictureID, function (err, res) {
            console.log(err)
            return res.json({ msg: err});
        })
        
        // formData.append('file', req);
        // formData.append('upload_preset', preset);

        // await axios({
        //     url, 
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     data: {
        //         file
        //     }
        // }).then(function (res) {
        //     console.log(res)
        // }).catch (function(err) {
        //     console.log(err)
        // })
        // var returnthhis = {
        //     signature: signature,
        //     timeStamp: timeStamp
        // }
        // signature = signature.signature
        // const api_key = config.get('cloudinaryKey')
        return res.json({ msg: 'deleted'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;