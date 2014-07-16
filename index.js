'use strict';

var _ = require('lodash');
var monk = require('monk');

module.exports = function(options) {
  var opts = _.defaults({}, options.mongo, {
    collection: 'users'
  });
  var db = monk(opts.db);
  var users = db.get(opts.collection);

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

  var adapter = {};

  adapter.users = {
    create: create,
    find: find,
    findByToken: findByToken,
    addToken: addToken,
    removeToken: removeToken
  };

  adapter.attrs = {
    all: function(user) { return user; }
  };

  adapter._db = db;

  return adapter;
};
