export class BlockUploader {
  numberElementEqual = undefined; //Номер такого же элемента, который является копией
  check_delete = undefined; //Свойство показывает, что элемент идет на удаление
  check_add = undefined; //Свойство показывает, что элемент добавлен
  dom_element = null; //Тут находится DOM элемент, чьей оберткой является объект этого класса
  node_type = null;  //Тип элемента DOM (тут для удобства)
  save_style = null; //Стиль объекта (тут временно хранится, для удобства)
  number_element = null; //Порядковый номер элемента в массиве
  count_undefined_prev = null; //Количество элементов без numberElementEqual после объектом
  count_undefined_next = null; //Количество элементов без numberElementEqual перед объектом
  stepFact = null;
  stepProp = null;
  prev = null; //Предыдущий элемент с numberElementEqual (ссылка на него)
  next = null; //Следующий элемент с numberElementEqual (ссылка на него)

  stepToNumberElementEqual = undefined;
  nextNumberElementEqual = undefined;
  children = []; //Вложенные объекты WSDOM (вложенность совпадает с вложенностью DOM элементов)
  parent = undefined; //Ссылка на родителя
  debug = false; //Свойство, исходя из которого понятно как выводить ошибки


  label_update_tag = undefined; //Блок меток для добавления классов
  label_update_type = undefined; //Блок меток для добавления классов
  label_update_attributes = undefined; //Блок меток для добавления классов
  label_move = undefined; //Блок меток для добавления классов
  label_move_analytical = undefined; //Блок меток для добавления классов
  label_delete = undefined; //Блок меток для добавления классов
  label_add = undefined; //Блок меток для добавления классов
  label_update_content = undefined; //Блок меток для добавления классов

  constructor(dom_element) {
    Object.seal(this);
    this.dom_element = dom_element;
    this.node_type = dom_element.nodeType;
  }


  /**
   * Функция перемещает стиль DOM в свойство объекта save_style, чтоб он не мешал при сравнении элементов
   */
  moveStyleInProperty() {
    if (this.dom_element.hasAttribute('style')) {
      this.save_style = this.dom_element.getAttribute('style');
      this.dom_element.removeAttribute('style');
    }
  }


  /**
   * Перемещение стиля в свойства  DOM объекта
   */
  moveStyleInDOM() {
    if (this.dom_element.hasAttribute('style')) {
      this.save_style = this.dom_element.getAttribute('style');
      this.dom_element.removeAttribute('style');
    }
  }


  /**
   * Создает клон объекта
   * @returns {BlockUploader} - возвращает клон
   */
  clone() {
    let copy = new BlockUploader(this.dom_element);
    for (let attr in this) {
      if (this.hasOwnProperty(attr)) copy[attr] = this[attr];
    }
    return copy;
  }


  /**
   * Перемещает объект WSDOM а так же элемент DOM
   * @param i_old_place {int}
   * @param i_new_place {int}
   */
  move(i_old_place, i_new_place) {
    let children = this.children;
    let dom_el_old = children[i_old_place].dom_element;
    let dom_el_new = children[i_new_place].dom_element;
    dom_el_new.after(dom_el_old);
    children.splice(i_new_place + 1, 0, children[i_old_place]);
    if (i_new_place < i_old_place) {
      i_old_place++;  //Назад
    }
    children.splice(i_old_place, 1);
  }


  /**
   * Добавляет объект WSDOM а так же элемент DOM
   * @param place {int}
   * @param new_child {BlockUploader}
   */
  add(place, new_child) {
    let children = this.children;
    let old_child = children[place];
    let dom_el_old = old_child.dom_element;
    let dom_el_new = new_child.dom_element;
    let clone_el_new = dom_el_new.cloneNode(true);
    dom_el_old.after(clone_el_new);

    let wsdom = new_child.clone();
    wsdom.dom_element = clone_el_new;
    wsdom.number_element = place + 1;
    children.splice(place + 1, 0, wsdom);
  }

  /**
   * Добавляет объект WSDOM а так же элемент DOM
   * @param place {int}
   * @param new_child {BlockUploader}
   */
  addBefore(place, new_child) {
    let children = this.children;
    let old_child = children[place];
    let dom_el_old = old_child.dom_element;
    let dom_el_new = new_child.dom_element;
    let clone_el_new = dom_el_new.cloneNode(true);
    dom_el_old.before(clone_el_new);
    dom_el_old.before(clone_el_new);

    let wsdom = new_child.clone();
    wsdom.dom_element = clone_el_new;
    wsdom.number_element = place;
    children.splice(place, 0, wsdom);
  }

  /**
   * Выводит в консоль состояние WSDOM элементов
   * @param name_log {string} - название отображаемое перед выводом
   * @param show_parametr - свойства которые надо вывести дополнительно
   */
  logger(name_log, ...show_parametr) {
    if (this.debug === true) {
      console.log('\n');
      console.log(name_log);
      let i = 0;
      for (let item of this.children) {
        let show_parametr_text = '';
        for (let parametr of show_parametr) {
          if (item[parametr] !== undefined) {
            show_parametr_text = show_parametr_text + ' ' + parametr + ':' + item[parametr] + ' ';
          }
        }
        let textContent = (item.node_type === 3) ? '' : item.dom_element.textContent;
        console.log(i + ' тип элемента "' + item.dom_element.tagName + '" контент:"' + textContent + '" nee: ' + item.numberElementEqual + show_parametr_text);
        i++;
      }
      console.log('\n');
    }
  }


  /**
   * Выводит в консоль состояние DOM элементов
   * @param name_log {string} - название отображаемое перед выводом
   * @param show_parametr - свойства которые надо вывести дополнительно
   */
  loggerDOM(name_log, ...show_parametr) {
    if (this.debug === true) {
      console.log('\n');
      console.log(name_log);
      let i = 0;
      for (let item of this.dom_element.childNodes) {
        let show_parametr_text = '';
        for (let parametr of show_parametr) {
          if (item[parametr] !== undefined) {
            show_parametr_text = show_parametr_text + ' ' + parametr + ':' + item[parametr] + ' ';
          }
        }
        console.log(i + ' тип элемента "' + item.tagName + '" ' + item.textContent + ' : ' + show_parametr_text);
      }
      console.log('\n');
    }
  }
}