const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const InnoMed = require("./Databses/Models/Patients.js");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public'), (err) => {
    if (err) {
        console.error('Error serving static files:', err);
    }
}));

const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/InnoMed";
main().
then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
app.get("/",(req, res)=>{
    res.render("index.ejs");
    // res.send("this is root");
})

app.get("/signIn",(req, res)=>{
    res.render("signIn.ejs");
})
app.post("/signIn", async(req, res)=>{
        await InnoMed.insertMany({...req.body.patient}).then(()=>{
            console.log("patient added successfuly");
        }).catch((err)=>{
            console.log(err);
        })
        console.log({...req.body.patient});
        res.redirect("/signIn");
})
app.get("/patient", async (req, res) => {
    res.render("patient.ejs");
});

app.get("/patient/new",(req,res)=>{
    res.render("SignUp.ejs");
})
app.post("/signin/auth", async (req, res) => {

    let { Email, psd ,} = req.body;
    try {
        const user = await InnoMed.findOne({ Email: Email , Password : psd});
        if (user) {
            // console.log("User found:", user);
            let id = user._id;
            res.redirect("/patient");
            // res.render("User authenticated");
        } else {
            console.log("wrong credentials");
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

   
 // let findData = InnoMed.find({$where})})