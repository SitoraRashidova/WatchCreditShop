const express = require("express");
const { createWatch, getWatchById, updateWatchById, deleteWatchById, getWatches } = require("../controllers/watches");

const router = express.Router();

router.post("/", createWatch);
router.get("/get", getWatches);
router.get("/:id", getWatchById);
router.put("/:id", updateWatchById);
router.delete("/:id", deleteWatchById);


module.exports = router;