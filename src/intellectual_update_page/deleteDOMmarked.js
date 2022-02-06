export function deleteDOMmarked(BlockUploader, settings) {
  return _deleteDOMmarked(BlockUploader, settings);
}


/**
 * Delete element marked for remove
 */
function _deleteDOMmarked(BlockUploader, settings) {
  for (let item of BlockUploader.children) {
    // noinspection JSUnfilteredForInLoop (нужно чтоб phpstorm не ругался)
    let isDelete = deleteItem(item, settings.timeCloseBlink);
    if (!isDelete) { 
      //If an element has already been deleted, then its children are also deleted and there is no need to climb further
      _deleteDOMmarked(item, settings);
    }
  }
}


/**
 * The function deletes the element, by the label "delete"
 */
function deleteItem(item, timeCloseBlink) {
  let isDelete = false;
  if (item.isDelete) {
    setTimeout(function () {
      item.domElement.remove();
    }, timeCloseBlink + 100);
    isDelete = true;
  }
  return isDelete;
}