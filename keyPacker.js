// (c) Reinhard Höbart 2023
'use strict';

const packFractionKey = (key) => {
   let packedKey;
   packedKey = getPackedSwapKey(key);
   packedKey += getPackedAddKey(key);
   packedKey += getPackedChangeKey(key);
   packedKey += getPackedOrderKey(key);
   packedKey = addPackMark(packedKey);
   return packedKey;
}

const getPackedSwapKey = (key) => {
   let packedSwapKey = 'S';
   key['swapKey'].forEach(operation => {
      packedSwapKey += operation['startAsFraction'] + ':';
      packedSwapKey += operation['endAsFraction'] + ':';
      packedSwapKey += operation['newStartAsFraction'] + '|';   
   });
   return packedSwapKey;
}

const getPackedAddKey = (key) => {
   let packedAddKey = 'A';
   key['additionKey'].forEach(operation => {
      packedAddKey += operation['positionAsFraction'] + ':';
      packedAddKey += operation['length'] + '|';   
   });
   return packedAddKey;
}

const getPackedChangeKey = (key) => {
   let packedChangeKey = 'C¬';  // Letter "¬" = R-alt + 6
   let shiftCount = getShiftCount(key);
   let packingChangeKey = {};
   packingChangeKey['alteredTemplate'] = key['changeKey']['alteredTemplate'];
   packingChangeKey['shift'] = key['changeKey']['shift'];
   packingChangeKey['shiftCount'] = 0;
   for (let i = 1; i <= shiftCount; i++) {
      packingChangeKey = shiftTemplate(packingChangeKey);
   }
   packedChangeKey += packingChangeKey['alteredTemplate'] + '¬';
   packedChangeKey += packingChangeKey['shift'] + ':';
   packedChangeKey += packingChangeKey['shiftCount'] + '|';
   return packedChangeKey;
}

const getShiftCount = (key) => {
   let changeCount = 0;
   key['orderKey'].forEach(number => {
      if (number === 3) {
         changeCount += 1;
      }
   });
   return changeCount - 1;
}

const getPackedOrderKey = (key) => {
   let packedOrderKey = '';
   key['orderKey'].forEach(num => {
      packedOrderKey += num;
   });
   return packedOrderKey;
}

const addPackMark = (packedKey) => 'XK'+packedKey+'8B';
