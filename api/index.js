const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")

let { google } = require("googleapis");
let path = require("path");
// let fs = require("fs");
const { file } = require("googleapis/build/src/apis/file");
let CLIENT_ID =
  "864785856564-r3lg3kfi0gmaa6i53kd89j41ahofr706.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let REDIRECT_URI = "https://developers.google.com/oauthplayground/";
let REFRESH_TOKEN =
  "1//04EkoHi8WuGt3CgYIARAAGAQSNwF-L9IrMNAAZNtusKbnS9AWUdSpPI77lNVyGQ2YEGdjMGvK6rqJytFHZePObYmRwOFQnOgL2qc";

const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

//oauth credentials needed to operate in gdrive space
oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });


const drive = google.drive({
  version: "v3",
  auth: oauth2client,
});


// used to upload file to google drive based on mimetype
let uploadids = "undefined";
async function uploadfile(filepath) {
  console.log(filepath);
  if (path.extname(filepath) == ".png") {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: "uploadedfile1.png",
          mimeType: "image/png",
        },
        media: {
          mimeType: "image/png",
          body: fs.createReadStream(filepath),
        },
      });
      uploadids = response.data.id;
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  } else if (path.extname(filepath) == ".jpg") {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: "uploadedfile1.jpg",
          mimeType: "image/jpg",
        },
        media: {
          mimeType: "image/jpg",
          body: fs.createReadStream(filepath),
        },
      });
      uploadids = response.data.id;
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }
}


//creates a public url for view/download access for any user and changes file permissions
async function generatepublicurl(id) {
  try {
    const fileId = id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}


//bcrypt salt to encrypt user password
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bjhfewf74926966jheufuf";


app.use(express.json()); // to parse the json to read data
app.use(cookieParser()); // to read data of browser cookies
app.use(bodyParser.json()) // parses body into readable JSON object
app.use(bodyParser.urlencoded({ extended: true })) // needed to read body of http responses
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);


//establish mongoose connection
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});


//register page to register credentials of a user in system for login
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});


//for login using user credentials
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {}, // flag
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token);
          res.json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});


//profile page of loggedin user, not accessible without login
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});


//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});


// console.log({__dirname}) // used to get value in terminal
//upload photos of a guesthouse by image address link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    // dest: "/tmp/" + newName,
    dest: __dirname + "/uploads/" + newName,
  });
  await uploadfile("./uploads/" + newName);
  await generatepublicurl(uploadids);
  res.json(uploadids);
});


//takes care of what photo is uploaded, stores id for future access and uploads it to cloud storage
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  // console.log(req.files); // used to gt response in terminal
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newName = path + "." + ext;
    console.log(newName);
    fs.renameSync(path, newName);
    // console.log(newName);
    await uploadfile('.\\'+newName);
    await generatepublicurl(uploadids);
    if(uploadids != 'undefined')  uploadedFiles.push(uploadids);
    uploadids = 'undefined';
  }
  res.json(uploadedFiles);
});


//carousal of all the available places
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    city,
    state,
    country,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    status,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      city,
      state,
      country,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      status,
    });
    res.json(placeDoc);
  });
});


//shows places owned by users
app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});


//view a specific guesthouse
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});


//adds a new guesthouse and shows it inside the publishers accomodations
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    city,
    state,
    country,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    status,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
   
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        city,
        state,
        country,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        status,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});


//feedback area to read reviews for each guesthouse
app.put("/places/feedback", async (req, res) => {
  const { placeId, feedback } = req.body;
  const placeDoc = await Place.findById(placeId);
  placeDoc.set({
    feedback,
  });
  await placeDoc.save();
  res.json("ok");
});


//request to delete a certain guesthouse
app.delete("/deleteplace/:id", async (req, res) => {
  try {
    res.json(await Place.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.send("Error");
  }
});


//show carousal of places according to query of location/place
app.get("/places", async (req, res) => {
  const { city, state, country } = req.query;
  const queryObject = {};

  if (city) {
    queryObject.city = { $regex: city, $options: "i" };
  }

  if (state) {
    queryObject.state = { $regex: state, $options: "i" };
  }

  if (country) {
    queryObject.country = { $regex: country, $options: "i" };
  }
  res.json(await Place.find(queryObject));
});


app.get("/places", async (req, res) => {
  res.json(await Place.find());
});


// here we can using .then() instead of async-await as substitute
// booking functionality / accessible only if you are logged in
app.post("/bookings", (req, res) => {
  const { token } = req.cookies;
  const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const bookingDoc = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price,
    });
    res.json(bookingDoc);
  });
});


//get all your current bookings / accessible only if you are logged in
app.get("/bookings", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    // populate is used to get entire object referenced by calling model
    res.json(await Booking.find({ user: id }).populate("place"));
  });
});


//shows details regarding a particular booking of a user
app.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Booking.findById(id).populate("place"));
});


//to delete a certain booking
app.delete("/deletebooking/:id", async (req, res) => {
  try {
    res.json(await Booking.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.send("Error");
  }
});


// payment gateway implementation using stripe
app.post("/payment", async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "INR",
			description: "GHB",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(4000);

module.exports = app;


