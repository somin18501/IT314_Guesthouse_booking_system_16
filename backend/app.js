const { urlencoded } = require("express");
let express = require("express");

const cors = require('cors')
let app = express();

const { MongoClient } = require("mongodb");
let db;
const uri ="mongodb+srv://ayushkhamar8:5U7qg3iVSmrSRoQQ@cluster0.tg2xhy1.mongodb.net/todoapp?retryWrites=true&w=majority";
const databaseName = "todoapp";
const client = new MongoClient(uri);
client.connect({ useNewUrlParser: true, useUnifiedTopology: true });
db = client.db(databaseName);
console.log("App is starting");
app.listen(3000);


app.use(express.urlencoded({ extended: false, useUnifiedTopology: true }));


app.use(express.json());


// login and sign up

app.use(cors({

  credentials: true,
  origin: 'http://localhost:3000'
}))


app.post('/register', async (req, res) => {

  const { name, email, password } = req.body;
  res.json({ name, email, password });
  console.log(req.body);

})

app.get("/", async (req, res) => {
  let total = db.collection("items");
  let site = await total.find().toArray();
  // console.log(site);
  // .toArray(function (err, items) {
  //   console.log(items);
  // });
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
      <div class="container">
        <h1 class="display-4 text-center py-1">Enter your trip destination!!</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item"  method = "POST">
            <div class="d-flex align-items-center">
              <input name = "item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Search!!</button>
            </div>
          </form>
        </div>
        <h1 class="display-4 text-center py-1">Few popular destinations</h1>
        <ul class="list-group pb-5">
            ${site.map((item)=>{return `
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              
              <button class="delete-me btn btn-danger btn-sm">Remove</button>
            </div>
          </li>
            `;}).join('')}
        </ul>
        
      </div>
      
    </body>
    </html>
    `);
});




app.post("/create-item",async (req, res) => {
  // res.send("thankyou");
  
  let temp = await db.collection("items").insertOne({ text: req.body.item });
  res.redirect("/");
});
// app.listen(3000);
