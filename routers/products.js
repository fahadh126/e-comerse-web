
const {Product} = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
const productList = await Product.find().populate('category');
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      res.status(500).json({ success: false });
    }
    res.send(product);
  });

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category)
  if(!category){
    return res.status(400).send('invalid category')
  }
   const product =  new Product({
    name: req.body.name,
    description : req.body.description,
    richDescription : req.body.richDescription,
    image: req.body.image,
    brand : req.body.brand,
    price : req.body.price,
    category : req.body.category,
    countInStock: req.body.countInStock,
    rating : req.body.rating,
    numReview : req.body.numReview,
    inFeatured : req.body.inFeatured,
  })              
  
   product = await product.save();
   
  if(!product){
    return res.status(500).send('product not found!')
  } res.send(product);
    
});
router.put('/:id', async(req,res)=>{
 const product =  await Product.findByIdAndUpdate(
     req.params.body,
     {
      name: req.body.name,
      description : req.body.description,
      richDescription : req.body.richDescription,
      image: req.body.image,
      brand : req.body.brand,
      price : req.body.price,
      category : req.body.category,
      countInStock: req.body.countInStock,
      rating : req.body.rating,
      numReview : req.body.numReview,
      inFeatured : req.body.inFeatured,
     },
     {new:true}
 )
 if(!product){
  res.status(400).send('product cannot be updated!')
 }
 res.send(product)
})
module.exports = router;
