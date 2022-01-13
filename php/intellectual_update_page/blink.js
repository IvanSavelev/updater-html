export function blink(wsdom, settings) {
  return _blink(wsdom, settings);
}


/**
 * Показываем, и убираем подмигивания
 * @param wsdom
 * @param settings
 * @private
 */
function _blink(wsdom, settings) {
  showBlink(wsdom, settings);
  closeBlink(wsdom, settings);
}


/**
 * Функция проверяет свойства объектов, и там где надо вставляяет классы для подсветки
 * @param wsdom {WSDOM}
 * @param settings - настройки модуля
 */
function showBlink(wsdom, settings) {
  showBlinkSingle(wsdom, settings);


    for (let i = 0; i < wsdom.children.length; i++) {
      showBlink(wsdom.children[i], settings);
    }


  /**
   * Сравниваем, если у объекта есть свойство с данной меткой
   * @param settings - настройки модуля
   */
  function showBlinkSingle(wsdom, settings) {
    let object;
    for (let key in settings.classColorFlag) {
      if (wsdom['label_' + key]) {
        object = wsdom.node_type === 1 ? wsdom.dom_element : wsdom.dom_element.parentElement;
        object = wsdom.dom_element;
        // noinspection JSUnfilteredForInLoop (нужно чтоб phpstorm не ругался)
        addClass(object, settings.classColorFlag[key], 'all'); //Подсвечиваем изменения
      }
    }
  }

  /**
   * Помечаем классом все элементы, в том числе и вложенные
   * old_dom_element {WSDOM} - элемент к которому применяется класс
   * class_name string - имя класса
   * type - all - применяется класс к элементу, и всем вложенным в него элементам
   */
  function addClass(old_dom_element, class_name, type) {
    if (old_dom_element.nodeType === 1) {
      old_dom_element.classList.add(class_name);
      /*if(type === 'all') { //TODO Может нужно в таблицах
        let old_dom_element_children = old_dom_element.children;
        for (let i = 0, child; child = old_dom_element_children[i]; i++) {
          blink(child, class_name, type);
        }
      }*/
    }
  }
}


/**
 * Удаляем классы подсветки измененых областей
 * @param wsdom {WSDOM}
 * @param settings - настройки модуля
 */
function closeBlink(wsdom, settings) {
  closeBlinkItem(wsdom);
  for (let item of wsdom.children) {
    // noinspection JSUnfilteredForInLoop (нужно чтоб phpstorm не ругался)
    closeBlink(item, settings);
  }

  /**
   * Сравниваем, если у объекта есть свойство с данной меткой, то удаляем у него класс
   * @param item {WSDOM}
   */
  function closeBlinkItem(item) {
    for (let key in settings.classColorFlag) {
      if (item['label_' + key]) {
        // noinspection JSUnfilteredForInLoop
        closeClassBlink(item, settings.classColorFlag[key], settings.timeCloseBlink);
      }
    }
  }

  /**
   * Удаляем у объекта item класс name_class через время timeCloseBlink
   * @param item {WSDOM}
   * @param name_class string
   * @param timeCloseBlink int
   */
  function closeClassBlink(item, name_class, timeCloseBlink) {
    setTimeout(function () { //Удаляем классы подсветки измененых областей
      let dom_element = item.dom_element;
      if (dom_element.classList) {
        dom_element.classList.remove(name_class);
      }
    }, timeCloseBlink);
  }
}

