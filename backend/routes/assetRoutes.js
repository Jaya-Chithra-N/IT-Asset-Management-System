const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, assetController.getAssets);
router.post('/', verifyToken, assetController.addAsset);
router.put('/:id', verifyToken, assetController.updateAsset);
router.delete('/:id', verifyToken, assetController.deleteAsset);

module.exports = router;
