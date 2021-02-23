const express = require("express");
const app = express();

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/", (request, response) => {
    response.send("<h1>Hello !</h1>")
});


