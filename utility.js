// (c) Reinhard Höbart 2023
'use strict';

const alterSingleQuotes = (text) => {
   for (let i = 0; i < text.length; i++) {
      if (text[i] === "'") {
         text = text.replace("'", '³');
      }
   }
   return text;
}

const reconstructSingleQuotes = (text) => {
   while (text.search('³') >= 0) {
      text = text.replace('³', "'");
   }
   return text;

}

const reverseKey = (key) => {
   key['swapKey'].reverse();
   key['additionKey'].reverse();
   key['orderKey'].reverse();
   return key;
}

const adjustTextLength = (text, key) => {
   let useableTextLength = text.length;
   if (textLengthAltered) {
      key['orderKey'].forEach(num => {
         if (num === 2) {
            key['additionKey'].forEach(operation => {
               useableTextLength -= operation['length'];
            });
         }
      });
   }
   return useableTextLength;
}

const alterEqualIndexes = (index1, index2) => {
   if (index1 !== index2) {
      return [index1, index2];
   }
   if (index1 > 0) {
      index1 -= 1;
   }else {
      index2 += 1;
   }
   return [index1, index2];
}

const createCharIndexInKeyList = (text, changeKey) => {
   let charIndexInKeyList = [];
   let referencedTemplate;
   (changeKey['firstChange']) ? referencedTemplate = changeKey['originalTemplate'] : referencedTemplate = changeKey['alteredTemplate'];
   for (let textIndex = 0; textIndex < text.length; textIndex++) {
      for (let keyIndex = 0; keyIndex < referencedTemplate.length; keyIndex++) {
         if (text[textIndex] === referencedTemplate[keyIndex]) {
            charIndexInKeyList.push(keyIndex);
            break;
         }
      }
   }
   return charIndexInKeyList;
}

const shiftTemplate = (changeKey) => {
   let altTemp = changeKey['alteredTemplate'];
   const shift = changeKey['shift'];
   changeKey['alteredTemplate'] = [altTemp.slice(shift), altTemp.slice(0, shift)].join('');
   changeKey['shiftCount'] += 1;
   return changeKey;
}

const deShiftTemplate = (changeKey) => {
   let altTemp = changeKey['alteredTemplate'];
   const deShift = altTemp.length - changeKey['shift'];
   changeKey['alteredTemplate'] = [altTemp.slice(deShift), altTemp.slice(0, deShift)].join('');
   changeKey['shiftCount'] -= 1;
   return changeKey;
}

const randomlyInsertItem = (item, list) => {
   const insertIndex = Math.floor(Math.random()*0.99*list.length);
   let leftList = list.slice(0, insertIndex);
   leftList = leftList.concat([item]);
   list = leftList.concat(list.slice(insertIndex));
   return list;
}