const merge = require('lodash.merge');
const defaults = require('./defaults');

const heal = (db) => {
  const data = db.store;
  const healthyCfg = merge(defaults, data);

  db.set(healthyCfg);
};

exports.heal = heal;
