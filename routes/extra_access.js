const express = require("express");
const { createExtraAccessory, getExtraAccessories, getExtraAccessoryById, updateExtraAccessoryById, deleteExtraAccessoryById } = require("../controllers/extra_access");

const router = express.Router();

router.post("/", createExtraAccessory);
router.get("/get", getExtraAccessories);
router.get("/:id", getExtraAccessoryById);
router.put("/:id", updateExtraAccessoryById);
router.delete("/:id", deleteExtraAccessoryById);

module.exports = router;
