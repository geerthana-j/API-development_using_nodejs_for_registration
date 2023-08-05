const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

function isValidPassword(password) {
    // Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
function generateAccessToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  const accessToken = jwt.sign(payload, SECRET_KEY, options);
  return accessToken;
}
function verifyToken(authHeader) {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
      } catch (error) {
        return false;
      }
        return true;
  
    }
}
module.exports = { isValidPassword , generateAccessToken, verifyToken };