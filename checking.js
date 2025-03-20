// (c) Reinhard Höbart 2023
'use strict';

const checkEncryption = (text) => {
   if ((text.slice(0, 4) === '%§§%') && (text.slice(-4) === '#$$#')) {
      return true;
   }else {
      return false;
   }
}

const checkKeyInput = (input) => {
   if (!input) {
      return false;
   }else if (!((input.slice(0,2) == 'XK') && (input.slice(input.length-2) == '8B'))) {
      const invalidKeyError = new Error('Decryption failed!\nKey is not valid!\nPlease enter a valid key.');
      throw invalidKeyError;
   }else {
      return input;
   }
}

const validateInput = (isEncrypted, enteredKey) => {
   if (isEncrypted && !enteredKey) {
      const missingKeyError = new Error('Decryption failed!\nKey required!\nPlease enter a key.');
      throw missingKeyError;
   }else if (enteredKey && !isEncrypted) {
      const noEncryptionError = new Error('Decryption failed!\nEncrypted text required!\nPlease enter a text which\nhas been encrypted here.');
      throw noEncryptionError;
   }
}