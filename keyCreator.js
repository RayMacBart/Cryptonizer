// (c) Reinhard Höbart 2023
'use strict';

const createNewKey = () => {
   const swapKeyWithFractions = createSwapKeyWithFractions();           
   const additionKeyWithFractions = createAdditionKeyWithFractions();   
   const changeKey = createChangeKey();   
   const orderKey = createOrderKey();   
   const newKey = {'swapKey': swapKeyWithFractions,
                   'additionKey': additionKeyWithFractions,
                   'changeKey': changeKey,
                   'orderKey': orderKey};      // list with 30 numbers:  1 = swap,  2 = add,  3 = change
   return newKey;
}

const createSwapKeyWithFractions = () => {
   let swapKeyWithFractions = [{}, {}, {}];
   swapKeyWithFractions.forEach(swapOperation => {
      swapOperation['startAsFraction'] = Number(Math.random().toFixed(2));
      let restRange = 1 - swapOperation['startAsFraction'];
      let restRangeWithMinDistance = restRange - (restRange/5);
      let rangeStartWithtMinDistance = 1 - restRangeWithMinDistance;
      let randomEndCalc = Number(Math.random().toFixed(2));
      swapOperation['endAsFraction'] = Number((rangeStartWithtMinDistance + (restRangeWithMinDistance*randomEndCalc)).toFixed(2));
      swapOperation['newStartAsFraction'] = Number(Math.random().toFixed(2));
      const newStart = swapOperation['newStartAsFraction'];
      const swapCutLength = swapOperation['endAsFraction'] - swapOperation['startAsFraction'];
      if (newStart + swapCutLength >= 1) {
         swapOperation['newStartAsFraction'] = Number((newStart + swapCutLength - 1).toFixed(2));
      }
   });

   return swapKeyWithFractions;
}

const createAdditionKeyWithFractions = () => {
   let addKeyListWithFractions = [{}, {}, {}];
   addKeyListWithFractions.forEach(addKey => {
      addKey['positionAsFraction'] = Number(Math.random().toFixed(2));
      addKey['length'] = (1 + Math.floor(Math.random()*3));
   });
   return addKeyListWithFractions;
}

const createChangeKey = () => {
   const originalTemplate = ' ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß1234567890!"§$%&/()=?`²³¼½@€{[]}^°+*~#;,:.-_><|';
   let changingString = ' ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß1234567890!"§$%&/()=?`²³¼½@€{[]}^°+*~#;,:.-_><|';
   let alteredTemplate = '';
   let indexChoice;
   let choosenChar;
   for (let index = 0; index < originalTemplate.length; index++) {
      indexChoice = Math.floor(Math.random()*changingString.length);
      choosenChar = changingString[indexChoice];
      alteredTemplate += choosenChar;
      changingString = changingString.replace(choosenChar, '');
   }
   const changeKeyShift = Math.ceil(Math.random()*10);
   const changeKey = {'originalTemplate': originalTemplate, 
                'alteredTemplate': alteredTemplate, 
                'shift': changeKeyShift,
                'shiftCount': 0,
                'firstChange': true};
   return changeKey;
}

const createOrderKey = () => {
   let orderKey = [];
   for (let i = 0; i < 47; i++) {
      orderKey.push(Math.ceil(Math.random()*3));
   }
   orderKey = randomlyInsertItem(1, orderKey);
   orderKey = randomlyInsertItem(2, orderKey);
   orderKey = randomlyInsertItem(3, orderKey);
   return orderKey;   //  1 = swap,  2 = add,  3 = change
}



