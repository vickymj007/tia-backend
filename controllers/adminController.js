const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and Password is required!",
      });
    }

    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist!",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        status: "error",
        message: "Password is Incorrect",
      });
    }

    if (!admin.isAdmin) {
      return res.status(400).json({
        status: "error",
        message: "Only Admin can access this route!",
      });
    }

    const users = await User.find({isAdmin:false});

    return res.status(200).json({
      status: "success",
      users,
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
