const { urlencoded } = require("express");
const express = require("express");
const User = require("./models/User");

const jwt = require("jsonwebtoken");


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

  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if(!userDoc){
    return res.status(422).json({message: "Invalid email or password"});
  }
  else{
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if(!isPasswordValid){
      return res.status(422).json({message: "Invalid email or password"});
    }
    else{
      jwt.sign({email: userDoc.email,id: userDoc._id}, jwtSecret,{}, (err, token) => {

        if(err){
          throw err;
        }
        else{
          res.cookie("token", token,).json(userDoc);
          // return res.json(userDoc);
        }
      })
      res.cookie("token", userDoc._id, {httpOnly: true});
      // return res.json(userDoc);

      return res.status(200).json({message: "Login successful"});
    }
  }
});
app.listen(4000);



console.log("Server is running on port 4000");

// app.get('/profile',(req,res)=>{
//  mongoose.connect(process.env.MONGO_URL);

//   const {token} = req.cookies;

//   if(token){

//       jwt.verify(token, jwtSecret,{}, async(err, userData) => {
//           if(err){
//               throw err;
//           }
//           else{
//             const {name,email,_id} = await User.findById(userData.id)

//               res.json({name,email,_id});
//           }
//       })
//   }
//   else
//   {
//     res.json(null);
//   }

//   res.json({token});
// })