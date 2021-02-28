const { request } = require("express");
const path = require("path");
const frontEndDir = path.join(__dirname, "../../basketballerz");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Database Connection
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (request, response) => {
    console.log(request.body);
    const { username, password, password_confirm, e_mail, jersey_number, position } = request.body;
    
    database.query("SELECT e_mail FROM users WHERE e_mail = ?", [e_mail], async (error, result) => {
        if(error) {
            console.log(error);
        }
        
        if(password !== password_confirm) {
            return response.render(frontEndDir + "/register.hbs", {
                message: "Passwords do not match"
            });
        }
        
        if(result.length > 0) {
            return response.render(frontEndDir + "/register.hbs", {
                message: "E-mail is already in use"
            });
        } 

        let hashedPassword = await bcrypt.hash(password, 8);

        database.query("INSERT INTO users SET ?", {username: username, password: hashedPassword, e_mail: e_mail, jersey_number: jersey_number, position: position}, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                return response.render(frontEndDir + "/register.hbs", {
                    message: "Account created"
                });
            }
        });
    });
};