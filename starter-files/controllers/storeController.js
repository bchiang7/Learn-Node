// middleware allows you run thins _after_ the request but _before_ the response
exports.myMiddleware = (req, res, next) => {
  req.name = 'Brit';
  res.cookie('name', 'Brittany is cool', { maxAge: 7000000 });
  next();
};

exports.homePage = (req, res) => {
  // console.log(req.name);
  res.render('index');
};
