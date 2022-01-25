import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";


export function moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  return _moveElementsAnalytical(oldBlockUploader, newBlockUploader);
}


/**
 * Делает перемещение, чтобы не удалять элементы, а именно перемещать (пример: <p>1</p><p>2</p> => <p>update</p><p>1</p> - должно быть одно перемещение, и обновление)
 */
function _moveElementsAnalytical(oldBlockUploader, newBlockUploader) {

  addInfoWSDOM(oldBlockUploader, newBlockUploader);
  addStepMax(oldBlockUploader, newBlockUploader);
  move(oldBlockUploader);
  
  newBlockUploader.logger('Выводим св-ва объектов (новые)(до аналитического перемещения):', 'countUndefinedPrev', 'countUndefinedNext');
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до аналитического перемещения):', 'countUndefinedPrev', 'countUndefinedNext');
  
  
  

  
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до аналитического перемещения):', 'stepNextMax', 'stepPrevMax');
  
 

  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после аналитического перемещения):');
}



function addStepMax(oldBlockUploader, newBlockUploader) {
  for (let i = 0; i < oldBlockUploader.children.length; i++) {
    let item = oldBlockUploader.children[i];
    if(item.numberElementEqual !== undefined) {

      let itemNew =  newBlockUploader.children[item.numberElementEqual];
      item.stepNextMax = itemNew.countUndefinedPrev  - item.countUndefinedPrev;
      item.stepPrevMax = itemNew.countUndefinedNext  - item.countUndefinedNext;

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
        item.turnOnLabel('move_analytical')  //Add a label
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
        item.turnOnLabel('move_analytical')  //Add a label
        
        item.stepPrevMax--;
        item.stepNextMax++;
        i = 0;
      }
    }
  }
}

