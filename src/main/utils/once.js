function once(fn, context) {
  let result;

  return function(...args) {
    if (fn) {
      result = fn.apply(context || this, args);
      fn = null; // eslint-disable-line
    }

    return result;
  };
}

exports.once = once;
