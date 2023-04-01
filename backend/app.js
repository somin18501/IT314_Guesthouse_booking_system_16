const { urlencoded } = require("express");
const express = require("express");
const User = require("./models/User");
require("dotenv").config();


const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");


const cors = require('cors')
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);

console.log("App is starting");
app.listen(3000);


app.use(express.urlencoded({ extended: false, useUnifiedTopology: true }));


app.use(express.json());




app.use(cors({

  credentials: true,
  origin: 'http://localhost:3000'
}))

// connect to mongodb

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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



app.post('/register', async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const UserDoc = await User.create({
      name,
      email,
      password: bcypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
  }
  catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
})
