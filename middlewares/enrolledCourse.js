const Course= require('../models/course');
const customError=require('../helpers/customErrors');

require("express-async-errors");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById({_id:id});
  // const { userId } = req.user.id;
  if (course.userId.equals(req.user.id)) {
    next();
  } else {
    throw CustomError("Not authorized", 404);
  }
};
