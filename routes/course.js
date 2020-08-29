const express =require("express");
const app =express();
const Course=require("../models/course");
const authentication = require("../middlewares/authentication");
const enrolledCourse=require("../middlewares/enrolledCourse");
const admin = require("../middlewares/admin");
const router = express.Router();
require("express-async-errors");

router.get("/",async(req,res,next)=>{
  const courses= await Course.find({});
  res.json({
    message:"all courses",
    courses
  });
});

 router.get('/:id', async (req,res,next)=>{
   const {id} = req.params;
   const course =await Course.findOne({_id:id});
   res.json({

     course,
   });
 });

 router.delete('/delete-course/:id', async (req,res,next)=>{
   const {id}=req.params;
   const course= await Course.findByIdAndDelete({_id:id});
   res.json({
     message:" deleted course"
   });
 });

 router.get('/my-courses',authentication,enrolledCourse, async(req,res,next)=>{
  const courses = await Course.find({}).populate("categories");
  res.json({
    message:"all my courses",
    courses
  });
 });
 ///not tested



 router.post('/add-course' ,async(req,res,next)=>{
   const { userId,category,name,points,description,imageUrl}= req.body;
   const course = new Course ({
    userId,
    category,
    name,
    points,
    description,
    imageUrl
   });
   await course.save();
   res.json({
     message:"added course",
    course
   });
 });



 








  module.exports =router;
