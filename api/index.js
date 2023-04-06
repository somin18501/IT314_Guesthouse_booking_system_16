const { urlencoded } = require("express");
const express = require("express");
const User = require("./models/User");
const imagedownloader = require("image-downloader");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const cookieParser = require("cookie-parser");
require("dotenv").config();


const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");


const cors = require('cors')



const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


app.use(express.json());
app.use(cookieParser());


app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173',
}));




app.get("/", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json('test ok');
});



app.post('/register', async (req, res) => {


  mongoose.connect(process.env.MONGO_URL);

 

  console.log("hello");
  
  const { name, email, password } = req.body;
  // console.log(name);
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
  }
  catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
});




app.post('/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});


app.get('/profile',(req,res)=>{
 mongoose.connect(process.env.MONGO_URL);

  const {token} = req.cookies;

  if(token){

      jwt.verify(token, jwtSecret,{}, async(err, userData) => {
          if(err){
              throw err;
          }
          else{
            const {name,email,_id} = await User.findById(userData.id)

              res.json({name,email,_id});
          }
      })
  }
  else
  {
    res.json(null);
  }
})
app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
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


app.listen(4000);



console.log("Server is running on port 4000");