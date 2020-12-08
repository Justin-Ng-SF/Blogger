const express = require('express');
var cors = require('cors')
const connectDB = require('./config/db')
var path = require('path');

const app = express();
app.use(cors())

//connecting to mongodb database
connectDB();

//init middleware for parse
app.use(express.json({extended: false}))

//tells html files to go to /assets to get tags (ie script or link)
app.use(express.static(__dirname + '/assets'));
//pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/assets/html/login.html'));
});
app.get('/blogs', function(req, res) {
    res.sendFile(path.join(__dirname + '/assets/html/displayBlogs.html'));
});

app.get('/test', (req, res) => res.send('API Running'));







//define routes
app.use('/api/users', require('./routes/api/v1/users'));
app.use('/api/auth', require('./routes/api/v1/auth'));
app.use('/api/blog', require('./routes/api/v1/blog'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));