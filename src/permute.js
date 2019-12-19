function permute(list) {
  let result = [];

  const perm = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        perm(curr.slice(), m.concat(next));
      }
    }
  };

  perm(list);

  return result;
}

module.exports = permute;
