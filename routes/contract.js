const express = require("express");
const { createContract, getContracts, getContractById, updateContractById, deleteContractById, addContract, getSoldProducts, getExpireDate } = require("../controllers/contract");

const router = express.Router();

router.post("/cr", createContract);
router.post("/newContract", addContract);
router.get("/expDate", getExpireDate);
router.get("/get", getContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContractById);
router.delete("/:id", deleteContractById);
router.get("/soldProduct", getSoldProducts);



module.exports = router;
