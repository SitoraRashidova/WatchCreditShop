const express = require("express");
const { getCustomers, getCustomerById, createCustomer, updateCustomerById, deleteCustomerById } = require("../controllers/customer");

const router = express.Router();

router.post("/", createCustomer);
router.get("/get", getCustomers);
router.get("/:id", getCustomerById);
router.patch("/:id", updateCustomerById);
router.delete("/:id", deleteCustomerById);

module.exports = router;
