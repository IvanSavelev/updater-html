import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";

export function moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  return _moveElementsAnalytical(oldBlockUploader, newBlockUploader);
}


/**
 * Делает перемещение, чтобы не удалять элементы, а именно перемещать (пример: <p>1</p><p>2</p> => <p>update</p><p>1</p> - должно быть одно перемещение, и обновление)

 */
function _moveElementsAnalytical(oldBlockUploader, newBlockUploader) {
  const length = newBlockUploader.children.length;
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





  console.log(freeElementNumber);


  
/*

  addInfoWSDOM(oldBlockUploader, newBlockUploader);

  let children = oldBlockUploader.children;
  for (let i = 0; i < children.length; i++) {
    let old_child = children[i];

    if (old_child.numberElementEqual === undefined) {
      continue;
    }

    let new_child = newBlockUploader.children[old_child.numberElementEqual];

    //Смотрим, можно ли элемент перенести назад
    if (old_child.count_undefined_prev) {
      //Между этим элементом и предыдущем есть поля undefined
      //Смотрим, а нужно ли мы перенести элементы назад
      let modal_next = new_child.count_undefined_next - old_child.count_undefined_next;
      if (modal_next > 0 && new_child.count_undefined_prev < old_child.count_undefined_prev) {
        let new_place = i - modal_next - 1;
        moveAndAddLabel(oldBlockUploader, i, new_place); //Решаем, что можем перенести
      }
    }
    //Смотрим, можно ли элемент перенести вперед
    if (old_child.count_undefined_next) {
      //Между этим элементом и следующим есть поля undefined
      //Смотрим, а нужно ли мы перенести элементы вперед
      let modal_prev = new_child.count_undefined_prev - old_child.count_undefined_prev;
      if (modal_prev > 0 && new_child.count_undefined_next < old_child.count_undefined_next) {
        let new_place = i + modal_prev + 1;
        moveAndAddLabel(oldBlockUploader, i, new_place); //Решаем, что можем перенести
        i = new_place;
      }
    }
  }
*/
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после аналитического перемещения):', 'stepProp', 'stepFact');
}


/**
 * Переносим сразу 2 элемента, чтоб соблюсти чередование видимых/невидимых элементов
 * @param oldBlockUploader
 * @param old_place
 * @param new_place
 */
function moveAndAddLabel(oldBlockUploader, old_place, new_place) {
  for (let i_move = 0; i_move < 2; i_move++) {
    if (new_place < old_place) {
      new_place = new_place + i_move;
    }
    oldBlockUploader.move(old_place, new_place);
    oldBlockUploader.children[new_place].label_move_analytical = true;
  }
}
