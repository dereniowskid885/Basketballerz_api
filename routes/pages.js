const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
const frontEndDir = path.join(__dirname, "../../basketballerz");

router.get("/", (request, response) => {
    response.render(frontEndDir + "/index.hbs");
});

router.get("/register", (request, response) => {
    response.render(frontEndDir + "/register.hbs");
});

router.get("/game", (request, response) => {
    response.render(frontEndDir + "/game.hbs");
});

module.exports = router;