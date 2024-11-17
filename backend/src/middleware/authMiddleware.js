
function ensureAuthenticated(req, res, next) {
    if (req.session.accessToken) {
      return next();
    }
    res.redirect('http://localhost:5174/login');
  }
  
  module.exports = ensureAuthenticated;