const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const newArr = arr.slice();
  let disprev = newArr.indexOf("--discard-prev"),
    disnext = newArr.indexOf("--discard-next"),
    doubprev = newArr.indexOf("--double-prev"),
    doubnext = newArr.indexOf("--double-next");
  if (disprev >= 0) {
    if (disprev == 0) {
      newArr.splice(disprev, 1);
    } else {
      newArr.splice(disprev - 1, 2);
    }
  }
  if (disnext >= 0) {
    if (doubprev == disnext + 2) {
      newArr.splice(doubprev, 1);
    }
    if (disnext == disprev - 2) {
      newArr.splice(disnext, 1);
    } else if (disnext == arr.length - 1) {
      newArr.splice(disnext, 1);
    } else {
      newArr.splice(disnext, 2);
    }
  }
  if (doubprev >= 0) {
    if (doubprev == disnext + 2) {
    } else if (doubprev == 0) {
      newArr.splice(doubprev, 1);
    } else {
      let item = arr[doubprev - 1];
      newArr.splice(doubprev, 1, item);
    }
  }
  if (doubnext >= 0) {
    if (doubnext == arr.length - 1) {
      newArr.splice(doubnext);
    } else {
      let item = arr[doubnext + 1];
      newArr.splice(doubnext, 1, item);
    }
  }
  return newArr;
}

module.exports = {
  transform,
};
