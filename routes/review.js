//javascript ki file hai to small letter se start hogi 
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
//use router
const router = express.Router()//mini instance
const {validateReview}=require('../middleware')

//to shhow review

router.post('/products/:id/review' ,validateReview, async(req,res)=>{
    try{
    let {id} = req.params;
    //console.log(req.body);
    let {rating,comment}=req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});

    product.reviews.push(review);
    await review.save();

    await product.save();//save kora hoyta save krna hota aur uske bhi update krne ke liye
    req.flash('success','review added successfully')
    res.redirect(`/products/${id}`)

    }catch(e){
         res.status(500).render('error',{error:e.message});
    }
    
})





module.exports = router;  