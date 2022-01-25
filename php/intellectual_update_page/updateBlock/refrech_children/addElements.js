

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

  oldBlockUploader.logger('Выводим св-ва объектов (старые)(до добавления):', 'delete', 'label_add', 'stepToNumberElementEqual', 'nextNumberElementEqual', 'stepToNumberElementEqualReverse');
  newBlockUploader.logger('Выводим св-ва объектов (новые):', 'stepToNumberElementEqual', 'nextNumberElementEqual','stepToNumberElementEqualReverse');
  add(oldBlockUploader, newBlockUploader);
  oldBlockUploader.logger('Выводим св-ва объектов (старые)(после добавления):', 'delete', 'label_add', 'stepToNumberElementEqual', 'nextNumberElementEqual', 'stepToNumberElementEqualReverse');
}

function addStepAndNextNumberElementEqual(blockUploader) {
  let children = blockUploader.children;
  let endNumber = 1;
  let prev = 1;
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
        children[i].stepToNumberElementEqual = children.length - i; //That reverse number for adding new element in end
        children[i].nextNumberElementEqual = undefined;
        endNumber++;
      }
      children[i].stepToNumberElementEqualReverse=prev;
      prev++;
    }
    if(children[i].numberElementEqual !== undefined) {
      prev =1;
    }
  }
  /*
    let counter = children.length -1;
    for (let i = children.length -1; i > 0; i--) {
      if(children[i].numberElementEqual !== undefined) {
        counter = 0;
      }
      if( children[i].numberElementEqual === undefined) {
        counter++;
        children[i].stepToNumberElementEqualReverse = i;
      }
  
    }*/

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
  for (let i = 0; i < newChildren.length; i++) {
    if(newChildren[i].stepToNumberElementEqualReverse !== undefined && newChildren[i].nextNumberElementEqual !== undefined) {
      if(!oldChildren.find(item => (
        item.stepToNumberElementEqualReverse === newChildren[i].stepToNumberElementEqualReverse &&
        item.nextNumberElementEqual === newChildren[i].nextNumberElementEqual))) {
        //Need add

        let indexItem = oldChildren.findIndex(item => item.numberElementEqual === newChildren[i].nextNumberElementEqual);
        addAndAddLabelBefore(oldBlockUploader, indexItem, newChildren[i]);
      }
    }
  }

  //In end
  let countElementEndOld = oldChildren.filter(item => item.nextNumberElementEqual === undefined).length;
  let countElementEndNew = newChildren.filter(item => item.nextNumberElementEqual === undefined).length;
  let countAddInEnd = countElementEndNew - countElementEndOld
  let counter = 0;
  for (let i = newChildren.length -  countAddInEnd; i < newChildren.length; i++) {
    addAndAddLabelAfter(oldBlockUploader, oldChildren.length - 1, newChildren[i]);
    counter++;
  }

}

function addAndAddLabelAfter(old_wsdom, place, new_child) {
  addProperty(new_child);
  old_wsdom.addAfter(place, new_child);
}

function addAndAddLabelBefore(old_wsdom, place, new_child) {
  addProperty(new_child);
  old_wsdom.addBefore(place, new_child);
}

function addProperty(new_child) {
  new_child.turnOnLabel('add');
  new_child.isAdd = true;
}