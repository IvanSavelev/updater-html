import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";

export function deleteElements(old_wsdom, new_wsdom) {
  return _deleteElements(old_wsdom, new_wsdom);
}


/**
 * Удаляет элементы
 * @param old_wsdom
 * @param new_wsdom
 */
function _deleteElements(old_wsdom, new_wsdom) {
  addInfoWSDOM(old_wsdom, new_wsdom);
  let amendment_delete = deleteMiddle(new_wsdom, old_wsdom);
  deleteEnd(new_wsdom, old_wsdom, amendment_delete);
 // old_wsdom.logger('Выводим св-ва объектов (старые)(после удаления):', 'label_delete');
}


/**
 * Удаляет в середине
 * @param new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 * @returns {number} количество элементов отмеченное на удаление
 */
function deleteMiddle(new_wsdom, old_wsdom) {
  let children = old_wsdom.children;
  let amendment_delete = 0;
  for (let i = 0; i < children.length; i++) {
    let old_child = children[i];
    if (old_child.numberElementEqual !== undefined) {
      let new_child = new_wsdom.children[old_child.numberElementEqual];
      let modal = old_child.countUndefinedPrev - new_child.countUndefinedPrev;
      if (modal) {
        for (let i_sub = 0; i_sub < modal; i_sub++) {
          deleteAndAddLabel(children[i - i_sub - 1]);
          amendment_delete++;
        }
      }
    }
  }
  return amendment_delete;
}

/**
 * Удаляет элементы в конце
 * @param new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 * @param amendment_delete количество элементов отмеченное на удаление, нужно чтобы их при сравнении не учитывать
 */
function deleteEnd(new_wsdom, old_wsdom, amendment_delete) {
  let old_children = old_wsdom.children;
  let count_delete = getCountDeleteEnd(new_wsdom, old_wsdom);
  for (let i = 0; i < count_delete; i++) {
    deleteAndAddLabel(old_children[old_children.length - 1 - i]);
  }
}

/**
 * Помечает элемент удаленным и меткой
 * @param wsdom {WSDOM}
 */
function deleteAndAddLabel(wsdom) {
  wsdom.turnOnLabel('delete')  //Add a label
  wsdom.isDelete = true;
}


/**
 * Возвращает количество элементов в old_wsdom, которое надо удалить
 * @param new_wsdom {WSDOM}
 * @param old_wsdom {WSDOM}
 * @returns {number}
 */
function getCountDeleteEnd(new_wsdom, old_wsdom) {
  let new_count_last = getCountLastEl(new_wsdom);
  let old_count_last = getCountLastEl(old_wsdom);
  return old_count_last - new_count_last;

  /**
   * Возвращает количество последних элементов, после последнего элемента с numberElementEqual
   * @param wsdom
   * @returns {number}
   */
  function getCountLastEl(wsdom) {
    let children = wsdom.children;
    for (let i = children.length - 1; i > 0; i--) {
      if (children[i].numberElementEqual !== undefined) {
        return children[i].countUndefinedNext;
      }
    }
    return wsdom.children.length;
  }
}