// (c) Reinhard Höbart 2023
'use strict';

const extractFractionKey = (keyString) => {
   let swapKeyWithFractions;
   let additionKeyWithFractions;
   let changeKey;
   let orderKey;
   keyString = removePackMark(keyString);
   swapKeyWithFractions = extractSwapKey(keyString);
   additionKeyWithFractions = extractAdditionKey(keyString);;
   changeKey = extractChangeKey(keyString);
   orderKey = extractOrderKey(keyString);
   const extractedKey = {'swapKey': swapKeyWithFractions,
                         'additionKey': additionKeyWithFractions,
                         'changeKey': changeKey,
                         'orderKey': orderKey};
   return extractedKey;
}

const extractSwapKey = (keyString) => {
   let swapKey = [{},{},{}];
   let keyInfo = keyString.slice(1, keyString.search('A')-1);
   keyInfo = keyInfo.split('|');
   keyInfo.forEach((operation, index) => {
      swapKey[index]['startAsFraction'] = Number(operation.split(':')[0]);
      swapKey[index]['endAsFraction'] = Number(operation.split(':')[1]);
      swapKey[index]['newStartAsFraction'] = Number(operation.split(':')[2]);
   });
   return swapKey;
}

const extractAdditionKey = (keyString) => {
   let addKey = [{}, {}, {}];
   let keyInfo = keyString.slice(keyString.search('A')+1, keyString.search('C')-1);
   keyInfo = keyInfo.split('|');
   keyInfo.forEach((operation, index) => {
      addKey[index]['positionAsFraction'] = Number(operation.split(':')[0]);
      addKey[index]['length'] = Number(operation.split(':')[1]);
   });
   return addKey;
}

const extractChangeKey = (keyString) => {
   let changeKey = {};
   changeKey['originalTemplate'] = ' ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß1234567890!"§$%&/()=?`²³¼½@€{[]}^°+*~#;,:.-_><|';
   keyString = keyString.slice(keyString.search('¬')+1);
   changeKey['alteredTemplate'] = keyString.slice(0, keyString.search('¬'));
   keyString = keyString.slice(keyString.search('¬')+1);
   changeKey['shift'] = Number(keyString.slice(0, keyString.search(':')));
   changeKey['shiftCount'] = Number(keyString.split('|')[0].slice(keyString.search(':')+1));
   changeKey['firstChange'] = false;
   return changeKey;
}

const extractOrderKey = (keyString) => {
   keyString = keyString.slice(keyString.search('¬')+1);
   keyString = keyString.slice(keyString.search('¬')+1);
   const orderKeyString = keyString.split('|')[1];
   let orderKey = [];
   for (let i=0; i<orderKeyString.length; i++) {
      orderKey.push(Number(orderKeyString[i]));
   }
   return orderKey;
}

const removePackMark = (keyString) => keyString.slice(2, keyString.length-2);
