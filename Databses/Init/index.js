const mongoose = require("mongoose");
const init_data = require("./data.js");
const Patient = require("../Models/Patients.js");
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

let init_db = async()=>{
    await Patient.deleteMany();
    await Patient.insertMany(init_data.data);
    console.log("database is cleaned and initialised again");
}

init_db();
