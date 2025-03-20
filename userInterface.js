// (c) Reinhard Höbart 2023
'use strict';

const textInputElement = document.getElementsByTagName('textarea')[0];
const clearTextButton = document.getElementById('clear-text');
const keyInputElement = document.getElementsByTagName('input')[0];
const copyKeyButton = document.getElementById('copy-key');
const clearKeyButton = document.getElementById('clear-key');
const transformButton = document.getElementById('transform-button');
const eraseButton = document.getElementById('erase-button');


class ResultCollection {

   constructor() {
      this.resultCount = 0;
      this.grandparent = document.getElementById('result-collection-grandparent');
   }

   addNewResult = (resultValue) => {
      this.resultCount++;
      const {parentElement, childElements} = this.createResultElements()
      this.appendChilds(parentElement, childElements);
      this.writeInnerTexts(childElements, resultValue);
      this.addCopyClickEvent(childElements);
      this.grandparent.appendChild(parentElement);
   }

   createResultElements = () => {
      const parentElement = document.createElement('article');
      const resultCountElement = document.createElement('aside');
      const resultValueElement = document.createElement('p');
      const resultCopyElement = document.createElement('div');
      const resultElements = {'parentElement': parentElement, 
                              'childElements':[resultCountElement, resultValueElement, resultCopyElement]};
      return resultElements;
   }

   appendChilds = (parent, childList) => {
      childList.forEach(child => {
         parent.appendChild(child);
      })
   }

   writeInnerTexts = (elements, resultValue) => {
      const [count, value, copy] = elements;
      count.innerText = 'RESULT '+String(this.resultCount);
      value.innerText = resultValue;
      copy.innerText = 'COPY';
   }

   addCopyClickEvent = (childs) => {
      const valueElement = childs[1];
      const copyElement = childs[2];
      copyElement.addEventListener('mouseup', function() {
                                                 const text = valueElement.innerText;
                                                 navigator.clipboard.writeText(text);
                                                 valueElement.parentElement.appendChild(document.createElement('small'));
                                                 setTimeout(function() {
                                                    let small = document.getElementsByTagName('small')[0];
                                                    small.remove();
                                                 }, 3000);
                                             });
   }

   eraseAllResults = () => {
      while (this.grandparent.firstChild) {
         this.grandparent.removeChild(this.grandparent.firstChild);
      }
      this.resultCount = 0;
   }
}

let text;
let key;
let enteredKey;
let textLengthAltered;

const processInput = () => {
   text = textInputElement.value;
   if (!text) {
      return;
   }
   const isEncrypted = checkEncryption(text);
   enteredKey = checkKeyInput(keyInputElement.value);
   validateInput(isEncrypted, enteredKey);
   if (isEncrypted) {
      text = text.slice(4, -4);
   }
   if (enteredKey) {
      key = extractFractionKey(enteredKey);
      key = getKeyWithIndexes(text, key);
   }else {
      key = createNewKey();
      keyInputElement.value = packFractionKey(key);
      key = getKeyWithIndexes(text, key);
   }
   if (!isEncrypted) {
      text = encrypt(text, key);
   }else {
      text = decrypt(text, key);
   }
   collection.addNewResult(text);
   // textInputElement.value = null;
}


const collection = new ResultCollection();

clearTextButton.addEventListener('mouseup', function() {textInputElement.value = null});
copyKeyButton.addEventListener('mouseup', function() {
                                                      const keyText = keyInputElement.value;
                                                      navigator.clipboard.writeText(keyText);
                                                      copyKeyButton.parentElement.appendChild(document.createElement('small'));
                                                      setTimeout(function() {
                                                         let small = document.getElementsByTagName('small')[0];
                                                         small.remove();
                                                      }, 3000);
                                          });
clearKeyButton.addEventListener('mouseup', function() {keyInputElement.value = null});
transformButton.addEventListener('mouseup', function() { 
   try {
      processInput();
   }catch(err) {
      alert(err.message);
   }
 });
eraseButton.addEventListener('mouseup', collection.eraseAllResults);
