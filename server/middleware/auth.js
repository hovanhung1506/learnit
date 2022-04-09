const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log(decode);
    req.userId = decode.userId;
    // console.log(req.userId);
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ success: false, message: 'Token is not valid' });
  }
}

module.exports = verifyToken;