const User = require("../models/userModel");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all the fields!",
      });
    }

    const isExistingUser = await User.findOne({email})
    if(isExistingUser){
      return res.status(400).json({
        status: "error",
        message: "User already exist, Please Login!",
      });
    }

    const user = await User.create({ name, email, password });

    return res.status(200).json({
      status: "success",
      message: "Registration successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if ( !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Please fill in all the fields!",
        });
      }
      const user = await User.findOne({ email});
      if(!user) {
        return res.status(400).json({
            status: "error",
            message: "User does not exist!",
          });
      }

      if(user.password !== password) {
        return res.status(400).json({
            status: "error",
            message: "Incorrect Password!",
          });
      }
      
      user.loginCount = user.loginCount + 1
      await user.save()

      return res.status(200).json({
        status: "success",
        message: "Welcome Back.",
        user,
      });

    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
