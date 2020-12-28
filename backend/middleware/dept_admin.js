module.exports = function (req, res, next) {
  if (req.user.is_hod || req.user.is_spc) {
    next();
  } else {
    return res.status(400).send("Access Denied!");
  }
};
