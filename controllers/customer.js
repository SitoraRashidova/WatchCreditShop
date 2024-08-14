const db = require("../config/db");

const createCustomer = (req, res) => {
  const { first_name, last_name, phone_number, email, address, creditBalance } =
    req.body;
  const query =
    "INSERT INTO customer (first_name, last_name, phone_number, email, address, creditBalance) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [first_name, last_name, phone_number, email, address, creditBalance],
    (error, result) => {
      if (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Customer created successfully",
        customerId: result.insertId,
      });
    }
  );
};

const getCustomers = (req, res) => {
  db.query("SELECT * FROM customer", (error, result) => {
    if (error) {
      console.error("Error fetching customers:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getCustomerById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM customer WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching customer:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Customer not found",
      });
    }
  });
};

const updateCustomerById = (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, phone_number, email, address, creditBalance } =
    req.body;
  const query =
    "UPDATE customer SET first_name = ?, last_name = ?, phone_number = ?, email = ?, address = ?, creditBalance = ? WHERE id = ?";
  db.query(
    query,
    [first_name, last_name, phone_number, email, address, creditBalance, id],
    (error, result) => {
      if (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Customer updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Customer not found",
        });
      }
    }
  );
};

const deleteCustomerById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM customer WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Customer deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Customer not found",
      });
    }
  });
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};



