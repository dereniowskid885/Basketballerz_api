const path = require("path")
const frontEndDir = path.join(__dirname, "../../basketballerz")
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Database Connection
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.login = async (request, response, next) => {
    try {
        const { username, password } = request.body

        if(!username || !password) {
            return response.status(400).render(frontEndDir + "/index.hbs", {
                message: "Please enter login and password"
            })
        }

        database.query("SELECT * FROM users WHERE username = ?", [username], async (error, result) => {
            console.log(result)
            if(!result || !(await bcrypt.compare(password, result[0].password))) {
                response.status(401).render(frontEndDir + "/index.hbs", {
                    message: "Username or password is incorrect"
                })
            } else {
                const id = result[0].id
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                
                console.log("The token is: " + token)

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                response.cookie("sessionToken", token, cookieOptions)
                return response.status(200).redirect("/game")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.register = (request, response) => {
    console.log(request.body)
    const { username, password, password_confirm, e_mail, jersey_number, position } = request.body
    
    database.query("SELECT * FROM users WHERE username = ?", [username], (error, result) => {
        if(error) {
            console.log(error)
        }

        console.log(result)
        if(password !== password_confirm) {
            return response.render(frontEndDir + "/register.hbs", {
                message: "Passwords do not match"
            })
        }
        
        if(result.length > 0) {
            return response.render(frontEndDir + "/register.hbs", {
                message: "Username is already in use"
            })
        }

        database.query("SELECT * FROM users WHERE e_mail = ?", [e_mail], async (error, result) => {
            if(error) {
                console.log(error)
            }

            console.log(result)
            if(result.length > 0) {
                return response.render(frontEndDir + "/register.hbs", {
                    message: "E-mail is already in use"
                })
            }

            let hashedPassword = await bcrypt.hash(password, 8)

            database.query("INSERT INTO users SET ?", {username: username, password: hashedPassword, e_mail: e_mail, jersey_number: jersey_number, position: position}, (error, result) => {
                if(error) {
                    console.log(error)
                } else {
                    return response.render(frontEndDir + "/register.hbs", {
                        message: "Account created"
                    })
                }
            })
        })
    })
}