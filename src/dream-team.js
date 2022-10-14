const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  let result = "";
  arr.forEach((el) => {
    if (typeof el === "string") {
      el = el.replace(/\s/g, "");
      result += el[0];
    }
  });
  return result.toLowerCase().split("").sort().join("").toUpperCase();
}

module.exports = {
  createDreamTeam,
};
