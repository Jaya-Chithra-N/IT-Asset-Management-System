const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/', verifyToken, (req,res,next) => {
  if(req.user.role !== 'Admin') return res.status(403).json({message:'Access denied'});
  next();
}, userController.getUsers);

// Get single user
router.get('/:id', verifyToken, userController.getUserById);

// Update user
router.put('/:id', verifyToken, userController.updateUser);

// Delete user (Admin only)
router.delete('/:id', verifyToken, (req,res,next) => {
  if(req.user.role !== 'Admin') return res.status(403).json({message:'Access denied'});
  next();
}, userController.deleteUser);

module.exports = router;
