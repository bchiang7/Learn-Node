const mongoose = require('mongoose');
const Store = mongoose.model('Store');

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

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1. Query the DB for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true,
  }).exec();
  req.flash(
    'success',
    `Successfully updated ${store.name}. <a href="/stores/${store.slug}">View Store</a>`,
  );
  // redirect them to the store and tell them it worked
  res.redirect(`/stores/${store._id}/edit`);
};
