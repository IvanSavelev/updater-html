import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";

export function addElements(oldBlockUploader, newBlockUploader) {
  return _addElements(oldBlockUploader, newBlockUploader);
}


/**
 *
 * @param oldBlockUploader {BlockUploader}
 * @param newBlockUploader {BlockUploader}
 * @private
 */
function _addElements(oldBlockUploader, newBlockUploader) {

  addStepAndNextNumberElementEqual(oldBlockUploader);
  addStepAndNextNumberElementEqual(newBlockUploader);


  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до добавления):', 'delete', 'label_add', 'stepToNumberElementEqual', 'nextNumberElementEqual');
  newBlockUploader.logger('Выводим св-ва объектов (новые):', 'stepToNumberElementEqual', 'nextNumberElementEqual');
  addNew(oldBlockUploader, newBlockUploader);


  //addInfoWSDOM(oldBlockUploader, newBlockUploader);
  //addMiddle(new_wsdom, old_wsdom);
 // addEnd(new_wsdom, old_wsdom);
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после добавления):', 'delete', 'label_add', 'stepToNumberElementEqual', 'nextNumberElementEqual');
}

function addStepAndNextNumberElementEqual(blockUploader) {
  let children = blockUploader.children;
  let endNumber = 1;
  for (let i = 0; i < children.length; i++) {

    if( children[i].numberElementEqual === undefined) {
      let isUpdate = false;
      for (let j = i; j < children.length; j++) {
        if(children[j].numberElementEqual !== undefined) {
          children[i].stepToNumberElementEqual = j - i;
          children[i].nextNumberElementEqual = children[j].numberElementEqual;
          isUpdate = true;
          break;
        }
      }
      //Last block for adding
      if(!isUpdate) {
        children[i].stepToNumberElementEqual = endNumber; //That reverse number for adding new element in end
        children[i].nextNumberElementEqual = undefined;
        endNumber++;
      }
    }
  }
}


/**
 *
 * @param oldBlockUploader {BlockUploader}
 * @param newBlockUploader {BlockUploader}
 */
function add(oldBlockUploader, newBlockUploader) {
  let oldChildren = oldBlockUploader.children;
  let newChildren = newBlockUploader.children;
  for (let i = 0; i < newChildren.length; i++) {
    if(newChildren[i].numberElementEqual === undefined) {
      for (let j = i; j < oldChildren.length; j++) {

          if (oldChildren[j].numberElementEqual !== undefined &&
            oldChildren[j].numberElementEqual === newChildren[i].nextNumberElementEqual &&
            oldChildren[j].stepToNumberElementEqual < newChildren[i].stepToNumberElementEqual) {
            addAndAddLabel(oldBlockUploader, j, newChildren[i]);
            j++;
          }
          if (
            oldChildren[j].numberElementEqual === undefined &&
            oldChildren[j].nextNumberElementEqual === newChildren[i].nextNumberElementEqual &&
            oldChildren[j].stepToNumberElementEqual < newChildren[i].stepToNumberElementEqual
          ) {
            addAndAddLabel(oldBlockUploader, j, newChildren[i]);
            j++;
          }

      }
    }
  }
}


/**
 *
 * @param oldBlockUploader {BlockUploader}
 * @param newBlockUploader {BlockUploader}
 */
function addNew(oldBlockUploader, newBlockUploader) {
  let endNumber = 1;
  let oldChildren = oldBlockUploader.children;
  let newChildren = newBlockUploader.children;
  for (let i = newChildren.length - 1; i > 0; i--) {
    if(newChildren[i].stepToNumberElementEqual !== undefined) {
      if(!oldChildren.find(item => (
        item.stepToNumberElementEqual === newChildren[i].stepToNumberElementEqual &&
        item.nextNumberElementEqual === newChildren[i].nextNumberElementEqual))) {
        //Need add
        if(newChildren[i].nextNumberElementEqual !== undefined) {
          let indexItem = oldChildren.findIndex(item => item.numberElementEqual === newChildren[i].nextNumberElementEqual);
          indexItem  = oldChildren.findIndex(item => item.numberElementEqual === newChildren[i].nextNumberElementEqual);
          addAndAddLabel(oldBlockUploader, indexItem, newChildren[i]);
        } else {
          addAndAddLabel(oldBlockUploader, oldChildren.length - endNumber , newChildren[i]);
          endNumber++;
        }

      }


    }
  }
}


/**
 * Добавляет элементы в середину
 * @param new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 */
function addMiddle(new_wsdom, old_wsdom) {
  let children = old_wsdom.children;
  for (let i = 0; i < children.length; i++) {
    let old_child = children[i];
    if (old_child.numberElementEqual !== undefined) {
      let new_child = new_wsdom.children[old_child.numberElementEqual];
      let modal = new_child.count_undefined_prev - old_child.count_undefined_prev;
      if (modal) {
        let i_new = i;
        for (let i_sub = 0; i_sub < modal; i_sub++) {
          let place = i - old_child.count_undefined_prev;
          addAndAddLabel(old_wsdom, place, new_wsdom.children[old_child.numberElementEqual - i_sub - 1]);
          i_new++;
        }
        i = i_new;
      }
    }
  }
}


/**
 * Добавляет элементы в конец
 * @param new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 */
function addEnd(new_wsdom, old_wsdom) {
  let old_children = old_wsdom.children;
  let new_children = new_wsdom.children;
  let old_children_length_minus_del = old_children.length - getCountDelete(old_wsdom);
  let count_add = new_children.length - old_children_length_minus_del;
  for (let i = 0; i < count_add; i++) {
    let new_child = new_wsdom.children[old_children_length_minus_del + i - 1];
    addAndAddLabel(old_wsdom, old_children.length - 1, new_child);
  }
}


/**
 * Возвращает количество помеченных на удаление элементов
 * @param wsdom
 * @returns {number}
 */
function getCountDelete(wsdom) {
  let count_delete = 0;
  let children = wsdom.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].check_delete) {
      count_delete++;
    }
  }
  return count_delete;
}



function addAndAddLabel(old_wsdom, place, new_child) {
  new_child.label_add = true;
  new_child.check_add = true;
  old_wsdom.addBefore(place, new_child);
}