const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret_key';

module.exports = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({message: 'No token provided'});

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({message: 'No token provided'});

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({message: 'Failed to authenticate token'});
    req.user = decoded;
    next();
  });
};
