const db = require("../config/db");
const mysql = require("mysql2");

const createContract = (req, res) => {
  const {
    customer_id,
    watch_id,
    creditTerm,
    initialPayment,
    totalAmount,
    monthlyPayment,
  } = req.body;
  const query = `
        INSERT INTO contract (customer_id, watch_id, contractDate, creditTerm, initialPayment, totalAmount, monthlyPayment)
        VALUES (?, ?, NOW(), ?, ?, ?, ?)
    `;
  db.query(
    query,
    [
      customer_id,
      watch_id,
      creditTerm,
      initialPayment,
      totalAmount,
      monthlyPayment,
    ],
    (error, result) => {
      if (error) {
        console.error("Error creating contract:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Contract created successfully",
        contractId: result.insertId,
      });
    }
  );
};

const getContracts = (req, res) => {
  const query = `
        SELECT contract.*, customer.first_name, customer.last_name, model.modelName, credit_terms.termDuration, credit_terms.interestPercentage
        FROM contract
        JOIN customer ON contract.customer_id = customer.id
        JOIN watches ON contract.watch_id = watches.id
        JOIN model ON watches.model_id = model.id
        JOIN credit_terms ON contract.creditTerm = credit_terms.id
    `;
  db.query(query, (error, result) => {
    if (error) {
      console.error("Error fetching contracts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({
      message: "OK",
      data: result,
    });
  });
};

const getContractById = (req, res) => {
  const id = req.params.id;
  const query = `
        SELECT contract.*, customer.first_name, customer.last_name, model.modelName, credit_terms.termDuration, credit_terms.interestPercentage
        FROM contract
        JOIN customer ON contract.customer_id = customer.id
        JOIN watches ON contract.watch_id = watches.id
        JOIN model ON watches.model_id = model.id
        JOIN credit_terms ON contract.creditTerm = credit_terms.id
        WHERE contract.id = ?
    `;
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error fetching contract:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Contract not found",
      });
    }
  });
};

const updateContractById = (req, res) => {
  const id = req.params.id;
  const {
    customer_id,
    watch_id,
    creditTerm,
    initialPayment,
    totalAmount,
    monthlyPayment,
  } = req.body;
  const query = `
        UPDATE contract
        SET customer_id = ?, watch_id = ?, creditTerm = ?, initialPayment = ?, totalAmount = ?, monthlyPayment = ?
        WHERE id = ?
    `;
  db.query(
    query,
    [
      customer_id,
      watch_id,
      creditTerm,
      initialPayment,
      totalAmount,
      monthlyPayment,
      id,
    ],
    (error, result) => {
      if (error) {
        console.error("Error updating contract:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({
          message: "Contract updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Contract not found",
        });
      }
    }
  );
};

const deleteContractById = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM contract WHERE id = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting contract:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Contract deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Contract not found",
      });
    }
  });
};

// yangi shartnomani qayd qilish va hisoblash shuyda:

const addContract = (req, res) => {
  const { customer_id, watch_id, contract_date, credit_term } = req.body;

  let basePrice = 0;
  let initialPayment = 0;
  let totalAmount = 0;
  let monthlyPayment = 0;
  let interestRate = 0;

  db.query(
    `SELECT m.basePrice FROM model m
    LEFT JOIN watches w ON m.id = w.model_id
    LEFT JOIN contract c ON w.id = c.watch_id
    WHERE w.id = ?`,
    [watch_id],
    (error, result) => {
      if (error) {
        console.log("Error fetching watch price", error);
        return res.status(500).json({
          statusCode: 500,
          message: "Error fetching watch price",
          error: "Internal Server Error",
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Watch not found",
          error: "Not Found",
        });
      }

      basePrice = result[0].basePrice;
      initialPayment = basePrice * 0.25;
      let principalAmount = basePrice - initialPayment;

      if (credit_term === 4) {
        interestRate = 32;
      } else if (credit_term === 7) {
        interestRate = 55;
      } else if (credit_term === 14) {
        interestRate = 70;
      } else {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid credit term",
          error: "Bad Request",
        });
      }

      totalAmount = principalAmount * (1 + interestRate / 100);
      monthlyPayment = totalAmount / credit_term;

      db.query(
        `INSERT INTO contract (customer_id, watch_id, contractDate, creditTerm, initialPayment, totalAmount, monthlyPayment)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          customer_id,
          watch_id,
          contract_date,
          credit_term,
          initialPayment,
          totalAmount,
          monthlyPayment,
        ],
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              statusCode: 500,
              message: "Error adding contract",
              error: "Internal Server Error",
            });
          }

          res.status(201).send({
            statusCode: 201,
            message: "Contract added successfully",
          });
        }
      );
    }
  );
};


// Birinchi Smart Query
// berilgan vaqt oralig'ida sotilgan mahsulotlar ro'yatini chiqarish

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sitora29&18!",
  database: "watch_credit_shop",
});

function getSoldProducts(connection, startDate, endDate) {
  const query = `
    SELECT 
        w.id AS watch_id,
        m.modelName,
        b.brandName,
        w.stockQuantity AS remaining_stock,
        p.paymentDate,
        p.amountPaid
    FROM 
        payment p
    JOIN 
        contract c ON p.contract_id = c.id
    JOIN 
        watches w ON c.watch_id = w.id
    JOIN 
        model m ON w.model_id = m.id
    JOIN 
        brand b ON m.brand_id = b.id
    WHERE 
        p.paymentDate BETWEEN ? AND ?
    ORDER BY 
        p.paymentDate;
  `;

  connection.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error fetching sold products:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log(results);
    }
  });
}

getSoldProducts(
  connection,
  "2024-01-01",
  "2024-06-30",
  (error, products) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Sold Products:", products);
    }
  }
);

// Ikkinchi Smart Query

const getExpireDate = (req, res) => {
  db.query(
    `SELECT p.id AS payment_id, c.id AS contract_id, p.paymentDate, p.amountPaid, p.remainingBalance, p.status
     FROM payment p
     JOIN contract c ON p.contract_id = c.id
     WHERE p.status = 'expired';`,
    (err, results) => {
      if (err) {
        console.log("Error fetching expired payments", err);
        return res
          .status(500)
          .json({ error: err.message, message: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "No expired payments found." });
      }
      res.json(results);
    }
  );
};



module.exports = {
  createContract,
  getContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  addContract,
  getSoldProducts,
  getExpireDate
};
