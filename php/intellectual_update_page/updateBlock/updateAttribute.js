export function updateAttribute(old_block, new_block) {
  _updateAttribute(old_block, new_block);
}


function _updateAttribute(oldBlockUploader, newBlockUploader) {
  if (checkUpdate(oldBlockUploader, newBlockUploader)) {
    update(oldBlockUploader, newBlockUploader);
  }
}


function checkUpdate(oldBlockUploader, newBlockUploader) {

  let oldAttributes = oldBlockUploader.domElement.attributes;
  let newAttributes = newBlockUploader.domElement.attributes;


  if (oldAttributes.length !== newAttributes.length) {
    return true;  //Their number is different, so you definitely need to change
  }

  let changedAttributes = false;
  for (let i = 0; i < oldAttributes.length; i++) {
    let oldAttr = oldAttributes.item(i);
    let newAttr = newAttributes.getNamedItem(oldAttr.name);
    if (!newAttr) {
      changedAttributes = true;//There is no such attribute in the new block at all - We change the old attributes to new ones
      break;
    }
    if (oldAttr.nodeValue !== newAttr.nodeValue) {
      changedAttributes = true;//The attribute is not equal, so we change everything to everything
      break;
    }
  }
  return changedAttributes;
}

function update(oldBlockUploader, newBlockUploader) {
  let oldAttributes = oldBlockUploader.domElement.attributes;
  let newAttributes = newBlockUploader.domElement.attributes;

  //Remove old
  while (oldAttributes.length > 0) {
    oldBlockUploader.domElement.removeAttribute(oldAttributes[0].name);
  }
  //Paste new
  for (let i = 0; i < newAttributes.length; i++) {
    oldBlockUploader.domElement.setAttribute(newAttributes[i].name, newAttributes[i].value);
  }
  oldBlockUploader.turnOnLabel('update_attributes')
}