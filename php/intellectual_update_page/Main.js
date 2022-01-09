import {updateBlock} from './updateBlock/updateBlock.js';
import {BlockUploader} from './BlockUploader.js';
import {deleteElement} from './delete_for_label.js';
import {blink} from './blink.js';

let settings = {}
let oldDomNodeList = {}
let newDomNodeList = {}
let oldBlockUploaderList = []
let newBlockUploaderList = []

export function UpdateBlock(_settings) {
  settings = Object.assign({}, settingsDefault, _settings);
  checkRequiredField();
  oldDomNodeList = settings.old_dom_document.querySelectorAll('[' + settings.query_selector + ']');
  newDomNodeList = settings.new_dom_document.querySelectorAll('[' + settings.query_selector + ']');
  checkDomNodeList();
  preparationDomNodeList();
  setBlockUploaderList();
  updateContent();

  // noinspection JSValidateTypes
  settings.event.end_update(); //Calling an external method subscribed to the event

  finishSteps();

}


/**
 * Check required fields
 */
function checkRequiredField() {
  if (!settings.old_dom_document) {
    throw new Error('No old_dom_document!');
  }
  if (!settings.new_dom_document) {
    throw new Error('No new_dom_document!');
  }
}


const settingsDefault = {
  old_dom_document: null, //Обязательное поле старая DOM страница
  new_dom_document: null, //Обязательное поле новая DOM страница
  debug: false, //Показывать - скрывать логи
  time_close_blink: 500, //Время подсветки измененых областей
  query_selector: 'data-websocket_update', //Селектор для выбора блоков для обновления
  class_color_flag: { //Классы подсветки измененых облас тей (действие/название класса)
    update_content: 'uploader-update', //Обновление контента внутри элемента
    move: 'uploader-move', //Перемещение (смена элементов местами, чтобь шли по порядку)
    move_analytical: 'uploader-move-analytical', //Умное перемещение
    update_attributes: 'uploader-update-attribute', //Обновление атрибутов
    add: 'uploader-add', //Добавление нового элемента
    delete: 'uploader-delete', //Удаление элемента
    update_tag: 'uploader-update-tag', //Обновление тега элемента
    update_type: 'uploader-update-type', //Обновление тега элемента
  },
  event: { //События, на которые можно привязать фу-ии
    end_update: function () { //Происходит, когда блоки перересованны
    },
  }
};


function checkDomNodeList() {

  if (oldDomNodeList.length !== newDomNodeList.length) {
    throw new Error("Updater: count BlockUpdater differently!");
  }
  for (let i = 0; i < oldDomNodeList.length; ++i) {
    let attribute = oldDomNodeList[i].getAttribute(settings.query_selector);
    if (!isBlockUpdaterEqual(attribute)) {
      throw new Error("Updater: blocks updater arent equal (no block " + oldDomNodeList[i].getAttribute(settings.query_selector) + ") !");
    }
  }

  if (isBlockUpdaterSameName(oldDomNodeList)) {
    throw new Error("Updater: old blocks attribute have the same name!");
  }
  if (isBlockUpdaterSameName(newDomNodeList)) {
    throw new Error("Updater: new blocks attribute have the same name!");
  }

  for (let i = 0; i < oldDomNodeList.length; ++i) {
    let attribute = oldDomNodeList[i].getAttribute(settings.query_selector);
    if (!isBlockUpdaterEqual(attribute)) {
      throw new Error("Updater: blocks new and old updater arent equal for name (no block " + oldDomNodeList[i].getAttribute(settings.query_selector) + ") !");
    }
  }

}


function isBlockUpdaterEqual(checkAttribute) {
  for (let i = 0; i < newDomNodeList.length; ++i) {
    if (checkAttribute === newDomNodeList[i].getAttribute(settings.query_selector)) {
      return true;
    }
  }
  return false;
}

function isBlockUpdaterSameName(NodeList) {
  let attributes = [];
  for (let i = 0; i < NodeList.length; ++i) {
    attributes.push(NodeList[i].getAttribute(settings.query_selector));
  }
  if ([...new Set(attributes)].length !== attributes.length) {
    return true;
  }
  return false;
}


function preparationDomNodeList() {
  for (let i = 0; i < oldDomNodeList.length; i++) {
    preparationBlockUpdater(oldDomNodeList[i]);
    preparationBlockUpdater(newDomNodeList[i]);
  }
}


