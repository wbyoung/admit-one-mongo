'use strict';

var _ = require('lodash');
var monk = require('monk');
var admit = require('admit-one');
var bluebird = require('bluebird'), Promise = bluebird;

module.exports = function(options) {
  var opts = admit.helpers.defaults(options || {}, {
    mongo: { collection: 'users' }
  });
  var db = monk(opts.mongo.db);
  var users = db.get(opts.mongo.collection);

  var create = function(username, passwordDigest) {
    var obj = {};
    obj[opts.username] = username;
    obj[opts.passwordDigest] = passwordDigest;
    return users.insert(obj);
  };

  var find = function(username) {
    var query = {};
    query[opts.username] = username;
    return users.findOne(query);
  };

  var findByToken = function(token) {
    return users.findOne({ sessionDigests: token });
  };

  var addToken = function(user, digest) {
    return users.update({ _id: user._id },
      { $push: { sessionDigests: digest }});
  };

  var removeToken = function(user, digest) {
    return users.update({ _id: user._id },
      { $pull: { sessionDigests: digest }});
  };

  opts._users = {
    create: create,
    find: find,
    findByToken: findByToken,
    addToken: addToken,
    removeToken: removeToken
  };

  opts._attrs = {
    passwordDigest: function(user) { return user[opts.passwordDigest]; }
  };

  return _.extend(admit(opts), { _options: opts });
};

module.exports.__admit = admit;
