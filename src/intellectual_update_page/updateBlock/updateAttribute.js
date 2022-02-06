export function updateAttribute(old_block, new_block) {
  _updateAttribute(old_block, new_block);
}


function _updateAttribute(BlockUploaderOld, BlockUploaderNew) {
  if (checkUpdate(BlockUploaderOld, BlockUploaderNew)) {
    update(BlockUploaderOld, BlockUploaderNew);
  }
}


function checkUpdate(BlockUploaderOld, BlockUploaderNew) {

  let attributesOld = BlockUploaderOld.domElement.attributes;
  let attributesNew = BlockUploaderNew.domElement.attributes;


  if (attributesOld.length !== attributesNew.length) {
    return true;  //Their number is different, so you definitely need to change
  }

  let changedAttributes = false;
  for (let i = 0; i < attributesOld.length; i++) {
    let oldAttr = attributesOld.item(i);
    let newAttr = attributesNew.getNamedItem(oldAttr.name);
    if (!newAttr) {
      //There is no such attribute in the new block at all - We change the old attributes to new ones
      changedAttributes = true;
      break;
    }
    if (oldAttr.nodeValue !== newAttr.nodeValue) {
      changedAttributes = true;//The attribute is not equal, so we change everything to everything
      break;
    }
  }
  return changedAttributes;
}

function update(BlockUploaderOld, BlockUploaderNew) {
  let attributesOld = BlockUploaderOld.domElement.attributes;
  let attributesNew = BlockUploaderNew.domElement.attributes;

  //Remove old
  while (attributesOld.length > 0) {
    BlockUploaderOld.domElement.removeAttribute(attributesOld[0].name);
  }
  //Paste new
  for (let i = 0; i < attributesNew.length; i++) {
    BlockUploaderOld.domElement.setAttribute(attributesNew[i].name, attributesNew[i].value);
  }
  BlockUploaderOld.turnOnLabel('update_attributes')
}