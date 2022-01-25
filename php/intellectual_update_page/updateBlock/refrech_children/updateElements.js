import {updateBlock} from "../updateBlock.js";
import {BlockUploader} from "../../BlockUploader.js";



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
    if (old_children[i].isDelete === true) {
      count_delete++; //Считаем количество элементов на удаление
      continue;
    }
    if (old_children[i].numberElementEqual === undefined) {
      //Пропускаем те элементы, корорые только что добавили
      if (old_children[i].isAdd) {
        continue;
      }

      updateElement(old_children[i], new_children[i - count_delete], old_wsdom, i);
    }
  }
  old_wsdom.logger('Выводим св-ва объектов (старые):', '');

}


/**
 * Изменяем элемент
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 * @param parent_wsdom {WSDOM} - ссылка на родителя
 */
function updateElement(old_wsdom, new_wsdom, parent_wsdom, i) {
  if (old_wsdom.domElement.nodeType === 1 && new_wsdom.domElement.nodeType === 1 && old_wsdom.children.length &&  new_wsdom.children.length) {
    updateBlock(old_wsdom, new_wsdom); //РЕКРУСИВНО ПРОВЕРЯЕМ
  } else {
    updateBlockEnding(old_wsdom, new_wsdom, parent_wsdom, i);
  }
}


/**
 * Конечная точка рекруссии, меняем контент
 * @param old_wsdom {WSDOM}
 * @param new_wsdom {WSDOM}
 * @returns {boolean} - возвращает да, если была смена контента
 */
function updateBlockEnding(old_wsdom, new_wsdom, parent_wsdom, i) {
  
  
  let update_check = false;
  let old_node_value = old_wsdom.domElement.nodeValue ?? old_wsdom.domElement.outerHTML;
  let new_node_value = new_wsdom.domElement.nodeValue ?? new_wsdom.domElement.outerHTML;
  let old_value = (old_node_value ? old_node_value : '').trim();
  let new_value = (new_node_value ? new_node_value : '').trim();
  if (old_value !== new_value) {
    let cloneChildNew = new_wsdom.domElement.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
    old_wsdom.domElement.replaceWith(cloneChildNew);
    let db = new BlockUploader(cloneChildNew);
    db.turnOnLabel('update_content');
    parent_wsdom.children.splice(i ,1, db);
    if(db.domElement.nodeType === 3 && parent_wsdom.children.length === 1) {
      parent_wsdom.turnOnLabel('update_content');
    }
    
    update_check = true;
  }
  return update_check;
}


