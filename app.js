const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

const frontEndDir = path.join(__dirname, "../basketballerz");
app.use(express.static(frontEndDir));

dotenv.config({ path: "./.env"});

const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

database.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL connected");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
