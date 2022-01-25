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
    const labelList = wsdom.getTurnOnLabelList();
    labelList.forEach((item) => {
      addClass(wsdom.domElement, settings.classColorFlag[item], 'all'); //Подсвечиваем изменения
    });
  }

  /**
   * Помечаем классом все элементы, в том числе и вложенные
   * old_domElement {WSDOM} - элемент к которому применяется класс
   * class_name string - имя класса
   * type - all - применяется класс к элементу, и всем вложенным в него элементам
   */
  function addClass(old_domElement, class_name, type) {
    if (old_domElement.nodeType === 1) {
      old_domElement.classList.add(class_name);
      /*if(type === 'all') { //TODO Может нужно в таблицах
        let old_domElement_children = old_domElement.children;
        for (let i = 0, child; child = old_domElement_children[i]; i++) {
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
    const labelList = item.getTurnOnLabelList();
    labelList.forEach((label) => {
      closeClassBlink(item, settings.classColorFlag[label], settings.timeCloseBlink); 
    });
  }

  /**
   * Удаляем у объекта item класс name_class через время timeCloseBlink
   * @param item {WSDOM}
   * @param name_class string
   * @param timeCloseBlink int
   */
  function closeClassBlink(item, name_class, timeCloseBlink) {
    setTimeout(function () { //Удаляем классы подсветки измененых областей
      let domElement = item.domElement;
      if (domElement.classList) {
        domElement.classList.remove(name_class);
      }
    }, timeCloseBlink);
  }
}

