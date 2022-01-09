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

export function updateBlock(oldBlockUploader, newBlockUploader) {
  return _updateBlock(oldBlockUploader, newBlockUploader);
}

/**
 * The function compares the old and new blocks, and if necessary, sends the block for redrawing
 */
function _updateBlock(oldBlockUploader, newBlockUploader) {
  let isUpdateTag = updateTag(oldBlockUploader, newBlockUploader); //Generally replaces everything  (even styles!), and highlights the entire
  let isUpdateType = updateType(oldBlockUploader, newBlockUploader); //Generally replaces everything (even styles!), and highlights the entire element as modified
  if (isUpdateTag || isUpdateType) {
    return; //If you changed the traction, or the type, then there is no point in continuing - all the old_block content has been replaced with new_block
  }
  updateAttribute(oldBlockUploader, newBlockUploader); //module updateAttribute.js
  updateChild(oldBlockUploader, newBlockUploader);
}


/**
 * Updating nested elements
 */
function updateChild(oldBlockUploader, newBlockUploader) {
  addNumberElementEqual(oldBlockUploader, newBlockUploader);
  moveElements(oldBlockUploader);
  moveElementsAnalytical(oldBlockUploader, newBlockUploader);
  //checkElements(oldBlockUploader, newBlockUploader);
  deleteElements(oldBlockUploader, newBlockUploader);
  addElements(oldBlockUploader, newBlockUploader);
  updateElements(oldBlockUploader, newBlockUploader);
  checkElements(oldBlockUploader, newBlockUploader);
}