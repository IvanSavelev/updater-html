

export function moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  return _moveElementsAnalytical(oldBlockUploader, newBlockUploader);
}


/**
 * Делает перемещение, чтобы не удалять элементы, а именно перемещать (пример: <p>1</p><p>2</p> => <p>update</p><p>1</p> - должно быть одно перемещение, и обновление)

 */
function _moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  let stepProp = 0;
  let stepFact = 0;
  for (let [index, item]  of oldBlockUploader.children.entries()) {
    if(item.numberElementEqual !== undefined) {

      item.stepProp = ((item.numberElementEqual - stepProp - 1) >= 0) ?item.numberElementEqual - stepProp - 1:0;
      item.stepFact = ((stepFact - 1) >= 0) ? (stepFact - 1) :0;
      stepProp = item.numberElementEqual;
      stepFact = 0;
    }
    stepFact++;
  }

  oldBlockUploader.logger('Выводим св-ва объектов (стврые) (до аналитического перемещения):', 'stepProp', 'stepFact');

  let freeElementNumber = [];
  for (let [oldUndefinedIndex, oldUndefinedItem]  of oldBlockUploader.children.entries()) {
    if(oldUndefinedItem.stepProp !== null && oldUndefinedItem.stepFact !== null) {
      let freeCount = oldUndefinedItem.stepFact - oldUndefinedItem.stepProp
      if (freeCount > 0) {
        while (freeCount > 0) {
          freeElementNumber.push(oldUndefinedIndex - freeCount);
          freeCount--;
        }
      }
    }
    stepFact++;
  }

  let correctionIndex = 0;

  if (freeElementNumber.length) {
    for (let i = 0; i < oldBlockUploader.children.length; i++) {
      let item = oldBlockUploader.children[i];
      if(item.stepProp !== null && item.stepFact !== null) {
        let needCount = item.stepProp - item.stepFact
        if (needCount > 0) {
          while (needCount > 0 && freeElementNumber.length) {
            oldBlockUploader.move(freeElementNumber.shift(), i -1 + correctionIndex);
            correctionIndex++;
            needCount--;
            i++;
          }
        }
      }
      stepFact++;
    }
  }

  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после аналитического перемещения):', 'stepProp', 'stepFact');
}

