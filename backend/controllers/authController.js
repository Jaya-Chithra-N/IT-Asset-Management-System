const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret_key';

exports.signup = async (req, res) => {
  const {name,email,password,role,department} = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM Users WHERE email=?', [email]);
    if (existing.length) return res.status(400).json({message:'Email already exists'});
    
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO Users (name,email,password,role,department) VALUES (?,?,?,?,?)',
      [name,email,hashed,role,department]
    );
    res.status(201).json({message:'User created successfully'});
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

exports.login = async (req,res) => {
  const {email,password} = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM Users WHERE email=?', [email]);
    if (!rows.length) return res.status(400).json({message:'Invalid email or password'});
    
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message:'Invalid email or password'});

    const token = jwt.sign({user_id: user.user_id, role: user.role}, secret, {expiresIn:'1h'});
    res.json({token, role: user.role});
  } catch(err) {
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};
