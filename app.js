const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// Setting Front End Directory
const frontEndDir = path.join(__dirname, "../basketballerz");
app.use(express.static(frontEndDir));
app.set("view engine", "hbs");

// Parse URL-encoded bodies (sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (sent by API clients)
app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: "./.env" });

// Database Connection
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

//Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});