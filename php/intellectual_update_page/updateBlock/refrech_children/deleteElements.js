import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";

export function deleteElements(_BlockUploaderOld, _BlockUploaderNew) {
  BlockUploaderOld = _BlockUploaderOld;
  BlockUploaderNew = _BlockUploaderNew;
  return _deleteElements();
}

let BlockUploaderOld
let BlockUploaderNew


/**
 * Removes elements
 */
function _deleteElements() {
  addInfoWSDOM(BlockUploaderOld, BlockUploaderNew);
  let amendmentDelete = deleteMiddle();
  deleteEnd(amendmentDelete);
  
  BlockUploaderOld.logger('The properties of objects (old)(after deletion):', );
}


/**
 * Deletes in the middle
 * @returns {number} count elements for delete
 */
function deleteMiddle() {
  let children = BlockUploaderOld.children;
  let amendmentDelete = 0;
  for (let i = 0; i < children.length; i++) {
    let childOld = children[i];
    if (childOld.numberElementEqual !== undefined) {
      let childNew = BlockUploaderNew.children[childOld.numberElementEqual];
      let modal = childOld.countUndefinedPrev - childNew.countUndefinedPrev;
      if (modal) {
        for (let j = 0; j < modal; j++) {
          deleteAndAddLabel(children[i - j - 1]);
          amendmentDelete++;
        }
      }
    }
  }
  return amendmentDelete;
}

/**
 * Removes elements at the end
 * @param amendmentDelete - the number of elements marked for deletion, it is necessary that they are not taken into account when comparing
 */
function deleteEnd(amendmentDelete) {
  let childrenOld = BlockUploaderOld.children;
  let countDelete = getCountDeleteEnd();
  for (let i = 0; i < countDelete; i++) {
    deleteAndAddLabel(childrenOld[childrenOld.length - 1 - i]);
  }
}

/**
 * Marks an item with a deleted label
 */
function deleteAndAddLabel(blockUpdater) {
  blockUpdater.turnOnLabel('delete')
  blockUpdater.isDelete = true;
}


/**
 * Возвращает количество элементов в BlockUploaderOld, которое надо удалить
 * @returns {number}
 */
function getCountDeleteEnd() {
  let new_count_last = getCountLastEl(BlockUploaderNew);
  let old_count_last = getCountLastEl(BlockUploaderOld);
  return old_count_last - new_count_last;

  /**
   * Возвращает количество последних элементов, после последнего элемента с numberElementEqual
   * @returns {number}
   */
  function getCountLastEl(blockUploader) {
    let children = blockUploader.children;
    for (let i = children.length - 1; i > 0; i--) {
      if (children[i].numberElementEqual !== undefined) {
        return children[i].countUndefinedNext;
      }
    }
    return blockUploader.children.length;
  }
}