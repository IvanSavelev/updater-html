export function addClass(BlockUploader, settings) {
  return _addClass(BlockUploader, settings);
}


/**
 * Show, and remove the winks
 * @param BlockUploader
 * @param settings
 * @private
 */
function _addClass(BlockUploader, settings) {
  showBlink(BlockUploader, settings);
  closeBlink(BlockUploader, settings);
}


/**
 * Функция проверяет свойства объектов, и там где надо вставляяет классы для подсветки
 * @param BlockUploader {BlockUploader}
 * @param settings - настройки модуля
 */
function showBlink(BlockUploader, settings) {
  showBlinkSingle(BlockUploader, settings);
    for (let i = 0; i < BlockUploader.children.length; i++) {
      showBlink(BlockUploader.children[i], settings);
    }


  /**
   * Сравниваем, если у объекта есть свойство с данной меткой
   * @param BlockUploader
   * @param settings - настройки модуля
   */
  function showBlinkSingle(BlockUploader, settings) {
    const labelList = BlockUploader.getTurnOnLabelList();
    labelList.forEach((item) => {
      addClass(BlockUploader.domElement, settings.classColorFlag[item], 'all'); //Подсвечиваем изменения
    });
  }

  /**
   * Помечаем классом все элементы, в том числе и вложенные
   * old_domElement {BlockUploader} - элемент к которому применяется класс
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
 * @param BlockUploader {BlockUploader}
 * @param settings - настройки модуля
 */
function closeBlink(BlockUploader, settings) {
  closeBlinkItem(BlockUploader);
  for (let item of BlockUploader.children) {
    // noinspection JSUnfilteredForInLoop (нужно чтоб phpstorm не ругался)
    closeBlink(item, settings);
  }

  /**
   * Сравниваем, если у объекта есть свойство с данной меткой, то удаляем у него класс
   * @param item {BlockUploader}
   */
  function closeBlinkItem(item) {
    const labelList = item.getTurnOnLabelList();
    labelList.forEach((label) => {
      closeClassBlink(item, settings.classColorFlag[label], settings.timeCloseBlink); 
    });
  }

  /**
   * Удаляем у объекта item класс name_class через время timeCloseBlink
   * @param item {BlockUploader}
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

