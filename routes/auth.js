const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const path = require("path")
const frontEndDir = path.join(__dirname, "../../basketballerz")

router.post("/register", authController.register)
router.post("/game", authController.login)

module.exports = router