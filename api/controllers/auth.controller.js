import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const handleGoogleLogin = async (req, res, next) => {
  try {
    const { email, username, profileImg, exp, role } = req.body; 

    let user = await User.findOne({ email });

    if (!user) {
     
      const newUser = new User({
        username,
        email, 
        profileImg
      });

      user = await newUser.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_KEY, {expiresIn: exp}
    );

    const { password: _, ...info } = user._doc;
    info.exp = exp;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      }).status(200).send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};
