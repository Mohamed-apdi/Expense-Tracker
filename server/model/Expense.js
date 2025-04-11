import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"]
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true
});
 
const Expense = mongoose.model("Expense", ExpenseSchema);


export default Expense;
