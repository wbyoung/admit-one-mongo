'use strict';

var _ = require('lodash');
var monk = require('monk');
var admit = require('admit-one');
var bluebird = require('bluebird'), Promise = bluebird;

module.exports = function(options) {
  var opts = admit.helpers.defaults({}, options, {
    mongo: { collection: 'users' }
  });
  var db = monk(opts.mongo.db);
  var users = db.get(opts.mongo.collection);

  var create = function(attributes) {
    return users.insert(attributes);
  };

  var find = function(query) {
    return users.findOne(query);
  };

  var findByToken = function(token) {
    return users.findOne({ sessionDigests: token });
  };

  var addToken = function(user, token) {
    return users.update({ _id: user._id },
      { $push: { sessionDigests: token }});
  };

  var removeToken = function(user, token) {
    return users.update({ _id: user._id },
      { $pull: { sessionDigests: token }});
  };

  opts._users = {
    create: create,
    find: find,
    findByToken: findByToken,
    addToken: addToken,
    removeToken: removeToken
  };

  opts._attrs = {
    all: function(user) { return user; }
  };

  return _.extend(admit(opts), { _options: opts });
};

module.exports.__admit = admit;
