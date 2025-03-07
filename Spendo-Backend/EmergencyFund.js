const mongoose = require("mongoose");

const EmergencyFundSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },    monthlyExpenses: {
        type: Number,
        default: 0
    },
    targetMonths: {
        type: Number,
        default: 3 
    },
    targetAmount: {
        type: Number,
        default: 0 
    },
    currentSavings: {
        type: Number,
        default: 0 
    }1
}, { timestamps: true });

module.exports = mongoose.model("EmergencyFund", EmergencyFundSchema);
