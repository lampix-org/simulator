function lineByLineIterable(polygon) {
  const iterable = {
    * [Symbol.iterator]() {
      let i = 0;
      let j = polygon.length - 1;

      while (true) {
        yield {
          p1: polygon[i],
          p2: polygon[j]
        };

        if (i + 1 === polygon.length) {
          return;
        }

        j = i;
        i++;
      }
    }
  };

  return iterable;
}

exports.lineByLineIterable = lineByLineIterable;
