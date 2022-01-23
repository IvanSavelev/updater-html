export function addNumberElementEqual(_oldBlockUploader, _newBlockUploader) {
  oldBlockUploader = _oldBlockUploader;
  newBlockUploader = _newBlockUploader;
  return _addNumberElementEqual();
}

let oldBlockUploader
let newBlockUploader


function _addNumberElementEqual() {
  let lastIndex = 0;
  for (let [newIndex, newItem]  of newBlockUploader.children.entries()) {
            if (newItem.node_type !== 1) {
              continue;
            }
    let elementOld = getElementOldEqual(newItem, lastIndex);
    if (!elementOld) {
      elementOld = getElementOldEqual(newItem, 0); 
    }

    if (elementOld) {
      newItem.numberElementEqual = newIndex;
      elementOld.numberElementEqual = newIndex;
      lastIndex = newIndex;
    }
  }

  oldBlockUploader.logger('Properties of objects (old):');
  newBlockUploader.logger('Properties of objects (new):');
}


function getElementOldEqual(elementNew,startFind = 0) {
  
  for (let i = startFind; i < oldBlockUploader.children.length; i++) {
    let elementOld = oldBlockUploader.children[i];
    if(elementOld.numberElementEqual === undefined) {
      if (elementOld.node_type === 1 && elementOld.dom_element.isEqualNode(elementNew.dom_element)) {
        return elementOld;
      }
      if (elementOld.node_type !== 1 && elementOld.dom_element.nodeValue === elementNew.dom_element.nodeValue) {
        return elementOld;
      }
    }
  }
  return false;
}



