"use strict";
const path = require("path");
const fs = require("fs");

module.exports = async (req, res, next) => {
  const rawdata = fs.readFileSync(path.resolve(__dirname, "./players.json"));

  if (req.method === "GET" && req.path === "/players") {
    const players = JSON.parse(rawdata).players;
    res.json(players.map((player) => ({ id: player.id, name: player.name })));
  } else {
    next();
  }
  
};
