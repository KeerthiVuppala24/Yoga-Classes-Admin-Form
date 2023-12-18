const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: ") + err);
});

router.route("/").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const age = req.body.age;
  const fee = req.body.fee;
  const slot = req.body.slot;

  const newUser = new User({
    name,
    email,
    phno,
    age,
    fee,
    slot,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
