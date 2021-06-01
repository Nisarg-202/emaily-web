module.exports = function (req, res, next) {
  if (req.user.amount > 0) {
    next();
  } else {
    res.redirect('/dashboard');
  }
};
