export function updateTag(oldBlockUploader, newBlockUploader) {
  return _updateTag(oldBlockUploader, newBlockUploader);
}

function _updateTag(oldBlockUploader, newBlockUploader) {
  if (oldBlockUploader.node_type === 1 && newBlockUploader.node_type === 1) {
    if (oldBlockUploader.dom_element.tagName !== newBlockUploader.dom_element.tagName) {
      let cloneChildNew = newBlockUploader.dom_element.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
      oldBlockUploader.dom_element.replaceWith(cloneChildNew); //We change all the content, it doesn't come out any other way
      oldBlockUploader.label_update_tag = true; //Add a label
      return true;
    }
  }
  return false;
}