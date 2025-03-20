// (c) Reinhard Höbart 2023      
'use strict';

const decrypt = (text, key) => {
   key = reverseKey(key);
   key['orderKey'].forEach(methodNumber => {
      if (methodNumber === 1) {
         text = deSwap(text, key['swapKey']);
      }else if (methodNumber === 2) {
         text = deAddText(text, key['additionKey']);
      }else {
         const [returnedText, returnedChangeKey] = deChange(text, key['changeKey']);
         text = returnedText;
         key['changeKey'] = returnedChangeKey;
      }
   });
   text = reconstructSingleQuotes(text);
   key = reverseKey(key);
   return text;
}

const deSwap = (text, swapKey) => {
   let currentCut;
   let currentCutLength;
   let newStartIndex;
   let newEndIndex;
   swapKey.forEach(operation => {
      newStartIndex = operation['newStartIndex'];
      currentCutLength = operation['endIndex'] - operation['startIndex'];
      newEndIndex = newStartIndex + currentCutLength;
      currentCut = text.slice(newStartIndex, newEndIndex);
      text = [text.slice(0, newStartIndex), text.slice(newEndIndex)].join('');
      text = [text.slice(0, operation['startIndex']), currentCut, text.slice(operation['startIndex'])].join('');
   });
   return text;
}

const deAddText = (text, addKey) => {
   let pos;
   addKey.forEach(operation => {
      pos = operation['position'];
      text = [text.slice(0, pos), text.slice(pos+operation['length'])].join('');
   });
   textLengthAltered = false;
   pos = Number(pos);
   return text;
}

const deChange = (text, changeKey) => {
   const charIndexInKeyList = createCharIndexInKeyList(text, changeKey);
   (changeKey['shiftCount'] > 0) ? changeKey = deShiftTemplate(changeKey) : changeKey['firstChange'] = true;
   text = '';
   if (changeKey['firstChange']) {
      charIndexInKeyList.forEach(index => {
         text += changeKey['originalTemplate'][index];
      });
   }else {
      charIndexInKeyList.forEach(index => {
         text += changeKey['alteredTemplate'][index];
      });
   }
   return [text, changeKey];
}

