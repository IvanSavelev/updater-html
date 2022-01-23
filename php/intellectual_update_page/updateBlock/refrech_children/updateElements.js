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
    if (old_children[i].check_delete === true) {
      count_delete++; //Считаем количество элементов на удаление
      continue;
    }
    if (old_children[i].numberElementEqual === undefined) {
      //Пропускаем те элементы, корорые только что добавили
      if (old_children[i].check_add) {
        continue;
      }
      old_children[i].parent = old_wsdom; //Добавляем parent
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
  if (old_wsdom.node_type === 1 && new_wsdom.node_type === 1 && old_wsdom.children.length &&  new_wsdom.children.length) {
    old_wsdom.parent = parent_wsdom; //Добавляем parent
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
  let old_node_value = old_wsdom.dom_element.nodeValue ?? old_wsdom.dom_element.outerHTML;
  let new_node_value = new_wsdom.dom_element.nodeValue ?? new_wsdom.dom_element.outerHTML;
  let old_value = (old_node_value ? old_node_value : '').trim();
  let new_value = (new_node_value ? new_node_value : '').trim();
  if (old_value !== new_value) {
    let cloneChildNew = new_wsdom.dom_element.cloneNode(true); //So that the new element is not deleted, we need to keep it so as not to break further logic
    old_wsdom.dom_element.replaceWith(cloneChildNew);
    let db = new BlockUploader(cloneChildNew);
    db.label_update_content = true;
    parent_wsdom.children.splice(i ,1, db);
    if(db.node_type === 3 && parent_wsdom.children.length === 1) {
      parent_wsdom.label_update_content = true;
    }
  
    /*let db = new BlockUploader(old_wsdom.dom_element);
    old_wsdom.dom_element.nodeValue = new_node_value;
    old_wsdom.node_type = cloneChildNew.nodeType;
    parent_wsdom.children.splice(i,1, db)
    

    
    if(cloneChildNew.node_type === 1) {
      addLabel(db);
     // addLabel(db.parent);
    } else {
      addLabel(db);
      //addLabel(db.parent);
    }*/
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