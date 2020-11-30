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

//pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/assets/html/index.html'));
});








//define routes
app.use('/api/users', require('./routes/api/v1/users'));
app.use('/api/auth', require('./routes/api/v1/auth'));
app.use('/api/blog', require('./routes/api/v1/blog'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));