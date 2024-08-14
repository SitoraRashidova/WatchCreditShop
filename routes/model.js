const express = require("express");
const { createModel, getModelById, updateModelById, deleteModelById, getModels } = require("../controllers/model");

const router = express.Router();

router.post("/", createModel);
router.get("/get", getModels);
router.get("/:id", getModelById);
router.put("/:id", updateModelById);
router.delete("/:id", deleteModelById);

module.exports = router;
