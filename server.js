const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


//routes for product adding
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes); 



app.use("/api/cart", require("./routes/cartRoutes"));

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// const paymentRoutes = require("./routes/paymentRoutes");
// app.use("/api/payment", paymentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch(err => console.error(err));
