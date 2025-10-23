const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, assignmentController.assignAsset);
router.get('/my-assets', verifyToken, assignmentController.myAssets);
router.get('/', verifyToken, assignmentController.allAssignments); // admin view
router.put('/return/:id', verifyToken, assignmentController.returnAsset);


module.exports = router;
