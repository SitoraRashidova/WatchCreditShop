const db = require("../config/db");

const createExtraAccessory = (req, res) => {
  const { typeName, price } = req.body;
  const query = "INSERT INTO extra_accessories (typeName, price) VALUES (?, ?)";
  db.query(query, [typeName, price], (error, result) => {
    if (error) {
      console.error("Error creating extra accessory:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(201).json({
      message: "Extra accessory created successfully",
      accessoryId: result.insertId,
    });
  });
};

const getExtraAccessories = (req, res) => {
  db.query("SELECT * FROM extra_accessories", (error, result) => {
    if (error) {
      console.error("Error fetching extra accessories:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getExtraAccessoryById = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM extra_accessories WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching extra accessory:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length > 0) {
        res.json({
          message: "OK",
          data: result[0],
        });
      } else {
        res.status(404).json({
          message: "Extra accessory not found",
        });
      }
    }
  );
};

const updateExtraAccessoryById = (req, res) => {
  const id = req.params.id;
  const { typeName, price } = req.body;
  const query =
    "UPDATE extra_accessories SET typeName = ?, price = ? WHERE id = ?";
  db.query(query, [typeName, price, id], (error, result) => {
    if (error) {
      console.error("Error updating extra accessory:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Extra accessory updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Extra accessory not found",
      });
    }
  });
};

const deleteExtraAccessoryById = (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM extra_accessories WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error deleting extra accessory:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Extra accessory deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Extra accessory not found",
        });
      }
    }
  );
};

module.exports = {
  createExtraAccessory,
  getExtraAccessories,
  getExtraAccessoryById,
  updateExtraAccessoryById,
  deleteExtraAccessoryById,
};
