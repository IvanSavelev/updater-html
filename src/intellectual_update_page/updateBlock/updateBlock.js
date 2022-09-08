import {updateAttribute} from "./updateAttribute.js";
import {updateTag} from "./updateTag.js";
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

let moduleStatus = undefined;

/**
 * The function compares the old and new blocks, and if necessary, sends the block for redrawing
 */
function _updateBlock(BlockUploaderOld, BlockUploaderNew) {
  moduleStatus = BlockUploaderOld.settingsGeneral.moduleStatus;
  
  let isUpdateTag = null;
  if(moduleStatus.update_tag === 'working') {
    //Generally replaces everything  (even styles!), and highlights the entire
    isUpdateTag = updateTag(BlockUploaderOld, BlockUploaderNew);
  }
  
  if (isUpdateTag) {
    return; //If you changed the traction, or the type, then there is no point in continuing - all 
    // the old_block content has been replaced with new_block
  }

  if(moduleStatus.update_attributes === 'working') {
    updateAttribute(BlockUploaderOld, BlockUploaderNew);
  }
  
  updateChild(BlockUploaderOld, BlockUploaderNew);
}


/**
 * Updating nested elements
 */
function updateChild(BlockUploaderOld, BlockUploaderNew) {
  addNumberElementEqual(BlockUploaderOld, BlockUploaderNew);
  BlockUploaderOld.logger('Start (old):', );
  BlockUploaderNew.logger('Start (new):', );
  
  if(moduleStatus.move === 'working') {
    moveElements(BlockUploaderOld);
  }
  if(moduleStatus.move_analytical === 'working' && !BlockUploaderOld.settingsGeneral.onlyAddAndDelete) {
    moveElementsAnalytical(BlockUploaderOld, BlockUploaderNew);
  }

  deleteElements(BlockUploaderOld, BlockUploaderNew);
  addElements(BlockUploaderOld, BlockUploaderNew);
  updateElements(BlockUploaderOld, BlockUploaderNew);

  BlockUploaderOld.logger('End (old):', );
  BlockUploaderNew.logger('End (new):', );

  if(moduleStatus.move === 'working') {
    checkElements(BlockUploaderOld, BlockUploaderNew);
  }
  
}