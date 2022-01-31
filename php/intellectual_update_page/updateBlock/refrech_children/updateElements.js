import {updateBlock} from "../updateBlock.js";
import {BlockUploader} from "../../BlockUploader.js";


export function updateElements(_BlockUploaderOld, _BlockUploaderNew) {
  BlockUploaderOld = _BlockUploaderOld;
  BlockUploaderNew = _BlockUploaderNew;
  return _updateElements();
}

let BlockUploaderOld
let BlockUploaderNew


function _updateElements() {
  let old_children = BlockUploaderOld.children;
  let new_children = BlockUploaderNew.children;
  let countDelete = 0;
  for (let i = 0; i < old_children.length; i++) {
    if (old_children[i].isDelete === true) {
      countDelete++; //Counting the number of items to delete
      continue;
    }
    if (old_children[i].numberElementEqual === undefined) {
      //Skip the elements that have just been added
      if (old_children[i].isAdd) {
        continue;
      }
      updateElement(old_children[i], new_children[i - countDelete], BlockUploaderOld, i);
    }
  }
  BlockUploaderOld.logger('The properties of objects (old)(after update):', '');

}



function updateElement(BlockOld, BlockNew,  BlockParent, i) {
  if (
    BlockOld.domElement.nodeType === 1 &&
    BlockNew.domElement.nodeType === 1 &&
    BlockOld.children.length &&
    BlockNew.children.length
  ) {
    updateBlock(BlockOld, BlockNew); //RECURSIVELY CHECK
  } else {
    updateBlockEnding(BlockOld, BlockNew, BlockParent, i);
  }
}

function updateBlockEnding(BlockOld, BlockNew, BlockParent, i) {


  let old_node_value = BlockOld.domElement.nodeValue ?? BlockOld.domElement.outerHTML;
  let new_node_value = BlockNew.domElement.nodeValue ?? BlockNew.domElement.outerHTML;
  let old_value = (old_node_value ? old_node_value : '').trim();
  let new_value = (new_node_value ? new_node_value : '').trim();
  if (old_value !== new_value) {
    //So that the new element is not deleted, we need to keep it so as not to break further logic
    let cloneChildNew = BlockNew.domElement.cloneNode(true); 
    BlockOld.domElement.replaceWith(cloneChildNew);
    let db = new BlockUploader(cloneChildNew);
    db.turnOnLabel('update_content');
    BlockParent.children.splice(i ,1, db);
    if(db.domElement.nodeType === 3  && new_value !== "") {
      BlockParent.turnOnLabel('update_content');
    }
  }

}


