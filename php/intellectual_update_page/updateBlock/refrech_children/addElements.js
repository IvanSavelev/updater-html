

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
  add(oldBlockUploader, newBlockUploader);
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

function addAndAddLabel(old_wsdom, place, new_child) {
  new_child.label_add = true;
  new_child.check_add = true;
  old_wsdom.addBefore(place, new_child);
}