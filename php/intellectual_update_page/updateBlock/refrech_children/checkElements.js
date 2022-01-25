export function checkElements(old_wsdom, new_wsdom) {
  debug = old_wsdom.debug;
  return _checkElements(old_wsdom, new_wsdom);
}

let debug = null;


/**
 * Проверяем элементы
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 */
function _checkElements(old_wsdom, new_wsdom) {
  let old_children = old_wsdom.children;
  let new_children = new_wsdom.children;
  let count_delete = 0;
  for (let i = 0; i < old_children.length; i++) {
    if (old_children[i].isDelete === true) {
      count_delete++; //Считаем количество элементов на удаление
      continue;
    }
    if (old_children[i].numberElementEqual) {
      let new_child = new_children[old_children[i].numberElementEqual].domElement;
      if (!new_child) {
        showError('No compliance!');
      }
      if (!old_children[i].domElement.isEqualNode(new_child)) {
        showError('No equal!');
      }
    }

    if (old_children[i].numberElementEqual === undefined && new_children[i - count_delete].numberElementEqual !== undefined) {
      showError('No equal numberElementEqual!');
    }
  }

  if (old_children.length - count_delete !== new_children.length) {
    showError('Different number of items!!');
  }
}


/**
 * Либо вызываем ошибку, либо пишем консоль браузера об неполадке
 * @param text - текст сообщения
 */
function showError(text) {
  if (debug) {
    console.log(text);
    throw new Error(text);
  } else {
    console.log(text);
  }
}