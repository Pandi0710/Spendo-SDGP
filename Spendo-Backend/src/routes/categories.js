const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories (default + user's custom categories)
router.get('/user/:userId', async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [
        { user: req.params.userId },
        { isDefault: true }
      ]
    }).sort({ name: 1 });
    
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (category.isDefault) {
      return res.status(403).json({ message: 'Cannot modify default categories' });
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (category.isDefault) {
      return res.status(403).json({ message: 'Cannot delete default categories' });
    }
    
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create default categories
router.post('/defaults', async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Education', icon: 'school-outline', color: '#60A5FA', isDefault: true },
      { name: 'Rentals', icon: 'key-outline', color: '#34D399', isDefault: true },
      { name: 'Foods', icon: 'restaurant-outline', color: '#F472B6', isDefault: true },
      { name: 'Transport', icon: 'airplane-outline', color: '#A78BFA', isDefault: true },
      { name: 'Entertainment', icon: 'film-outline', color: '#FBBF24', isDefault: true },
      { name: 'Shopping', icon: 'cart-outline', color: '#EC4899', isDefault: true },
      { name: 'Health', icon: 'medical-outline', color: '#10B981', isDefault: true },
      { name: 'Bills', icon: 'receipt-outline', color: '#6366F1', isDefault: true },
      { name: 'Salary', icon: 'cash-outline', color: '#10B981', isDefault: true },
      { name: 'Investments', icon: 'trending-up-outline', color: '#8B5CF6', isDefault: true }
    ];
    
    const existingDefaults = await Category.find({ isDefault: true });
    
    if (existingDefaults.length > 0) {
      return res.status(400).json({ message: 'Default categories already exist' });
    }
    
    const savedCategories = await Category.insertMany(defaultCategories);
    res.status(201).json(savedCategories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;