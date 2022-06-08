const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require("express-session");
const bodyParser = require("body-parser");
const clc = require("cli-color");
const UserSchema = require("./Database/Schema/User.js");
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();
app.use(express.json());
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(function (err, req, res, next) {
  if (!err.status) console.error(err);
  makeError(res, err.status || 500);
});
app.set("trust proxy", true);

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MONGOOSE //////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/pwmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})
mongoose.connection.on("err", err => {
  console.error(`Mongoose connection error: \n ${err.stack}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ROUTES ////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("login", {
        req: req,
    });
});

app.get("/register", (req, res) => {
    res.render("register", {
        req: req,
    });
});

app.get("/dashboard/:name", (req, res) => {
  const name = req.params.name;

  let userdata = UserSchema.findOne({ name: name });
  if(!userdata) res.render({ error: "User not found" });

  console.log(userdata.name)
  res.render("register", {
      req: req,
  });
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// API //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post("/api/users/", async (req, res) => {
    let {name , password , email} = req.body
    let user = await UserSchema.findOne({email: email})
    if(user) return res.send(400, "User already exists")
    let userr = new UserSchema({
        name: name,
        password: password,
        email: email
    })
    await userr.save()
    return res.send(200, 'Valid Token provided');
});
app.post("/api/login/", async (req, res) => {
    let {name , password} = req.body
    let user = await UserSchema.findOne({name: name})
    if(!user) return res.send(400, "User does not exist")
    if(user.password !== password) return res.send(400, "Invalid password")
    if(user.password === password) {
    return res.json({ status: 200, user });
    }
});
////////////////////////////////////////////////////////////////////////////////
//Create a new string under UserSchema name string password string and save it to the database
app.post("/api/create/", async (req, res) => {
    let {name , password} = req.body
    let user = await UserSchema.findOne({name: name})
    if(!user) return res.send(400, "User does not exist")
    if(user.password !== password) return res.send(400, "Invalid password")
    if(user.password === password) {
      



    }
});

/////////////////////////////// SESSION ////////////////////////////////////////
app.listen(7777, () => {
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////////////////"
    );
    console.log(clc.white("App running at:"));
    console.log(clc.blue("- Local Server: 7777 "));
    console.log(clc.blue("- Website Server: localhost:7777"));
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////////////////"
    );
  });