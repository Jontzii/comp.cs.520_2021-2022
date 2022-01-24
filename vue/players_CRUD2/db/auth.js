"use strict";
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getCredentials = (request) => {
  const authHead = request.headers["authorization"];
  if (authHead) {
    const [type, auth] = authHead.split(" ");
    if (type === "Basic") {
      const buff = Buffer.from(auth, "base64");
      const credsStr = buff.toString("utf-8");
      return credsStr.split(":");
    }
  }
  return null;
};

module.exports = async (req, res, next) => {
  
    const creds = getCredentials(req);
    if (!creds || creds.length !== 2) return res.sendStatus(401);

    const [username, password] = creds;

    const rawdata = fs.readFileSync(path.resolve(__dirname, "./players.json"));
    const users = JSON.parse(rawdata).users;

    const currUser = users.find((user) => user.username === username);

    // Register User
    if (req.method === "POST" && req.path === "/users") {
      // Check if user exists already
      if (currUser) return res.sendStatus(400);
      return bcrypt.genSalt(saltRounds, function (err, salt) {
        return bcrypt.hash(password, salt, function (err, hash) {
          if (err) return res.sendStatus(500);

          req.body.username = username;
          req.body.password = hash;
          next();
        });
      });
    }

    // Check if user exists
    if (!currUser) return res.sendStatus(401);

    // Auth user
    bcrypt.compare(
      password,
      currUser.password,
      function (_err, isCorrectPassword) {
        if (!isCorrectPassword) return res.sendStatus(401);
        next();
      }
    );
};
