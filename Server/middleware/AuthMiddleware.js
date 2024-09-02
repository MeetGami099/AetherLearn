const jwt = require("jsonwebtoken");
const userModel = require("../model/userDetails");
require("dotenv").config();

exports.isLoggedin = async (req, res, next) => {
  try {
   
    if (!req.cookies.token) {
      return res.json({
        success: false,
        msg: "Token Not Found",
      });
    }
    const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
   
    const userAtDb = await userModel.findOne({ email: user.email });
    
    if (!userAtDb) {
      return res.json({
        success: false,
        msg: "Invalid User",
      });
    }

    userAtDb.password = undefined;
    req.user = userAtDb;
    
    next();
  } catch (error) {
    
    return res.json({
      success: false,
      msg: "error while checking",
    });
  }
};

exports.isStudent = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.send({
        success: false,
        msg: "You are not student",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      msg: "error while Verifying student",
    });
  }
};

exports.isFaculty = async (req, res,next) => {
  try {
    

    if (req.user.role !== "faculty") {
      return res.send({
        success: false,
        msg: "You are not faculty",
      });
    }
    next()
  } catch (error) {
    return res.json({
      success: false,
      msg: "error while Verifying faculty",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.send({
        success: false,
        msg: "You are not admin",
      });
    }
    console.log("Passed Is admin")
    next();
  } catch (error) {
    return res.json({
      success: false,
      msg: "error while Verifying admin",
    });
  }
};
