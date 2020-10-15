const setUser = function(req, res, next) {
  if (req.session.user) {
    // ローカル変数にユーザー名を保存
    res.locals.loginUser = req.session.user;
  }
  next();
};

module.exports = setUser;