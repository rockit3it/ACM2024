const mongoose = require("mongoose");

const { Schema } = mongoose;

const PatientSchema = new Schema(
    {
        Name : {
            type : String,
            required : true,
        },
        Password: {
            type : String,
            required : true,
        },
        Dob:{
            type : Number,
            required : true,
        },
        Age:{
            type : Number,
            required : true,
        },
        Gender:{
            type : String,
            required : true
        },
        Address:{
            type : String,
            required : true
        },
        City: String,
        PhoneNumber : Number,
        Email:String

    },
);

const Patient = mongoose.model("Patient", PatientSchema);


module.exports = Patient;