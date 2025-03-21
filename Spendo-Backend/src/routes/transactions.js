const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Get all transactions for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId })
      .populate('category', 'name icon color')
      .sort({ date: -1 });
    
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('category', 'name icon color');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { user: userId, amount, type } = req.body;
    
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    
    const user = await User.findById(userId);
    if (user) {
      if (type === 'income') {
        user.balance += amount;
      } else {
        user.balance -= amount;
      }
      await user.save();
    }
    
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    if (req.body.amount !== transaction.amount || req.body.type !== transaction.type) {
      const user = await User.findById(transaction.user);
      
      if (transaction.type === 'income') {
        user.balance -= transaction.amount;
      } else {
        user.balance += transaction.amount;
      }
      
      if (req.body.type === 'income') {
        user.balance += req.body.amount;
      } else {
        user.balance -= req.body.amount;
      }
      
      await user.save();
    }
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('category', 'name icon color');
    
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    const user = await User.findById(transaction.user);
    if (user) {
      if (transaction.type === 'income') {
        user.balance -= transaction.amount;
      } else {
        user.balance += transaction.amount;
      }
      await user.save();
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get transaction statistics
router.get('/stats/user/:userId', async (req, res) => {
  try {
    const { period = 'week', userId } = req.params;
    let dateFilter = {};
    
    const now = new Date();
    if (period === 'week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 7);
      dateFilter = { date: { $gte: weekStart } };
    } else if (period === 'month') {
      const monthStart = new Date(now);
      monthStart.setMonth(now.getMonth() - 1);
      dateFilter = { date: { $gte: monthStart } };
    } else if (period === 'year') {
      const yearStart = new Date(now);
      yearStart.setFullYear(now.getFullYear() - 1);
      dateFilter = { date: { $gte: yearStart } };
    }
    
    const incomeTotal = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), type: 'income', ...dateFilter } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const expenseTotal = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), type: 'expense', ...dateFilter } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), type: 'expense', ...dateFilter } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { 
        name: '$category.name', 
        icon: '$category.icon',
        color: '$category.color',
        amount: '$total'
      }}
    ]);
    
    const totalExpense = expenseTotal.length > 0 ? expenseTotal[0].total : 0;
    const categoriesWithPercentage = categoryBreakdown.map(cat => ({
      ...cat,
      percentage: totalExpense > 0 ? Math.round((cat.amount / totalExpense) * 100) : 0
    }));
    
    res.json({
      income: incomeTotal.length > 0 ? incomeTotal[0].total : 0,
      expense: totalExpense,
      categories: categoriesWithPercentage
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;