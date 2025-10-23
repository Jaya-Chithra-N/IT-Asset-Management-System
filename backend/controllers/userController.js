const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, role, department, createdAt, updatedAt FROM Users');
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

// Get single user by ID (Admin or self)
exports.getUserById = async (req,res) => {
  const user_id = req.params.id;
  try {
    const [rows] = await db.query('SELECT user_id, name, email, role, department FROM Users WHERE user_id=?', [user_id]);
    if (!rows.length) return res.status(404).json({message:'User not found'});
    res.json(rows[0]);
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

// Update user (Admin or self)
exports.updateUser = async (req,res) => {
  const user_id = req.params.id;
  const {name, email, password, role, department} = req.body;

  try {
    // Check if updating password
    let query, params;
    if(password){
      const hashed = await bcrypt.hash(password,10);
      query = 'UPDATE Users SET name=?, email=?, password=?, role=?, department=? WHERE user_id=?';
      params = [name,email,hashed,role,department,user_id];
    } else {
      query = 'UPDATE Users SET name=?, email=?, role=?, department=? WHERE user_id=?';
      params = [name,email,role,department,user_id];
    }

    await db.query(query, params);
    res.json({message:'User updated successfully'});
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req,res) => {
  const user_id = req.params.id;
  try {
    await db.query('DELETE FROM Users WHERE user_id=?', [user_id]);
    res.json({message:'User deleted successfully'});
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};
