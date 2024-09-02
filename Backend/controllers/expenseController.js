const Expense = require('../models/Expense'); // Assuming you have an Expense model defined

// Add a new expense
const addExpense = async (req, res) => {
    const { description, amount } = req.body;
    const userId = req.userId; // Assuming the user ID is available in the request object

    try {
        const newExpense = await Expense.create({
            userId,
            description,
            amount
        });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
    const userId = req.userId;

    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addExpense, getExpenses };
