export function updateType(oldBlockUploader, newBlockUploader) {
  return _updateType(oldBlockUploader, newBlockUploader);
}


function _updateType(oldBlockUploader, newBlockUploader) {
  if (oldBlockUploader.node_type !== newBlockUploader.node_type) {
    let cloneChildNew = newBlockUploader.dom_element.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
    oldBlockUploader.dom_element.replaceWith(cloneChildNew); //We change all the content, it doesn't come out any other way
    let object = undefined;
    if(oldBlockUploader.node_type === 1) {
      object = oldBlockUploader.dom_element;
    } else {
      object = oldBlockUploader.dom_element.parentNode;
    }
    object.label_update_type = true; //Add a label
    oldBlockUploader.dom_element = cloneChildNew;
    return true;
  }
  return false;
}