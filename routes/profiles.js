const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/jwt.js");

router.get("/sign-token", profileCtrl.sign);
router.post("/verify-token", profileCtrl.verify);

module.exports = router;
