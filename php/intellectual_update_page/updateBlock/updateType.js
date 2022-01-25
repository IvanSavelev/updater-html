export function updateType(oldBlockUploader, newBlockUploader) {
  return _updateType(oldBlockUploader, newBlockUploader);
}


function _updateType(oldBlockUploader, newBlockUploader) {
  if (oldBlockUploader.domElement.nodeType !== newBlockUploader.domElement.nodeType) {
    let cloneChildNew = newBlockUploader.domElement.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
    oldBlockUploader.domElement.replaceWith(cloneChildNew); //We change all the content, it doesn't come out any other way
    let object = undefined;
    if(oldBlockUploader.domElement.nodeType === 1) {
      object = oldBlockUploader.domElement;
    } else {
      object = oldBlockUploader.domElement.parentNode;
    }
    object.turnOnLabel('update_type')  //Add a label
    oldBlockUploader.domElement = cloneChildNew;
    return true;
  }
  return false;
}