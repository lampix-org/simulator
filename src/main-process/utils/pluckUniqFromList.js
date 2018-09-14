const pluckUniqFromList = (prop, list) => {
  const result = list.reduce((acc, item) => {
    if (acc.visited[item[prop]]) {
      return acc;
    }

    acc.visited[item[prop]] = true;
    acc.list.push(item[prop]);

    return acc;
  }, {
    visited: {},
    list: []
  });

  return result.list;
};

exports.pluckUniqFromList = pluckUniqFromList;
