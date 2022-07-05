export function addNumberElementEqual(_BlockUploaderOld, _BlockUploaderNew) {
  BlockUploaderOld = _BlockUploaderOld;
  BlockUploaderNew = _BlockUploaderNew;
  return _addNumberElementEqual();
}

let BlockUploaderOld
let BlockUploaderNew


function _addNumberElementEqual() {
  let lastIndex = 0;
  for (let [newIndex, newItem]  of BlockUploaderNew.children.entries()) {
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
}


function getElementOldEqual(elementNew,startFind = 0) {
  if(elementNew.settingsGeneral.onlyUpdate) { //Check only direct matching
    return getElementOldEqualOnlyUpdate(elementNew,startFind);
  } else {
    return getElementOldEqualStandard(elementNew,startFind);
  }
}

function getElementOldEqualOnlyUpdate(elementNew,startFind) {
  let elementOld = BlockUploaderOld.children[startFind];
  if (elementOld.domElement.nodeType === 1 && elementOld.domElement.isEqualNode(elementNew.domElement)) {
    return elementOld;
  }
  if (elementOld.domElement.nodeType !== 1 && elementOld.domElement.nodeValue === elementNew.domElement.nodeValue) {
    return elementOld;
  }

  return false;
}

function getElementOldEqualStandard(elementNew,startFind) {
  for (let i = startFind; i < BlockUploaderOld.children.length; i++) {
    let elementOld = BlockUploaderOld.children[i];
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



