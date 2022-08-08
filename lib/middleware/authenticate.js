const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  try {
    const cookies = req.cookies && req.cookies[process.env.COOKIE_NAME];

    if (!cookies) throw new Error('Need sign in to continue.');

    
    const user = jwt.verify(cookies, process.env.JWT_SECRET);
    req.user = user;

    next();
  } 
  catch (err) {
    err.status = 401;
    next(err);
  }
};
