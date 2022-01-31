export function updateType(BlockUploaderOld, BlockUploaderNew) {
  return _updateType(BlockUploaderOld, BlockUploaderNew);
}


function _updateType(BlockUploaderOld, BlockUploaderNew) {
  if (BlockUploaderOld.domElement.nodeType !== BlockUploaderNew.domElement.nodeType) {
    //So that the new element is not deleted, we need to keep it so as not to break further logic
    let cloneChildNew = BlockUploaderNew.domElement.cloneNode(true);
    //We change all the content, it doesn't come out any other way
    BlockUploaderOld.domElement.replaceWith(cloneChildNew); 
    let object = undefined;
    if(BlockUploaderOld.domElement.nodeType === 1) {
      object = BlockUploaderOld.domElement;
    } else {
      object = BlockUploaderOld.domElement.parentNode;
    }
    object.turnOnLabel('update_type')  //Add a label
    BlockUploaderOld.domElement = cloneChildNew;
    return true;
  }
  return false;
}