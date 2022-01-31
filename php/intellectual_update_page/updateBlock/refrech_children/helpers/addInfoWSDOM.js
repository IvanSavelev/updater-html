export function addInfoWSDOM(old_wsdom, new_wsdom) {
  return _addInfoWSDOM(old_wsdom, new_wsdom);
}

/**
 * Добавляет информацию об текущем относительном положении для детей объектов old_wsdom, new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 */
function _addInfoWSDOM(old_wsdom, new_wsdom) {
  addInfo(old_wsdom);
  addInfo(new_wsdom);
}


/**
 * Добавляем/обновляем информацю для детей объектов
 * @param wsdom {WSDOM}
 */
function addInfo(BlockUploaderNew) {
  let j = 0;
  for (let i = 0; i < BlockUploaderNew.children.length; i++) {

    let item = BlockUploaderNew.children[i];
    if(item.numberElementEqual !== undefined) {
      item.countUndefinedPrev = j;
      j = 0;
    } else {
      j++;
    }

  }

  j =0;
  for (let i = BlockUploaderNew.children.length - 1; i > 0; i--) {

    let item = BlockUploaderNew.children[i];
    if(item.numberElementEqual !== undefined) {
      item.countUndefinedNext = j;
      j = 0;
    } else {
      j++;
    }
  }
}