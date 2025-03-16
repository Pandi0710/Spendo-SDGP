const mongoose = require("mongoose");

const EmergencyFundSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    }, 
    currentSavings: {
        type: Number,
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model("EmergencyFund", EmergencyFundSchema);
