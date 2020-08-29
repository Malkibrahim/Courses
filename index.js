const express = require('express');
const app = express();
const userRouter=require("./routes/user");
const categoryRouter=require("./routes/category");
const courseRouter=require("./routes/course");
const bodyParser = require("body-parser");

require("./db");
require("express-async-errors");
const port = 3000



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.use("/course",courseRouter);



app.use((req,err,res,next)=>{
  console.log(err);
  const statusCode=err.statusCode || 500;
  if(statusCode>=500){
    return  res.status(statusCode).json({
      message:err.message,
      type:"INTERNAL_SERVER_ERROR",
      details:[],
    })
  }
});

app.listen(port)

