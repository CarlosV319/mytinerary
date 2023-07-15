const User = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userControllers = {
  newUser: async (req, res) => {
    let { name, lastName, email, password, urlImage, country, google } = req.body;
    
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.json({ success: false,error:"Email already exist",response: null,});
      } else {
        password = bcryptjs.hashSync(password, 10);

        const newUser = new User({name,lastName,email,password,urlImage,country,google});
        const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY);
        console.log(token);
        await newUser.save();
        res.json({ success: true, response: { token, newUser,urlImage }, error: null });
      }
    } catch (error) {
      res.json({ success: false, response: null, error: error });
    }
  },
  
  logIn: async (req, res) => {
    const { email, password, google } = req.body;
   
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.json({
          success: true,
          error: "The email and/or password are incorrect",
        });
      } else {
        let passwordMatch = bcryptjs.compareSync(
          password,
          existingUser.password
        );
        if (passwordMatch) {
          const token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);
        
          res.json({ success: true, response: { token, email, urlImage:existingUser.urlImage, name:existingUser.name }, error: null });
        } else {
          res.json({
            success: true,
            error: "The email and/or password are incorrect",
          });
        }
        if (existingUser.google && !google) throw new Error("Invalid email");
      }
    } catch (error) {
      res.json({ success: false, response: null, error: error });
    }
  },
  tokenVerification: (req, res) => {
    res.json({name: req.user.name, urlImage: req.user.urlImage, _id: req.user._id})
}
};

module.exports = userControllers;
