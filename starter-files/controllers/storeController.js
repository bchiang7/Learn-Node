// middleware allows you run thins _after_ the request but _before_ the response
exports.myMiddleware = (req, res, next) => {
  req.name = 'Brit';
  res.cookie('name', 'Brittany is cool', { maxAge: 7000000 });
  next();
};

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = (req, res) => {
  res.json(req.body);
};
