const express = require("express");
const indexRouter = express.Router();

const brandRoute = require("./brand");
const contractRoute = require("./contract");
const creditTermsRoute = require("./credit_terms");
const customerRoute = require("./customer");
const extraAccessRoute = require("./extra_access");
const modelRoute = require("./model");
const paymentRoute = require("./payment");
const watchesRoute = require("./watches");

indexRouter.use("/brand", brandRoute);
indexRouter.use("/contract", contractRoute);
indexRouter.use("/creditTerms", creditTermsRoute);
indexRouter.use("/customer", customerRoute);
indexRouter.use("/extraAccess", extraAccessRoute);
indexRouter.use("/model", modelRoute);
indexRouter.use("/payment", paymentRoute);
indexRouter.use("/watches", watchesRoute);

module.exports = indexRouter;