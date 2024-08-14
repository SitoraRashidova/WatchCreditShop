const express = require("express");
const { createCreditTerm, getCreditTerms, getCreditTermById, updateCreditTermById, deleteCreditTermById } = require("../controllers/credit_terms");

const router = express.Router();

router.post("/", createCreditTerm);
router.get("/get", getCreditTerms);
router.get("/:id", getCreditTermById);
router.put("/:id", updateCreditTermById);
router.delete("/:id", deleteCreditTermById);

module.exports = router;
