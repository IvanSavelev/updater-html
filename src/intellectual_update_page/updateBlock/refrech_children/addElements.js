export function addElements(_BlockUploaderOld, _BlockUploaderNew) {
  BlockUploaderOld = _BlockUploaderOld;
  BlockUploaderNew = _BlockUploaderNew;
  return _addElements();
}

let BlockUploaderOld
let BlockUploaderNew


function _addElements() {

  addStepAndNextNumberElementEqual(BlockUploaderOld);
  addStepAndNextNumberElementEqual(BlockUploaderNew);

  add();
  BlockUploaderOld.logger('Output the properties of objects (old)(after adding):', 'delete', 'label_add', 'stepToNumberElementEqual', 'nextNumberElementEqual', 'stepToNumberElementEqualReverse');
}

function addStepAndNextNumberElementEqual(blockUploader) {
  let children = blockUploader.children;
  let endNumber = 1;
  let prev = 1;
  for (let i = 0; i < children.length; i++) {

    if( children[i].numberElementEqual === undefined) {
      let isUpdate = false;
      for (let j = i; j < children.length; j++) {
        if(children[j].numberElementEqual !== undefined) {
          children[i].stepToNumberElementEqual = j - i;
          children[i].nextNumberElementEqual = children[j].numberElementEqual;
          isUpdate = true;
          break;
        }
      }
      //Last block for adding
      if(!isUpdate) {
        children[i].stepToNumberElementEqual = children.length - i; //That reverse number for adding new element in end
        children[i].nextNumberElementEqual = undefined;
        endNumber++;
      }
      children[i].stepToNumberElementEqualReverse=prev;
      prev++;
    }
    if(children[i].numberElementEqual !== undefined) {
      prev =1;
    }
  }
  
}

function add() {
  let oldChildren = BlockUploaderOld.children;
  let newChildren = BlockUploaderNew.children;
  for (let i = 0; i < newChildren.length; i++) {
    if(
      newChildren[i].stepToNumberElementEqualReverse !== undefined && 
      newChildren[i].nextNumberElementEqual !== undefined
    ) {
      if(!oldChildren.find(item => (
        item.stepToNumberElementEqualReverse === newChildren[i].stepToNumberElementEqualReverse &&
        item.nextNumberElementEqual === newChildren[i].nextNumberElementEqual))) {
        //Need add
        let indexItem = oldChildren.findIndex(item => item.numberElementEqual === newChildren[i].nextNumberElementEqual);
        addAndAddLabelBefore( indexItem, newChildren[i]);
      }
    }
  }

  //In end
  let countElementEndOld = oldChildren.filter(item => item.nextNumberElementEqual === undefined).length;
  let countElementEndNew = newChildren.filter(item => item.nextNumberElementEqual === undefined).length;
  let countAddInEnd = countElementEndNew - countElementEndOld
  let counter = 0;
  for (let i = newChildren.length -  countAddInEnd; i < newChildren.length; i++) {
    addAndAddLabelAfter( oldChildren.length - 1, newChildren[i]);
    counter++;
  }

}

function addAndAddLabelAfter(place, new_child) {
  addProperty(new_child);
  BlockUploaderOld.addAfter(place, new_child);
}

function addAndAddLabelBefore(place, new_child) {
  addProperty(new_child);
  BlockUploaderOld.addBefore(place, new_child);
}

function addProperty(new_child) {
  let block = null;
  if(BlockUploaderOld.selectorHook) {
    //If it is a hook:
    block = BlockUploaderOld;
  } else {
    block = new_child;
  }

  block.turnOnLabel('add');
  block.isAdd = true;
  
}