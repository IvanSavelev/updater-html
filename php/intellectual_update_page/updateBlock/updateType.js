export function updateType(oldBlockUploader, newBlockUploader) {
  return _updateType(oldBlockUploader, newBlockUploader);
}


function _updateType(oldBlockUploader, newBlockUploader) {
  if (oldBlockUploader.node_type !== newBlockUploader.node_type) {
    let clone_child_new = newBlockUploader.dom_element.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
    oldBlockUploader.dom_element.replaceWith(clone_child_new); //We change all the content, it doesn't come out any other way
    oldBlockUploader.label_update_type = true; //Add a label
    return true;
  }
  return false;
}