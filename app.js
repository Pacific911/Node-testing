const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');

const app = express();

//connect database

const dbURI ='mongodb+srv://pacific:12345@cluster0.9lxp5ak.mongodb.net/Node-Project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err));
 

//register view engine

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title:'New Blog 3',
        snippet: 'About my new blog',
        body:'More about my new blog'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('6324592a7f3be4f8e5be4260')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about' , {title:'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('index', { title:'All blogs', blogs:result })
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title:'Create'});
})

app.use((req, res) => {
    res.status(404).render('404', {title:'404'});
})