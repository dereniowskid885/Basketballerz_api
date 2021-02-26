const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
const frontEndDir = path.join(__dirname, "../../basketballerz");

router.get("/", (request, response) => {
    response.sendFile(frontEndDir + "/index.html");
});

router.get("/register", (request, response) => {
    response.sendFile(frontEndDir + "/register.html");
});

router.get("/game", (request, response) => {
    response.sendFile(frontEndDir + "/game.html");
});

module.exports = router;