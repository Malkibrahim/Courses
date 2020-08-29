var mongoose=require("mongoose");


mongoose.connect('mongodb://localhost:27017/coursesdb',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
);

var Schema = mongoose.Schema;
var categorySchema = new Schema({
  courses: [{
    type:mongoose.Types.ObjectId,
    ref:"Course"

  }],
  name: {
    type: String,
    required: true
  }
});
const category = mongoose.model("category", categorySchema);
module.exports = category;