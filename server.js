const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connecting to mongodb database
connectDB();

//init middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('test'));

//define routes
app.use('/api/users', require('./routes/api/v1/users'));
app.use('/api/auth', require('./routes/api/v1/auth'));
app.use('/api/blog', require('./routes/api/v1/blog'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));