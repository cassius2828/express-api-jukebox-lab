const express = require("express");
const router = express.Router();
const trackCtrl = require("../controllers/tracks");

///////////////////////////
// get tracks
///////////////////////////

router.get("/", trackCtrl.index);

router.post("/", trackCtrl.create);

router.get("/:trackId", trackCtrl.show);

router.put("/:trackId", trackCtrl.update);

router.delete("/:trackId", trackCtrl.remove);

module.exports = router;
