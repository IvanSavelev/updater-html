export function deleteElement(wsdom, settings) {
  return _deleteElement(wsdom, settings);
}


/**
 * Сносим элементы помеченные на удаление
 * @param wsdom {WSDOM}
 * @param settings - настройки модуля
 */
function _deleteElement(wsdom, settings) {
  for (let item of wsdom.children) {
    // noinspection JSUnfilteredForInLoop (нужно чтоб phpstorm не ругался)
    let isDelete = deleteItem(item, settings.timeCloseBlink);
    if (!isDelete) { //Если уже удалили элемент - то его потомки тоже удалены и дальше лезть нет необходимости
      _deleteElement(item, settings);
    }
  }
}


/**
 * Функция удаляет элемент, по метке "delete"
 * @param item
 * @param timeCloseBlink
 * @returns {boolean}
 */
function deleteItem(item, timeCloseBlink) {
  let isDelete = false;
  if (item.isDelete) {
    setTimeout(function () {
      item.domElement.remove();
    }, timeCloseBlink + 100);
    isDelete = true;
  }
  return isDelete;
}