const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, password } = req.body;
  //   check if req.body has valid values
  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Lack of credientals, cannot create user" });
    throw new Error("Lack of credientals, cannot create user");
  }

  try {
    // check if username already exist in db
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.json({
        message:
          "User with this username already exists. Please select a new username",
      });
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // create new user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });

    // create token
    const token = jwt.sign({ newUser }, process.env.JWT_SECRET);
    // respond with json of the token (has user values in it)
    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.json({ message: "Issues creating new user" });
  }
};

const login = async (req, res) => {
  console.log("what is going on");
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Lack of credientals, cannot sign in user" });
    throw new Error("Lack of credientals, cannot sign in user");
  }

  try {
    const user = await UserModel.findOne({ username });
    if (user && bcrypt.hashSync(password, user.password)) {
      //    create a token for the user
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      console.log(token);
      res.status(200).json({ token });
    }
  } catch (err) {
    if (res.statudCode === 404) {
      return res.status(404).json({ message: "user not found" });
    }
    console.error(err);
    res.status(500).json({ message: "unable to sign in user" });
  }
};

module.exports = {
  signup,
  login,
};
