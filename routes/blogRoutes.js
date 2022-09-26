const { render } = require('ejs');
const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);   
    })
})

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
        console.log(err);
    });
})

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' })
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('blogs/create', (req, res) => {
    res.render('create', { title:'Create a new blog' });
})

router.get('/single-blog', (req, res) => {
    Blog.findById('6324592a7f3be4f8e5be4260')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/', (req, res) => {
    res.redirect('/blogs');
});

router.get('/about', (req, res) => {
    res.render('about' , {title:'About'});
});

// blog routes
router.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('index', { title:'All blogs', blogs:result })
    })
    .catch((err) => {
        console.log(err);
    })
})

router.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

module.exports = router;