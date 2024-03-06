import User from "../models/user.model.js";
import { errorHandler } from "../utills/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) =>{
    res.json({
        message: 'Test is working'
    })
};


export const updateUser = async (req, res, next) => {
  /* if (req.params.id !== req.user.id)
  console.log(req.user.id);
    return next(errorHandler(401, 'You can only update your own account!'));  */
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;
      console.log(rest);
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};