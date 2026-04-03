
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["income", "expense"] 
    },
    category: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    note: {
        type: String,
        maxlength: 500,
        required: false

    },
    createdAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

// module.exports = mongoose.model("Record", recordSchema);
const recordModel = mongoose.model('Record', recordSchema);

export default recordModel;