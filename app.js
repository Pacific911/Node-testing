const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect database

const dbURI ='mongodb+srv://pacific:12345@cluster0.9lxp5ak.mongodb.net/Node-Project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err));
 

//register view engine

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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

app.use(blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title:'404'});
})