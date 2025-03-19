const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());


const emergencyFundRoutes = require("./routes/UpdatedPaymentRoute");
app.use("/api/emergency-fund", emergencyFundRoutes);


app.get("/", (req, res) => {
  res.send("Emergency Fund Planner API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