function setBlockUploaderList() {
  oldBlockUploaderList = [];
  newBlockUploaderList = [];
  for (let i = 0; i < oldDomNodeList.length; i++) {
    const oldBlock = oldDomNodeList[i];
    const newBlock = getNewBlockForName(oldBlock.getAttribute(settings.query_selector));

    let oldBlockUploader = createUploaderBlock(oldBlock); //Creates an array of wrapper objects for the DOM object
    let newBlockUploader = createUploaderBlock(newBlock);
    oldBlockUploaderList.push(oldBlockUploader);
    newBlockUploaderList.push(newBlockUploader);
  }
}

function getNewBlockForName(name) {
  for (let i = 0; i < newDomNodeList.length; i++) {
    if (newDomNodeList[i].getAttribute(settings.query_selector) === name) {
      return newDomNodeList[i];
    }
  }
  throw new Error("Updater: getNewBlockForName nave error!");
}


function updateContent() {
  for (let i = 0; i < oldBlockUploaderList.length; i++) {
    moveStyles(oldBlockUploaderList[i], newBlockUploaderList[i]);
    updateOldBlock(oldBlockUploaderList[i], newBlockUploaderList[i]);
    undoMoveStyle(oldBlockUploaderList[i]);
  }
}

function updateOldBlock(oldBlockUploader, newBlockUploader) {
  updateBlock(oldBlockUploader, newBlockUploader);
}


function finishSteps() {
  for (let i = 0; i < oldBlockUploaderList.length; i++) {
    blink(oldBlockUploaderList[i], settings); //Функция проверяет свойства объектов, и там где надо вставляяет классы для подсветки измененых/перемещеных/удаленых/добавленых областей, а потом убирает //modul blink.js
    deleteElement(oldBlockUploaderList[i], settings); //Удаляем элементы отмеченные для удаления //modul delete_for_label.js
  }
}


/**
 * Creates an array of wrapper objects for the DOM object
 */
function createUploaderBlock(domElement) {
  let object = new BlockUploader(domElement);

  object.debug = settings.debug;

  if (domElement.nodeType === 1) {
    // noinspection JSValidateTypes (нужно чтоб phpstorm не ругался)
    for (let i = 0; i < domElement.childNodes.length; i++) {
      object.children.push(createUploaderBlock(domElement.childNodes[i]));
    }
  }
  return object;
}


/**
 * Moves styles to the properties of objects so that they do not interfere with the comparison of elements
 */
function moveStyles(oldBlockUploader, newBlockUploader) {
  moveStyle(oldBlockUploader);
  moveStyle(newBlockUploader);
}


function moveStyle(BlockUploader) {
  if (BlockUploader.node_type === 1) {
    BlockUploader.moveStyleInProperty(); //Style moves in property objects
    for (let i = 0; i < BlockUploader.children.length; i++) {
      moveStyle(BlockUploader.children[i]);
    }
  }
}


/**
 * The function moves styles to the properties of the object so that they do not interfere with the comparison of elements
 */
function undoMoveStyle(oldBlockUploader) {
  if (oldBlockUploader.node_type === 1) {
    oldBlockUploader.moveStyleInDOM();
    for (let i = 0; i < oldBlockUploader.children.length; i++) {
      undoMoveStyle(oldBlockUploader.children[i]);
    }
  }
}


/**
 * The function prepares our pages by removing old artifacts, empty classes, gaps between them, etc. from them.
 */
function preparationBlockUpdater(domElement) {
  if (domElement.nodeType === 1) {

    deleteClassDoubleSpace(domElement);
    deleteFirstAndLastSpace(domElement);
    deleteEmptyClass(domElement); //Removes empty classes: class=""

    for (let i = 0; i < domElement.childNodes.length; i++) {
      preparationBlockUpdater(domElement.childNodes[i]);
    }
  }
}

function deleteClassDoubleSpace(domElement) {
  if (domElement.hasAttribute('class')) {
    let classVal = domElement.getAttribute('class');
    classVal = classVal.replace(/ {1,}/g, " ");
    domElement.setAttribute('class', classVal);
  }
}

function deleteFirstAndLastSpace(domElement) {
  if (domElement.hasAttribute('class')) {
    let className = domElement.getAttribute('class');
    className = className.trim();
    domElement.setAttribute('class', className);
  }
}

function deleteEmptyClass(domElement) {
  if (domElement.classList.length === 0) {
    domElement.removeAttribute('class');
  }
}

