const db = require("../config/db");

const createCreditTerm = (req, res) => {
  const { termDuration, interestPercentage } = req.body;
  const query =
    "INSERT INTO credit_terms (termDuration, interestPercentage) VALUES (?, ?)";
  db.query(query, [termDuration, interestPercentage], (error, result) => {
    if (error) {
      console.error("Error creating credit term:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(201).json({
      message: "Credit term created successfully",
      creditTermId: result.insertId,
    });
  });
};

const getCreditTerms = (req, res) => {
  db.query("SELECT * FROM credit_terms", (error, result) => {
    if (error) {
      console.error("Error fetching credit terms:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getCreditTermById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM credit_terms WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching credit term:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Credit term not found",
      });
    }
  });
};

const updateCreditTermById = (req, res) => {
  const id = req.params.id;
  const { termDuration, interestPercentage } = req.body;
  const query =
    "UPDATE credit_terms SET termDuration = ?, interestPercentage = ? WHERE id = ?";
  db.query(query, [termDuration, interestPercentage, id], (error, result) => {
    if (error) {
      console.error("Error updating credit term:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Credit term updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Credit term not found",
      });
    }
  });
};

const deleteCreditTermById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM credit_terms WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting credit term:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({

        message: "Credit term deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Credit term not found",
      });
    }
  });
};



module.exports = {
  createCreditTerm,
  getCreditTerms,
  getCreditTermById,
  updateCreditTermById,
  deleteCreditTermById,
};
