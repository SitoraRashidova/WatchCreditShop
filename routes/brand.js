const express = require("express");
const { createBrand, getBrands, getBrandById, updateBrandById, deleteBrandById } = require("../controllers/brand");

const router = express.Router();

router.post("/", createBrand);
router.get("/get", getBrands);
router.get("/:id", getBrandById);
router.put("/:id", updateBrandById);
router.delete("/:id", deleteBrandById);

module.exports = router;