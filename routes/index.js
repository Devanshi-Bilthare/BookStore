var express = require('express');
var router = express.Router();

const Books = require('../models/bookModel')


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create',(req,res)=>{
  res.render('create')
})

router.post('/create',async(req,res)=>{

  Books.create(req.body).then(() =>{
    res.redirect('/read')
  }).catch(err =>{
    res.send(err)
  })
})

router.get('/read',(req,res)=>{
  Books.find().then((books)=>{
    res.render('library',{Books:books})
  }).catch(err =>{
    res.send(err)
  })
})

router.get('/update/:id',(req,res)=>{
  const{id} = req.params
  Books.findById(id).then((book)=>{
    res.render('update',{book})
  }).catch((err)=>{
    res.send(err)
  })
})


router.post('/update/:id',(req,res)=>{
  const {id} = req.params
  Books.findByIdAndUpdate(id,req.body).then(()=>{
    res.redirect('/read')
  }).catch(err =>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  const {id} = req.params
  Books.findByIdAndDelete(id).then(()=>{
    res.redirect('/read')
  }).catch(err =>{
    res.send(err)
  })
})

router.post('/search',(req,res)=>{
  const {search} = req.body
  const searchRegex = new RegExp(search, 'i');
  Books.find({ title: { $regex: searchRegex } })
  .then(books => {
    res.render('library', { Books: books });
  })
  .catch(err => {
    res.send(err);
  });
})
module.exports = router;
