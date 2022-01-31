import {updateAttribute} from "./updateAttribute.js";
import {updateTag} from "./updateTag.js";
import {updateType} from "./updateType.js";
import {addNumberElementEqual} from './refrech_children/addNumberElementEqual.js';
import {moveElements} from './refrech_children/moveElements.js';
import {moveElementsAnalytical} from './refrech_children/moveElementsAnalytical.js';
import {deleteElements} from './refrech_children/deleteElements.js';
import {addElements} from './refrech_children/addElements.js';
import {checkElements} from './refrech_children/checkElements.js';
import {updateElements} from './refrech_children/updateElements.js';

export function updateBlock(BlockUploaderOld, BlockUploaderNew) {
  return _updateBlock(BlockUploaderOld, BlockUploaderNew);
}

/**
 * The function compares the old and new blocks, and if necessary, sends the block for redrawing
 */
function _updateBlock(BlockUploaderOld, BlockUploaderNew) {
  //Generally replaces everything  (even styles!), and highlights the entire
  let isUpdateTag = updateTag(BlockUploaderOld, BlockUploaderNew);
  //Generally replaces everything (even styles!), and highlights the entire element as modified
  let isUpdateType = updateType(BlockUploaderOld, BlockUploaderNew); 
  if (isUpdateTag || isUpdateType) {
    return; //If you changed the traction, or the type, then there is no point in continuing - all 
    // the old_block content has been replaced with new_block
  }
  updateAttribute(BlockUploaderOld, BlockUploaderNew);
  updateChild(BlockUploaderOld, BlockUploaderNew);
}


/**
 * Updating nested elements
 */
function updateChild(BlockUploaderOld, BlockUploaderNew) {
  addNumberElementEqual(BlockUploaderOld, BlockUploaderNew);
  moveElements(BlockUploaderOld);
  moveElementsAnalytical(BlockUploaderOld, BlockUploaderNew);
  deleteElements(BlockUploaderOld, BlockUploaderNew);
  addElements(BlockUploaderOld, BlockUploaderNew);
  updateElements(BlockUploaderOld, BlockUploaderNew);
  checkElements(BlockUploaderOld, BlockUploaderNew);
}