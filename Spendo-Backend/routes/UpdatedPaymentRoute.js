const express = require("express");
const router = express.Router();
const EmergencyFund = require("../models/EmergencyFund");
const Payment = require("../models/Payment");


router.post("/pay-boarding-fees", async (req, res) => {

    console.log("USser")
    const { userId, amount } = req.body;

    if (!userId || !amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid user ID or amount" });
    }

    try {
        const payment = new Payment({ userId, amount, date: new Date() });
        await payment.save();

        
        const emergencyAmount = parseFloat((amount * 0.10).toFixed(2));

        
        let fund = await EmergencyFund.findOne({ userId });
        if (!fund) {
            fund = new EmergencyFund({
                userId,
                monthlyExpenses: 0, 
                targetMonths: 3, 
                targetAmount: 0, 
                currentSavings: 0
            });
        }

        
        fund.currentSavings += emergencyAmount;
        await fund.save();
        

        res.status(201).json({
            message: "Payment successful! 10% allocated to emergency fund.",
            payment,
            emergencyFund: fund
        });

    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ error: "Internal Server Error. Please try again." });
    }
});

module.exports = router;

