const express = require("express");
const router = express.Router();
const { createProduct,deleteProduct,updateProduct, getProductById, getProducts } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/add-product", authMiddleware, adminMiddleware, createProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts);

router.delete("/products/:id",authMiddleware, adminMiddleware, deleteProduct)
router.put("/products/:id",authMiddleware, adminMiddleware, updateProduct)
module.exports = router;
