const mongoose=require("mongoose");


mongoose.connect(
    'mongodb://localhost:27017/coursesdb',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
);

const Schema = mongoose.Schema;
const courseSchema = new Schema({
  userId:{
 type: mongoose.Types.ObjectId,
 ref:"User"
  },
  categories:[{
    type:mongoose.Types.ObjectId,
    ref:"Category"
 }],
  name: {
    type: String,
    required: true,
  },
  points:{
      type:Number,
      require:true,

  },
  description:{
      type:String,
      required:true,
  },

  imageUrl:{
    type:String,
    required:false,
  }

});


const course = mongoose.model("course", courseSchema);
module.exports = course;