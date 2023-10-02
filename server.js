const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const morgan = require("morgan"); //Use morgan for logging purposes

if (process.env.NODE_ENV === "development") {
  //app.use(morgan('combined :method :url :status :res[content-length] - :response-time ms'))
  app.use(morgan("combined"));
}

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//const app = require('./app');
//new code

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//routes
const loanRoute = require("./routes/loanRoutes");
app.use("/loans", loanRoute);

//connecting to the database
const mongoose = require("mongoose");

//Synchronous connection
// mongoose.connect('mongodb://localhost:27017/StudentDB', {useNewUrlParse: true} , (err) => {
//     if(!err){console.log('MongoDB Connection Succeeded.')}
//     else{console.log('Error in DB connection : ' + err)}
// })

//Asynchronous connection
mongoose
  .connect("mongodb+srv://sai123:sai123@cluster0.obgxf9y.mongodb.net/")
  .then(() => console.log("MongoDB connection Succesful"))
  .catch((err) => console.error(err));
