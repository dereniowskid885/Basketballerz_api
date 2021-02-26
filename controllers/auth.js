const { request } = require("express");

exports.register = (request, response) => {
    console.log(request.body);
    response.send("Form submitted");
};