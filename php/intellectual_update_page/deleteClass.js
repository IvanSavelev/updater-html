export function deleteClass(BlockUploader, settings) {
  return _deleteClass(BlockUploader, settings);
}


/**
 * Show, and remove the winks
 * @param BlockUploader
 * @param settings
 * @private
 */
function _deleteClass(BlockUploader, settings) {
  closeBlink(BlockUploader, settings);
}

/**
 * Removing the highlighting classes of the changed areas
 */
function closeBlink(BlockUploader, settings) {
  closeBlinkItem(BlockUploader);
  for (let item of BlockUploader.children) {
    // noinspection JSUnfilteredForInLoop
    closeBlink(item, settings);
  }

  /**
   * Compare, if an object has a property with this label, then remove the class from it
   * @param block {BlockUploader}
   */
  function closeBlinkItem(block) {
    const labelList = block.getTurnOnLabelList();
    labelList.forEach((label) => {
      closeClassBlink(block, settings.classColorFlag[label], settings.timeCloseBlink); 
    });
  }

  /**
   * Delete class through timeCloseBlink
   */
  function closeClassBlink(block, nameClass, timeCloseBlink) {
    setTimeout(function () { 
      let domElement = block.domElement;
      if (domElement.classList) {
        domElement.classList.remove(nameClass);
      }
    }, timeCloseBlink);
  }
}

