function privateAccess(req, res, next) {
  console.log('🚀 ~ router.get ~ sessiooon:', req.user);

  if (!req.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = privateAccess;
