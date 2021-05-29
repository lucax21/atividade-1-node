const express = require("express");
const routes = express.Router();
const DB = require("./times");

routes.get("/times", (req, res) => {
    res.status(200).json(DB.times);
});

module.exports = routes;