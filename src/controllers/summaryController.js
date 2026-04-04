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


export default {
    summary
}