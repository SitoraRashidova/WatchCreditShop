
const db = require("../config/db");

const createModel = (req, res) => {
  const { brand_id, modelName, type, year, basePrice, description } = req.body;
  const query =
    "INSERT INTO model (brand_id, modelName, type, year, basePrice, description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [brand_id, modelName, type, year, basePrice, description],
    (error, result) => {
      if (error) {
        console.error("Error creating model:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Model created successfully",
        modelId: result.insertId,
      });
    }
  );
};

const getModels = (req, res) => {
  db.query("SELECT * FROM model", (error, result) => {
    if (error) {
      console.error("Error fetching models:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getModelById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM model WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching model:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Model not found",
      });
    }
  });
};

const updateModelById = (req, res) => {
  const id = req.params.id;
  const { brand_id, modelName, type, year, basePrice, description } = req.body;
  const query =
    "UPDATE model SET brand_id = ?, modelName = ?, type = ?, year = ?, basePrice = ?, description = ? WHERE id = ?";
  db.query(
    query,
    [brand_id, modelName, type, year, basePrice, description, id],
    (error, result) => {
      if (error) {
        console.error("Error updating model:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Model updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Model not found",
        });
      }
    }
  );
};

const deleteModelById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM model WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting model:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Model deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Model not found",
      });
    }
  });
};

module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModelById,
  deleteModelById,
};

