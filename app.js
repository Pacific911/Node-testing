const express = require('express');
const morgan = require('morgan');

const app = express();

//register view engine

app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds the eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Ornella finds the eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Arnauld finds the eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title:'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about' , {title:'About'});
});

app.get('/about-us',(re, res) => {
    res.redirect('/about', {title:'About'});
})
app.get('/blogs/create', (req, res) => {
    res.render('create', {title:'Create'});
})

app.use((req, res) => {
    res.status(404).render('404', {title:'404'});
})