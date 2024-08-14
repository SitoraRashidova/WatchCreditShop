const db = require("../config/db");

const createWatch = (req, res) => {
  const { model_id, stockQuantity, extra_access_id } = req.body;
  const query =
    "INSERT INTO watches (model_id, stockQuantity, extra_access_id) VALUES (?, ?, ?)";
  db.query(
    query,
    [model_id, stockQuantity, extra_access_id],
    (error, result) => {
      if (error) {
        console.error("Error creating watch:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Watch created successfully",
        watchId: result.insertId,
      });
    }
  );
};

const getWatches = (req, res) => {
  db.query("SELECT * FROM watches", (error, result) => {
    if (error) {
      console.error("Error fetching watches:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getWatchById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM watches WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching watch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Watch not found",
      });
    }
  });
};

const updateWatchById = (req, res) => {
  const id = req.params.id;
  const { model_id, stockQuantity, extra_access_id } = req.body;
  const query =
    "UPDATE watches SET model_id = ?, stockQuantity = ?, extra_access_id = ? WHERE id = ?";
  db.query(
    query,
    [model_id, stockQuantity, extra_access_id, id],
    (error, result) => {
      if (error) {
        console.error("Error updating watch:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Watch updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Watch not found",
        });
      }
    }
  );
};

const deleteWatchById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM watches WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting watch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Watch deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Watch not found",
      });
    }
  });
};

module.exports = {
  createWatch,
  getWatches,
  getWatchById,
  updateWatchById,
  deleteWatchById,
};
