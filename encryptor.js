// (c) Reinhard Höbart 2023      
'use strict';

const encrypt = (text, key) => {
   text = alterSingleQuotes(text);
   key['orderKey'].forEach(methodNumber => {
      if (methodNumber === 1) {
         text = swap(text, key['swapKey']);
      }else if (methodNumber === 2) {
         text = addText(text, key['additionKey']);
      }else {
         const [returnedText, returnedChangeKey] = change(text, key['changeKey']);
         text = returnedText;
         key['changeKey'] = returnedChangeKey;
      }
   })

   text = ['%§§%', text, '#$$#'].join('');
   return text;
}

const swap = (text, swapKey) => {
   let currentCut;
   let newStartIndex;
   swapKey.forEach(operation => {
      currentCut = text.slice(operation['startIndex'], operation['endIndex']);
      text = [text.slice(0, operation['startIndex']), text.slice(operation['endIndex'])].join('');
      newStartIndex = operation['newStartIndex'];
      text = [text.slice(0, newStartIndex), currentCut, text.slice(newStartIndex)].join('');
   });
   return text;
}

const addText = (text, addKey) => {
   const chars = ' ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß1234567890!"§$%&/()=?`²³¼½@€{[]}^°+*~#;,:.-_><|';
   let randomCharIndex;
   let TextToAdd;
   let pos;
   addKey.forEach(operation => {
      pos = operation['position'];
      TextToAdd = '';
      for (let count = 1; count <= operation['length']; count++) {
         randomCharIndex = Math.floor(Math.random()*chars.length);
         TextToAdd += chars[randomCharIndex];
      }
      text = [text.slice(0, pos), TextToAdd, text.slice(pos)].join('');
   });
   textLengthAltered = true;
   return text;
}

const change = (text, changeKey) => {
   const charIndexInKeyList = createCharIndexInKeyList(text, changeKey);
   (changeKey['firstChange']) ? changeKey['firstChange'] = false : changeKey = shiftTemplate(changeKey);
   text = '';
   charIndexInKeyList.forEach(index => {
      text += changeKey['alteredTemplate'][index];
   });
   return [text, changeKey];
}

