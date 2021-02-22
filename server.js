const express = require('express');

const mongoose = require('mongoose');

const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const blog = require('./models/Blog')

const app = express()

mongoose.connect('mongodb://localhost/crudmovies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

//route for the index
app.get('/', async (request, response) => {
    let blogs = await blog.find().sort({timeCreated: 'desc'});
    response.render('index', { blogs: blogs })
});

app.use(express.static("public"))
app.use('/blogs', blogRouter);

//listen port
app.listen(5000)