var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

const Book= require('../models/bookModel')
const upload = require('../utils/multer').single('bookImage')

router.get('/create',isLoggedIn,(req,res)=>{
    res.render('create')
})

router.post('/create',upload,async(req,res)=>{
    try{
        const newBook = await new Book({...req.body,bookImage:req.file.filename,user:req.user._id})
        newBook.save()
        await req.user.books.push(newBook._id)
        req.user.save()
        res.redirect('/book/explore')
    }catch(err){
        res.send(err)
    }
})

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const book = await Book.findById(id)
    res.render('editBook',{book})
})

router.post('/edit/:id',upload,async(req,res)=>{
    try{
        const {id} = req.params
        const updatedBook = req.body

        if(req.file){
            fs.unlinkSync(path.join(__dirname,'..','public','images',req.body.oldImage))
            updatedBook.bookImage =  req.file.filename
        }
        await Book.findByIdAndUpdate(id,updatedBook)
        res.redirect('/book/explore')

    }catch(err){
        res.send(err)
    }
})

router.get('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        fs.unlinkSync(path.join(__dirname,'..','public','images',deletedBook.bookImage))
        res.redirect('/book/explore')
    }catch(err){
        res.send(err)
    }
})

router.get('/visit/:id', async(req,res)=>{
    const {id} = req.params
    const book = await Book.findById(id)
    res.render('visit',{book})
})

router.get('/explore',async(req,res)=>{
    try{
        const bookData=await Book.find()
       res.render('explore',{bookData}) 
    }catch(err){
        res.send(err)
    }
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/users/register')
    }
  }
  

module.exports = router