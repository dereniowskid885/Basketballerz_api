const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const frontEndDir = path.join(__dirname, "../../basketballerz")
const jwt = require("jsonwebtoken")

router.get("/", (request, response) => {
    response.render(frontEndDir + "/index.hbs")
})

router.get("/register", (request, response) => {
    response.render(frontEndDir + "/register.hbs")
});

router.get("/game", authToken, (request, response) => {
    response.render(frontEndDir + "/game.hbs")
})

function authToken(request, response, next) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return response.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (error, id) => {
        if (error) return response.sendStatus(403)
        request.id = id
        next()
    })

}

module.exports = router