const db = require('../config/db');

exports.getAssets = async (req,res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Assets');
    res.json(rows);
  } catch(err) { res.status(500).json({message:'Server error'}); }
};

exports.addAsset = async (req,res) => {
  const {name,type,category,serial_number,purchase_date,warranty_end,status} = req.body;
  try {
    await db.query(
      'INSERT INTO Assets (name,type,category,serial_number,purchase_date,warranty_end,status) VALUES (?,?,?,?,?,?,?)',
      [name,type,category,serial_number,purchase_date,warranty_end,status]
    );
    res.status(201).json({message:'Asset added'});
  } catch(err) { res.status(500).json({message:'Server error'}); }
};

exports.updateAsset = async (req,res) => {
  const asset_id = req.params.id;
  const {name,type,category,serial_number,purchase_date,warranty_end,status} = req.body;
  try {
    await db.query(
      'UPDATE Assets SET name=?,type=?,category=?,serial_number=?,purchase_date=?,warranty_end=?,status=? WHERE asset_id=?',
      [name,type,category,serial_number,purchase_date,warranty_end,status,asset_id]
    );
    res.json({message:'Asset updated'});
  } catch(err) { res.status(500).json({message:'Server error'}); }
};

exports.deleteAsset = async (req,res) => {
  const asset_id = req.params.id;
  try {
    await db.query('DELETE FROM Assets WHERE asset_id=?', [asset_id]);
    res.json({message:'Asset deleted'});
  } catch(err) { res.status(500).json({message:'Server error'}); }
};
