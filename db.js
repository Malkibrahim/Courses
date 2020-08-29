var mongoose=require('mongoose');
// require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/coursesdb",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    
).then(()=>console.log("kkkkkkk")).catch((err)=>{
    console.error(err);
    progress.exit(1);
})