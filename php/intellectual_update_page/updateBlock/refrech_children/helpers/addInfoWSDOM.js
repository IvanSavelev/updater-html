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
function addInfo(wsdom) {
  let count_undefined = 0;
  let last_wsdom = undefined;
  let children = wsdom.children;
  for (let i = 0; i < children.length; i++) {
    let item = children[i];
    item.number_element = i;

    if (item.numberElementEqual === undefined && item.check_delete === undefined) {
      count_undefined++;
      if (last_wsdom) { //Для того чтоб значение в последнем numberElementEqual элементе записалось
        last_wsdom.count_undefined_next = count_undefined; //Если Последний элемент, то запишется это значение, если нет, то перезапишется
      }
      continue;
    }

    if (item.numberElementEqual !== undefined) {
      if (last_wsdom) {
        last_wsdom.count_undefined_next = count_undefined;
        last_wsdom.next = item;
        item.prev = last_wsdom;
      } else {
        item.prev = undefined;
      }
      item.count_undefined_prev = count_undefined;
      last_wsdom = item;
      count_undefined = 0;
    }

  }
}