
const db = require("../config/db");

const createBrand = (req, res) => {
  const { brandName } = req.body;
  const query = "INSERT INTO brand (brandName) VALUES (?)";
  db.query(query, [brandName], (error, result) => {
    if (error) {
      console.error("Error creating brand:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(201).json({
      message: "Brand created successfully",
      brandId: result.insertId,
    });
  });
};

const getBrands = (req, res) => {
  db.query("SELECT * FROM brand", (error, result) => {
    if (error) {
      console.error("Error fetching brands:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getBrandById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM brand WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching brand:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Brand not found",
      });
    }
  });
};

const updateBrandById = (req, res) => {
  const id = req.params.id;
  const { brandName } = req.body;
  const query = "UPDATE brand SET brandName = ? WHERE id = ?";
  db.query(query, [brandName, id], (error, result) => {
    if (error) {
      console.error("Error updating brand:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Brand updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Brand not found",
      });
    }
  });
};

const deleteBrandById = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM brand WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error deleting brand:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Brand deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Brand not found",
      });
    }
  });
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
