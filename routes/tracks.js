const express = require("express");
const router = express.Router();
const trackCtrl = require("../controllers/tracks");

///////////////////////////
// get tracks
///////////////////////////
router.get("/", trackCtrl.index);
router.get("/new", trackCtrl.create);
router.get("/delete", trackCtrl.remove);
router.get("/update", trackCtrl.update);

module.exports = router;
