
const db = require("../config/db");

const createPayment = (req, res) => {
  const {
    contract_id,
    paymentDate,
    amountPaid,
    remainingBalance,
    paymentType,
  } = req.body;
  const query =
    "INSERT INTO payment (contract_id, paymentDate, amountPaid, remainingBalance, paymentType) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [contract_id, paymentDate, amountPaid, remainingBalance, paymentType],
    (error, result) => {
      if (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Payment created successfully",
        paymentId: result.insertId,
      });
    }
  );
};


const getPayments = (req, res) => {
  db.query("SELECT * FROM payment", (error, result) => {
    if (error) {
      console.error("Error fetching payments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};


const getPaymentById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM payment WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching payment:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Payment not found",
      });
    }
  });
};


const updatePaymentById = (req, res) => {
  const id = req.params.id;
  const {
    contract_id,
    paymentDate,
    amountPaid,
    remainingBalance,
    paymentType,
  } = req.body;
  const query =
    "UPDATE payment SET contract_id = ?, paymentDate = ?, amountPaid = ?, remainingBalance = ?, paymentType = ? WHERE id = ?";
  db.query(
    query,
    [contract_id, paymentDate, amountPaid, remainingBalance, paymentType, id],
    (error, result) => {
      if (error) {
        console.error("Error updating payment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Payment updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Payment not found",
        });
      }
    }
  );
};


const deletePaymentById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM payment WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting payment:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Payment deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Payment not found",
      });
    }
  });
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
