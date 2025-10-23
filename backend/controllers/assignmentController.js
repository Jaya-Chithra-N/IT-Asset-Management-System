const db = require('../config/db');

// Assign asset (already included)
exports.assignAsset = async (req,res) => {
  const {asset_id,user_id} = req.body;
  try {
    // Insert into Assignments
    await db.query(
      'INSERT INTO Assignments (asset_id,user_id) VALUES (?,?)',
      [asset_id,user_id]
    );
    // Update asset status
    await db.query('UPDATE Assets SET status=?, assigned_to=? WHERE asset_id=?', ['Assigned', user_id, asset_id]);
    res.status(201).json({message:'Asset assigned'});
  } catch(err) { res.status(500).json({message:'Server error'}); }
};

// Employee: get assets assigned to logged-in user
exports.myAssets = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.asset_id, a.name, a.type, a.category, a.serial_number, a.status AS asset_status, 
              asn.assignment_id, asn.status AS assignment_status, asn.assigned_date
       FROM Assets a
       JOIN Assignments asn ON a.asset_id = asn.asset_id
       WHERE asn.user_id = ? AND asn.status = "Assigned"
       ORDER BY asn.assigned_date DESC`,
      [req.user.user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Employee: Return asset
exports.returnAsset = async (req, res) => {
  const assignment_id = req.params.id;
  try {
    // Get asset_id and user_id
    const [rows] = await db.query(
      'SELECT asset_id, user_id FROM Assignments WHERE assignment_id = ?',
      [assignment_id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Assignment not found' });

    const { asset_id, user_id } = rows[0];

    // Check authorization
    if (req.user.user_id !== user_id && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Not authorized to return this asset' });

    // Delete assignment
    await db.query('DELETE FROM Assignments WHERE assignment_id = ?', [assignment_id]);

    // Update asset as available
    await db.query('UPDATE Assets SET status = "Available", assigned_to = NULL WHERE asset_id = ?', [asset_id]);

    res.json({ message: 'Asset returned successfully and is now available' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Admin: get all assigned assets
exports.allAssignments = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') 
      return res.status(403).json({ message: 'Not authorized' });

    const [rows] = await db.query(`
      SELECT asn.assignment_id, u.name AS user_name, a.name AS asset_name, asn.status AS assignment_status, asn.assigned_date
      FROM Assignments asn
      JOIN Users u ON asn.user_id = u.user_id
      JOIN Assets a ON asn.asset_id = a.asset_id
      ORDER BY asn.assigned_date DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

