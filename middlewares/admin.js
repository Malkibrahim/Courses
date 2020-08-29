const User = require('../models/user')
const customError=require('../helpers/customErrors');

require("express-async-errors");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById({_id:id});
  // const { userId } = req.user.id;
  if (user.isAdmin==true) {
    next();
  } else {
    throw CustomError("Not authorized", 403);
  }
};