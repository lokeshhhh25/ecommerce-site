//javascript ki file hai to small letter se start hogi 
const express = require('express');
const Product = require('../models/Product')
const Review = require('../models/Review')
//use router
const router = express.Router()//mini instance
const { validateProduct,isLoggedin,isSeller,isProductAuthor}=require('../middleware')

router.get('', (req,res)=>{
    try{
         res.render('products/home');
    }catch(er){
        res.status(500).render('error' , {err:er.message});
    }
    
})


//to show all the products
router.get('/products', isLoggedin, async(req,res)=>{
    try{
         let products = await Product.find({})
         res.render('products/index',{products});
    }catch(er){
        res.status(500).render('error' , {err:er.message});
    }
    
})
 

//to create new products form page
router.get('/product/new', isLoggedin,(req,res)=>{
    try{
         res.render('products/new');
    }
    catch(er){
          res.status(500).render('error' , {err:er.message}); 
    }
   
});

//to actually add the products
router.post('/products',validateProduct,isLoggedin,isSeller, async(req,res)=>{

    try{
         let {name , img , price , desc } =req.body; //yeh data milega apne ko db se
    await Product.create({name , img , price , desc ,author:req.user._id}); //data create kar rha hu or yeh await or async isliye likhte hai kyuki yeh return karta hai promises or yeh work async se sath he karta hai
    req.flash('success','product added successfully');
    res.redirect('/products');
   }
   catch(er){
         res.status(500).render('error' , {err:er.message}); 
   }
   
})


//to show a particular product
router.get('/products/:id' ,isLoggedin,async(req,res)=>{

    try{
         let {id}=req.params;
    let foundProduct= await Product.findById(id).populate('reviews');
    console.log(foundProduct);
    res.render('products/show' ,{foundProduct , msg:req.flash('msg')} );

   }
   catch(er){
         res.status(500).render('error' , {err:er.message}); 
   }
   
});

//form to edit something in product like name price etc
router.get('/products/:id/edit', isLoggedin,async(req,res)=>{

    try{
        let {id}=req.params;
    let foundProduct= await Product.findById(id);
    res.render('products/edit',{foundProduct});
   }
   catch(er){
         res.status(500).render('error' , {err:er.message}); 
   }
    
});

//to esit actually edit data in db
router.patch('/products/:id',validateProduct ,isLoggedin, async(req,res)=>{

 try{
       let {id}=req.params;
       let {name , img , price , desc } =req.body;
     await Product.findByIdAndUpdate(id,{name , img , price , desc });
       req.flash('success','product eddited successfully');
     res.redirect(`/products/${id}`);
   }
   catch(er){
         res.status(500).render('error' , {err:er.message}); 
   }
    
});

//to delete product
router.delete('/products/:id',isLoggedin , isProductAuthor,async(req,res)=>{

    try{

        let {id}=req.params;
        const product = await Product.findById(id);

    // for(let id of product.reviews){
    //   await Review.findByIdAndDelete(id);
    // }

    await Product.findByIdAndDelete(id);
    req.flash('success','product deleted successfully');
    res.redirect('/products');
   }
   catch(er){
         res.status(500).render('error' , {err:er.message}); 
   }
          
})






module.exports = router;  