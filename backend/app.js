const { urlencoded } = require("express");
const express = require("express");
const User = require("./models/User");
const imagedownloader = require("image-downloader");

const jwt = require("jsonwebtoken");
const jwtSecret = "secret";

const cookieParser = require("cookie-parser");
require("dotenv").config();

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

console.log("App is starting");
app.listen(3000);

app.use(express.urlencoded({ extended: false, useUnifiedTopology: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// connect to mongodb

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// login and sign up

app.get("/", async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Guesthouse management System</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      Hello World
      
    </body>
    </html>
    `);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name);
  try {
    const UserDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.status(422).json({ message: "Invalid email or password" });
  } else {
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(422).json({ message: "Invalid email or password" });
    } else {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            // throw err;
          } else {
            res.cookie("token", token).json(userDoc);
            // return res.json(userDoc);
          }
        }
      );
      res.cookie("token", userDoc._id, { httpOnly: true });
      // return res.json(userDoc);

      return res.status(200).json({ message: "Login successful" });
    }
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        // throw err;
      } else {
        const { name, email, _id } = await User.findById(userData.id);

        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }

  res.json({ token });
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  console.log(link);
  const newName = "photo" + Date.now() + ".jpg";
  await imagedownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});
