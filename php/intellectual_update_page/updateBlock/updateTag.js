export function updateTag(BlockUploaderOld, BlockUploaderNew) {
  return _updateTag(BlockUploaderOld, BlockUploaderNew);
}

function _updateTag(BlockUploaderOld, BlockUploaderNew) {
  if (BlockUploaderOld.domElement.nodeType === 1 && BlockUploaderNew.domElement.nodeType === 1) {
    if (BlockUploaderOld.domElement.tagName !== BlockUploaderNew.domElement.tagName) {
      //So that the new element is not deleted, we need to keep it so as not to break further logic
      let cloneChildNew = BlockUploaderNew.domElement.cloneNode(true);
      //We change all the content, it doesn't come out any other way
      BlockUploaderOld.domElement.replaceWith(cloneChildNew); 
      BlockUploaderOld.turnOnLabel('update_tag'); //Add a label
      
      BlockUploaderOld.domElement = cloneChildNew;
      return true;
    }
  }
  return false;
}