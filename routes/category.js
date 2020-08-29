const express =require("express");
const app =express();
const Category=require("../models/category");
const { query } = require("express");
const admin = require("../middlewares/admin");
const router = express.Router();
require("express-async-errors");

router.get('/', async(req,res,next)=>{
  const categories= await Category.find({});
  res.json({
    message:"all categories",
    categories
  });
});

router.get('/:id', async(req,res,next)=>{
  const {id}= req.params;
  const category = await Category.findOne({_id:id.id});

  res.json({
    category
  });
});

router.post('/add-category', async(req,res,next)=>{
  const {course,name}= req.body;
  const category= new Category({
    course,
    name
  });
  await category.save();
  res.json({
    message:" added category ",
    category
  });
});



router.delete('/delete-cat/:id',async(req,res,next)=>{
 const {id}= req.params;
 const category= await Category.findByIdAndDelete({_id:id});
  
    res.json({
      message:"deleted category"
    });
  
});


  
  module.exports =router;

