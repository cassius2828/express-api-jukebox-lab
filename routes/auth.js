const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

///////////////////////////
// get tracks
///////////////////////////

router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.login);

module.exports = router;
