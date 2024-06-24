const TrackModel = require("../models/track");

//////////////////////
// GET | index*
//////////////////////
const index = async (req, res) => {
  try {
    const allTracks = await TrackModel.find({});
    if (!allTracks) {
      res.status(400);
      throw new Error("Could not retrieve tracks");
    }
    res.status(200).json(allTracks);
  } catch (err) {
    if (res.statusCode === 404) {
      return res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

//////////////////////
// ? POST | create*
//////////////////////
const create = async (req, res) => {
  const newTrackDocData = req.body;
  try {
    const newTrackDoc = await TrackModel.create(newTrackDocData);
    res.status(201).json(newTrackDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//////////////////////
// *PUT | update*
//////////////////////
const update = async (req, res) => {
  const { trackId } = req.params;
  try {
    const trackToUpdate = await TrackModel.findByIdAndUpdate(
      trackId,
      req.body,
      { new: true }
    );
    if (!trackToUpdate) {
      res.status(404);
      throw new Error("Track to update could not be found");
    }
    res.status(200).json(trackToUpdate);
  } catch (err) {
    if (res.statusCode === 404) {
      return res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

//////////////////////
// ! DELETE | remove*
//////////////////////
const remove = async (req, res) => {
  const { trackId } = req.params;
  try {
    const trackToRemove = await TrackModel.findByIdAndDelete(trackId);
    if (!trackToRemove) {
      res.status(404);
      throw new Error("Track to remove could not be found");
    } else res.status(200).json(trackToRemove);
  } catch (err) {
    if (res.statusCode === 404) {
      return res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

//////////////////////
// GET | show*
//////////////////////
const show = async (req, res) => {
  const { trackId } = req.params;
  try {
    const selectedTrack = await TrackModel.findById(trackId);
    if (!selectedTrack) {
      res.status(404);
      throw new Error("Track could not be found");
    } else res.status(200).json(selectedTrack);
  } catch (err) {
    if (res.statusCode === 404) {
      return res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  index,
  create,
  update,
  remove,
  show,
};
