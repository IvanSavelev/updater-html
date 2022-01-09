export function addNumberElementEqual(oldBlockUploader, newBlockUploader) {
  return _addNumberElementEqual(oldBlockUploader, newBlockUploader);
}

function _addNumberElementEqual(oldBlockUploader, newBlockUploader) {
  for (let [newIndex, newItem]  of newBlockUploader.children.entries()) {
    for (let oldItem of oldBlockUploader.children) {
      if(oldItem.numberElementEqual === undefined) {
        if (oldItem.node_type === 1 && oldItem.dom_element.isEqualNode(newItem.dom_element)) {
          oldItem.numberElementEqual = newIndex;
          newItem.numberElementEqual = newIndex;
          break;
        }
        if (oldItem.node_type !== 1 && oldItem.dom_element.nodeValue === newItem.dom_element.nodeValue) {
          oldItem.numberElementEqual = newIndex;
          newItem.numberElementEqual = newIndex;
          break;
        }
      }
    }
  }

  oldBlockUploader.logger('Properties of objects (old):');
  newBlockUploader.logger('Properties of objects (new):');
}



