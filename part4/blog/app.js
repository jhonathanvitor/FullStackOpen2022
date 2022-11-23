const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const blogRotes = require("./routes/blogRotes");


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({  extended: false }));
app.use(blogRotes);


// Routes
app.get("/", (req, res) => {
    res.send("HOME page")
})


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server rinning port ${PORT}`)
        });
    })
    .catch((err) => console.log(err))
