const TrackModel = require("../models/track");

const index = async (req, res) => {
  res.send("index route");
};

const create = async (req, res) => {
  res.send("create track doc");
};
const update = async (req, res) => {
    res.send("update track doc");
  };
  const remove = async (req, res) => {
    res.send("remove track doc");
  };
module.exports = {
  index,create,update,remove
};
