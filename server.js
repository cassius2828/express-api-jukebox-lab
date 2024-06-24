const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;
///////////////////////////
// DB Connection
///////////////////////////
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

///////////////////////////
// Middleware
///////////////////////////
// cors middleware
app.use(cors());
// encoding
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride("_method"));

// morgan http logs
app.use(morgan("dev"));

// json parse middle ware
app.use(express.json());


///////////////////////////
// routers
///////////////////////////
const tracksRouter = require('./routes/tracks')


///////////////////////////
// routes
///////////////////////////
app.use('/tracks', tracksRouter)






// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})