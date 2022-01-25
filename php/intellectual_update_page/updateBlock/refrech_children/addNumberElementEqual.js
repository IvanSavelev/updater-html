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
            if (newItem.domElement.nodeType !== 1) {
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
      if (elementOld.domElement.nodeType === 1 && elementOld.domElement.isEqualNode(elementNew.domElement)) {
        return elementOld;
      }
      if (elementOld.domElement.nodeType !== 1 && elementOld.domElement.nodeValue === elementNew.domElement.nodeValue) {
        return elementOld;
      }
    }
  }
  return false;
}



