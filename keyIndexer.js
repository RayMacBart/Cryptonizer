// (c) Reinhard Höbart 2023
'use strict';

const getKeyWithIndexes = (text, key) => {
   const useableTextLength = adjustTextLength(text, key);
   key['swapKey'] = getSwapKeyWithIndexes(key['swapKey'], useableTextLength);
   key['additionKey'] = getAdditionKeyWithIndexes(key['additionKey'], useableTextLength);
   return key;
}

const getSwapKeyWithIndexes = (oldSwapKey, textLength) => {
   let swapKeyWithIndexes = [{}, {}, {}];
   let cutLength;
   swapKeyWithIndexes.forEach((operation, index) => {
      operation['startIndex'] = Math.floor((textLength-1)*oldSwapKey[index]['startAsFraction']);
      operation['endIndex'] = Math.floor((textLength-1)*oldSwapKey[index]['endAsFraction']);
      [operation['startIndex'], operation['endIndex']] = alterEqualIndexes(operation['startIndex'], operation['endIndex']);
      cutLength = operation['endIndex'] - operation['startIndex'];
      operation['newStartIndex'] = Math.floor((textLength-1-cutLength)*oldSwapKey[index]['newStartAsFraction']);
      [operation['startIndex'], operation['newStartIndex']] = alterEqualIndexes(operation['startIndex'], operation['newStartIndex']);
   });
   return swapKeyWithIndexes;
}

const getAdditionKeyWithIndexes = (oldAddKey, textLength) => {
   let additionKeyWithIndexes = [{}, {}, {}];
   additionKeyWithIndexes.forEach((operation, index) => {
      operation['length'] = oldAddKey[index]['length'];
      operation['position'] = Math.floor((textLength-1)*oldAddKey[index]['positionAsFraction']);
   });
   return additionKeyWithIndexes;
}