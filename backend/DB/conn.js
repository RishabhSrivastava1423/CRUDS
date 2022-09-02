require("dotenv").config();

const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${username}:${password}@curd.mo27vjc.mongodb.net/CURD_APP?retryWrites=true&w=majority`
 mongoose.connect(URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
 }).then(()=> console.log("connection etablished")).catch((error)=> console.log(error));