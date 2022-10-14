const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
function isUpperCase(letter) {
  let l = letter.charCodeAt();
  if (l > 64 && l < 91) {
    return true;
  } else {
    return false;
  }
}

function isLowerCase(letter) {
  let l = letter.charCodeAt();
  if (l > 96 && l < 123) {
    return true;
  } else {
    return false;
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
class VigenereCipheringMachine {
  constructor(val = true) {
    this.val = val;
  }

  encrypt(str, key) {
    if (typeof str != "string" || typeof key != "string") {
      throw new Error(`Incorrect arguments!`);
    }
    let encrypted = "";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      let currentLetter = str[i];
      const A = 65;
      const a = 97;

      if (isUpperCase(currentLetter)) {
        let Pi = currentLetter.charCodeAt(0) - A;
        let Ki = key[count % key.length].toUpperCase().charCodeAt() - A;
        let upperLetter = mod(Pi + Ki, 26);

        encrypted += String.fromCharCode(upperLetter + A);

        count++;
      } else if (isLowerCase(currentLetter)) {
        let Pi = currentLetter.charCodeAt() - a;
        let Ki = key[count % key.length].toLowerCase().charCodeAt() - a;
        let lowerLetter = mod(Pi + Ki, 26);

        encrypted += String.fromCharCode(lowerLetter + a);

        count++;
      } else {
        encrypted += currentLetter;
      }
    }

    return this.val
      ? encrypted.toUpperCase()
      : encrypted.split("").reverse().join("").toUpperCase();
  }

  decrypt(encStr, key) {
    if (typeof encStr != "string" || typeof key != "string") {
      throw new Error(`Incorrect arguments!`);
    }
    let decrypted = "";
    let count = 0;
    for (let i = 0; i < encStr.length; i++) {
      let currentLetter = encStr[i];
      const A = 65;
      const a = 97;

      if (isUpperCase(currentLetter)) {
        let Ci = currentLetter.charCodeAt(0) - A;
        let Ki = key[count % key.length].toUpperCase().charCodeAt() - A;
        let upperLetter = mod(Ci - Ki, 26);

        decrypted += String.fromCharCode(upperLetter + A);

        count++;
      } else if (isLowerCase(currentLetter)) {
        let Ci = currentLetter.charCodeAt(0) - a;
        let Ki = key[count % key.length].toLowerCase().charCodeAt() - a;
        let lowerLetter = mod(Ci - Ki, 26);

        decrypted += String.fromCharCode(lowerLetter + a);

        count++;
      } else {
        decrypted += currentLetter;
      }
    } /*
    if (this.reverseMachine) {
      decrypted = decrypted.split("").reverse().join("");
    }
    return decrypted.toUpperCase();*/
    return this.val
      ? decrypted.toUpperCase()
      : decrypted.split("").reverse().join("").toUpperCase();
  }
}

module.exports = {
  VigenereCipheringMachine,
};
