const express = require("express");
const router = express.Router();
const { saveOrder, getAllOrders,getOrders } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, saveOrder);       // save order after payment
router.get("/", auth, getAllOrders);     // admin fetches all orders
router.get("/", auth, getOrders);
module.exports = router;

