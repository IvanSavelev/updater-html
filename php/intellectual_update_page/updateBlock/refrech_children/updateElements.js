import {updateBlock} from "../updateBlock.js";

export function updateElements(old_wsdom, new_wsdom) {
  return _updateElements(old_wsdom, new_wsdom);
}


/**
 * Изменяем элементы
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 */
function _updateElements(old_wsdom, new_wsdom) {
  let old_children = old_wsdom.children;
  let new_children = new_wsdom.children;
  let count_delete = 0;
  for (let i = 0; i < old_children.length; i++) {
    if (old_children[i].check_delete === true) {
      count_delete++; //Считаем количество элементов на удаление
      continue;
    }
    if (old_children[i].numberElementEqual === undefined) {
      //Пропускаем те элементы, корорые только что добавили
      if (old_children[i].check_add) {
        continue;
      }
      updateElement(old_children[i], new_children[i - count_delete], old_wsdom);
    }
  }
}


/**
 * Изменяем элемент
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 * @param parent_wsdom {WSDOM} - ссылка на родителя
 */
function updateElement(old_wsdom, new_wsdom, parent_wsdom) {
  if (old_wsdom.node_type === 1 && new_wsdom.node_type === 1 || old_wsdom.node_type !== new_wsdom.node_type) {
    old_wsdom.parent = parent_wsdom; //Добавляем parent
    updateBlock(old_wsdom, new_wsdom); //РЕКРУСИВНО ПРОВЕРЯЕМ
  } else {
    let update_check = updateBlockEnding(old_wsdom, new_wsdom);
    if (update_check) {
      addLabel(parent_wsdom);
    }
  }
}


/**
 * Конечная точка рекруссии, меняем контент
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 * @returns {boolean} - возвращает да, если была смена контента
 */
function updateBlockEnding(old_wsdom, new_wsdom) {
  let update_check = false;
  let old_node_value = old_wsdom.dom_element.nodeValue;
  let new_node_value = new_wsdom.dom_element.nodeValue;
  let old_value = (old_node_value ? old_node_value : '').trim();
  let new_value = (new_node_value ? new_node_value : '').trim();
  if (old_value !== new_value) {
    old_wsdom.dom_element.nodeValue = new_node_value;
    update_check = true;
  }
  return update_check;
}


/**
 * Добавляем метку для родителя элемента (для родителя, а не элемента, потому что сюда попадет только элемент nodeType!=1, и к нему нельзя добавить класс)
 * @param parent_wsdom {WSDOM}
 */
function addLabel(parent_wsdom) {
  parent_wsdom.label_update_content = true;
}