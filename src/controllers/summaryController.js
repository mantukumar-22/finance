import Record from "../models/Record.js";



export const summary = async (req, res) => {
  const records = await Record.find({ isDeleted: false });

  let income = 0;
  let expense = 0;

  const categoryTotals = {};

  records.forEach((r) => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;

    categoryTotals[r.category] =
      (categoryTotals[r.category] || 0) + r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
    categoryTotals,
  });
};

export const monthlsummary = async (req, res) => {
    try{
        const userId = req.user.id;
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const records = await Record.find({
            createdBy: userId,
            date: { $gte: firstDay, $lte: lastDay }
        });
        let income = 0;
        let expense = 0;

        records.forEach((r) => {
            if (r.type === "income") income += r.amount;
            else expense += r.amount;
        });

        res.json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error"
        });
    }
}

export default {
    summary,
    monthlsummary
}