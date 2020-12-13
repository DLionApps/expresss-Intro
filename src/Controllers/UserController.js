const express = require("express");
const app = express();
const UserModel = require("../Models/UserModel");

module.exports = (app) => {
  var router = express.Router();

  router.post("/user", (req, res) => {
    const userObj = req.body;
    const query = UserModel.where({ email: userObj.email });
    query.findOne((err, user) => {
      if (err) {
        console.log(err);
      }
      if (user === null) {
        UserModel.create(userObj, (error, data) => {
          if (error) {
            res.status(500).send({
              message: error.message || "Cannot create User",
            });
          } else {
            res.status(201).send(data);
          }
        });
      } else {
        res.status(403).send({
          message: "User already exists",
        });
      }
    });
  });

  router.get("/users", (req, res) => {
    UserModel.find((err, data) => {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: err,
        });
      } else {
        res.status(200).send(data);
      }
    });
  });

  router.get("/user/:id", (req, res) => {
    UserModel.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: err,
        });
      } else {
        res.status(200).send(data);
      }
    });
  });

  router.put("/user/:id", (req, res) => {
    const userObj = req.body;
    const query = UserModel.where({ _id: req.params.id });
    query.findOne((err, user) => {
      if (err) {
        console.log(err);
      }
      if (user !== null) {
        UserModel.findOneAndUpdate(
          { _id: req.params.id },
          userObj,
          {
            new: true,
          },
          (err, data) => {
            if (err) {
              res.status(500).send({
                statusCode: 500,
                message: err,
              });
            } else {
              res.status(200).send(data);
            }
          }
        );
      } else {
        res.status(403).send({
          message: "User not available",
        });
      }
    });
  });

  router.delete("/user/:id", (req, res) => {
    UserModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: err,
        });
      } else {
        res.status(200).send(data);
      }
    });
  });

  app.use("/", router);
};
