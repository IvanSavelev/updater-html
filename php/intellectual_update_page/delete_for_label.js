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
    let check_delete = deleteItem(item, settings.timeCloseBlink);
    if (!check_delete) { //Если уже удалили элемент - то его потомки тоже удалены и дальше лезть нет необходимости
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
  let check_delete = false;
  if (item.check_delete) {
    setTimeout(function () {
      item.dom_element.remove();
    }, timeCloseBlink + 100);
    check_delete = true;
  }
  return check_delete;
}