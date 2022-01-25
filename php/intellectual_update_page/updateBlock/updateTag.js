export function updateTag(oldBlockUploader, newBlockUploader) {
  return _updateTag(oldBlockUploader, newBlockUploader);
}

function _updateTag(oldBlockUploader, newBlockUploader) {
  if (oldBlockUploader.domElement.nodeType === 1 && newBlockUploader.domElement.nodeType === 1) {
    if (oldBlockUploader.domElement.tagName !== newBlockUploader.domElement.tagName) {
      let cloneChildNew = newBlockUploader.domElement.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
      oldBlockUploader.domElement.replaceWith(cloneChildNew); //We change all the content, it doesn't come out any other way
      oldBlockUploader.turnOnLabel('update_tag'); //Add a label
      
      oldBlockUploader.domElement = cloneChildNew;
      return true;
    }
  }
  return false;
}