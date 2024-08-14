const express = require("express");
const { createPayment, getPaymentById, updatePaymentById, deletePaymentById, getPayments } = require("../controllers/payment");

const router = express.Router();

router.post("/", createPayment);
router.get("/get", getPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete(":id", deletePaymentById);

module.exports = router;
