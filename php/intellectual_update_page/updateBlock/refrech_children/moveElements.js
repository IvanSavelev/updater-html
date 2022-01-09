export function moveElements(old_wsdom) {
  return _moveElements(old_wsdom);
}


/**
 * Перемещаем элементы, чтоб они шли в правильной последовательностии (меняем местами, так чтобы они от меньшегоб к большему шли, по numberElementEqual)
 */
function _moveElements(old_wsdom) {
  let children = old_wsdom.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].numberElementEqual === undefined) {
      continue;
    }
    let i_up = compare(i, children);
    if (i_up !== null) {
      swap(old_wsdom, i, i_up);
      setLabel(children[i], children[i_up]);
      i--; //Снова начинаем поиск
    }
  }

  old_wsdom.logger('Выводим св-ва объектов (стврые) (после перемещения):', 'label_move', 'label_move_analytical');
}


/**
 * Если впереди находит элемент с меньшим numberElementEqual, то возвращает индекс элемента, котрый надо поменять местами
 * @param startPlace
 * @param children
 * @returns
 */
function compare(startPlace, children) {
  let swapPlaces = null;
  for (let nextPlace = startPlace + 1; nextPlace < children.length; nextPlace++) {
    if (children[nextPlace].numberElementEqual === undefined) {
      continue;
    }

    if (children[nextPlace].numberElementEqual > children[startPlace].numberElementEqual) {
      return swapPlaces;
    }
    swapPlaces = nextPlace;
  }
  return null;
}


/**
 * Меняем местами
 */
function swap(old_wsdom, i_first, i_next) {
  old_wsdom.move(i_next, i_first);
  old_wsdom.move(i_first, i_next);
}


function setLabel(wsdom_1, wsdom_2) {
  if (wsdom_1.node_type === 1 && wsdom_2.node_type === 1) {
    wsdom_1.label_move = true;
    wsdom_2.label_move = true;
  }

}