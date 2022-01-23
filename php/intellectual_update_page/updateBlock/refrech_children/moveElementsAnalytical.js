

export function moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  return _moveElementsAnalytical(oldBlockUploader, newBlockUploader);
}


/**
 * Делает перемещение, чтобы не удалять элементы, а именно перемещать (пример: <p>1</p><p>2</p> => <p>update</p><p>1</p> - должно быть одно перемещение, и обновление)
 */
function _moveElementsAnalytical(oldBlockUploader, newBlockUploader) {

  addProperty(oldBlockUploader);
  addProperty(newBlockUploader);
  addStepMax(oldBlockUploader, newBlockUploader);
  move(oldBlockUploader);
  
  newBlockUploader.logger('Выводим св-ва объектов (новые)(до аналитического перемещения):', 'count_undefined_prev', 'count_undefined_next');
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до аналитического перемещения):', 'count_undefined_prev', 'count_undefined_next');
  
  
  

  
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до аналитического перемещения):', 'stepNextMax', 'stepPrevMax');
  
 

  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после аналитического перемещения):');
}


function addProperty(newBlockUploader)
{
  let j = 0;
  for (let i = 0; i < newBlockUploader.children.length; i++) {

    let item = newBlockUploader.children[i];
    if(item.numberElementEqual !== undefined) {
      item.count_undefined_prev = j;
      j = 0;
    } else {
      j++;
    }

  }

  j =0;
  for (let i = newBlockUploader.children.length - 1; i > 0; i--) {

    let item = newBlockUploader.children[i];
    if(item.numberElementEqual !== undefined) {
      item.count_undefined_next = j;
      j = 0;
    } else {
      j++;
    }
  }
}

function addStepMax(oldBlockUploader, newBlockUploader) {
  for (let i = 0; i < oldBlockUploader.children.length; i++) {
    let item = oldBlockUploader.children[i];
    if(item.numberElementEqual !== undefined) {

      let itemNew =  newBlockUploader.children[item.numberElementEqual];
      item.stepNextMax = itemNew.count_undefined_prev  - item.count_undefined_prev;
      item.stepPrevMax = itemNew.count_undefined_next  - item.count_undefined_next;

    }
  }
}

function move(oldBlockUploader)
{
  for (let i = 0; i < oldBlockUploader.children.length; i++) {
    let item = oldBlockUploader.children[i];
    if(item.numberElementEqual !== undefined && item.numberElementEqual > i) {
      if(
        i + 1 < oldBlockUploader.children.length &&
        oldBlockUploader.children[i + 1].numberElementEqual === undefined &&
        item.stepNextMax > 0 &&
        item.stepPrevMax < 0
      ) {
        oldBlockUploader.move(i, i +1);
        item.label_move_analytical = true;
        item.stepNextMax--;
        item.stepPrevMax++;
        i=0;
      }
    }
  }

  for (let i = 0; i < oldBlockUploader.children.length; i++) {
    let item = oldBlockUploader.children[i];
    if(item.numberElementEqual !== undefined  && item.numberElementEqual < i) {
      if(
        i -2 >= 0 &&
        oldBlockUploader.children[i - 1].numberElementEqual === undefined &&
        item.stepPrevMax > 0 &&
        item.stepNextMax < 0
      ) {
        oldBlockUploader.move(i, i -2);
        item.label_move_analytical = true;
        item.stepPrevMax--;
        item.stepNextMax++;
        i = 0;
      }
    }
  }
}

