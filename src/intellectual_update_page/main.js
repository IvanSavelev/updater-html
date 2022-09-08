import {updateBlock} from './updateBlock/updateBlock.js';
import {BlockUploader} from './BlockUploader.js';
import {addClass} from './addClass.js';
import {deleteDOMmarked} from "./deleteDOMmarked.js";
import {deleteClass} from "./deleteClass.js";

let settings = {}
let oldDomNodeList = {}
let newDomNodeList = {}
let BlockUploaderOldList = []
let BlockUploaderNewList = []

export default function UpdateBlock(_settings) {
  settings = Object.assign({}, settingsDefault, _settings);
  checkRequiredField();
  oldDomNodeList = settings.oldDomDocument.querySelectorAll('[' + settings.querySelector + ']');
  newDomNodeList = settings.newDomDocument.querySelectorAll('[' + settings.querySelector + ']');
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
  if (!settings.oldDomDocument) {
    throw new Error('No old_dom_document!');
  }
  if (!settings.newDomDocument) {
    throw new Error('No newDomDocument!');
  }
}


const settingsDefault = {
  oldDomDocument: null, //Required field old DOM page
  newDomDocument: null, //Required field new DOM page
  debug: false, //Show-hide logs
  timeCloseBlink: 500, //Time blink
  changeStyle: true, //Change stiles 
  onlyUpdate: false, 
  onlyAddAndDelete: false,
  considerSpaces: false,
  moduleStatus: {
    move: 'working', //Moving (swapping elements so that they go in order)  working/not working
    move_analytical: 'working', //Analytical move  working/not working
    update_attributes: 'working', //Update attributes witout style
    update_tag: 'working', //Updating type element (p to div or div to h1 etc)  working/not working
  },
  querySelector: 'data-updater_update', //Selector for selecting blocks to update
  querySelectorHookBlink: 'data-updater_hook_blink', //Selector for selecting blocks to update 
  querySelectorHookAddAndDelete: 'data-updater_hook_add_and_delete', //Selector for add and delete, needs for knowing where add and delete elements 
  classColorFlag: { //Classes for highlighting modified areas (action/class name)
    update_content: 'uploader-update', //Updating content
    move: 'uploader-move', //Moving (swapping elements so that they go in order)
    move_analytical: 'uploader-move-analytical', //Analytical move
    update_attributes: 'uploader-update-attribute', //Smart moving
    add: 'uploader-add', //Adding a new element
    delete: 'uploader-delete', //Delete a element
    update_tag: 'uploader-update-tag' //Updating the element tag (class, data, name etc, except for teg style)
  },
  event: { //Events to which functions can be linked
    end_update: function () { //Occurs when blocks are redrawn
    },
  }
};


function checkDomNodeList() {

  if (oldDomNodeList.length !== newDomNodeList.length) {
    throw new Error("Updater: count BlockUpdater differently!");
  }
  for (let i = 0; i < oldDomNodeList.length; ++i) {
    let attribute = oldDomNodeList[i].getAttribute(settings.querySelector);
    if (!isBlockUpdaterEqual(attribute)) {
      throw new Error(
        "Updater: blocks updater arent equal (no block " + 
        oldDomNodeList[i].getAttribute(settings.querySelector) + 
        ") !"
      );
    }
  }

  if (isBlockUpdaterSameName(oldDomNodeList)) {
    throw new Error("Updater: old blocks attribute have the same name!");
  }
  if (isBlockUpdaterSameName(newDomNodeList)) {
    throw new Error("Updater: new blocks attribute have the same name!");
  }

  for (let i = 0; i < oldDomNodeList.length; ++i) {
    let attribute = oldDomNodeList[i].getAttribute(settings.querySelector);
    if (!isBlockUpdaterEqual(attribute)) {
      throw new Error(
        "Updater: blocks new and old updater arent equal for name (no block " + 
        oldDomNodeList[i].getAttribute(settings.querySelector) + 
        ") !"
      );
    }
  }

}


function isBlockUpdaterEqual(checkAttribute) {
  for (let i = 0; i < newDomNodeList.length; ++i) {
    if (checkAttribute === newDomNodeList[i].getAttribute(settings.querySelector)) {
      return true;
    }
  }
  return false;
}

function isBlockUpdaterSameName(NodeList) {
  let attributes = [];
  for (let i = 0; i < NodeList.length; ++i) {
    attributes.push(NodeList[i].getAttribute(settings.querySelector));
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
  BlockUploaderOldList = [];
  BlockUploaderNewList = [];
  for (let i = 0; i < oldDomNodeList.length; i++) {
    const oldBlock = oldDomNodeList[i];
    const newBlock = getNewBlockForName(oldBlock.getAttribute(settings.querySelector));

    let BlockUploaderOld = createUploaderBlock(oldBlock); //Creates an array of wrapper objects for the DOM object
    let BlockUploaderNew = createUploaderBlock(newBlock);
    BlockUploaderOldList.push(BlockUploaderOld);
    BlockUploaderNewList.push(BlockUploaderNew);
  }
}

function getNewBlockForName(name) {
  for (let i = 0; i < newDomNodeList.length; i++) {
    if (newDomNodeList[i].getAttribute(settings.querySelector) === name) {
      return newDomNodeList[i];
    }
  }
  throw new Error("Updater: getNewBlockForName nave error!");
}


function updateContent() {
  for (let i = 0; i < BlockUploaderOldList.length; i++) {
    if(!settings.changeStyle) {
      moveStyles(BlockUploaderOldList[i], BlockUploaderNewList[i]);
    }
    
    updateOldBlock(BlockUploaderOldList[i], BlockUploaderNewList[i]);
    
    if(!settings.changeStyle) {
      undoMoveStyle(BlockUploaderOldList[i]);
    }
  }
}

function updateOldBlock(BlockUploaderOld, BlockUploaderNew) {
  updateBlock(BlockUploaderOld, BlockUploaderNew);
}


function finishSteps() {
  for (let i = 0; i < BlockUploaderOldList.length; i++) {
    addClass(BlockUploaderOldList[i], settings); // The function checks the properties of objects, and inserts classes 
    deleteClass(BlockUploaderOldList[i], settings); // Delete class - blink
    // where necessary to highlight the changed/moved/deleted/added areas, and then removes
    deleteDOMmarked(BlockUploaderOldList[i], settings); //Deleting the items labeled for deletion
  }
}


/**
 * Creates an array of wrapper objects for the DOM object
 */
function createUploaderBlock(domElement, selectorHookBlink = null, parentBlock = null) {
  let object = new BlockUploader(domElement);
  if(domElement.nodeType === 1 && domElement.hasAttribute(settings.querySelectorHookBlink)) {
    selectorHookBlink = object; //
  }
  if(domElement.nodeType === 1 && domElement.hasAttribute(settings.querySelectorHookAddAndDelete)) {
    object.isSelectorHookAddAndDelete = true; 
  }
  object.selectorHookBlink = selectorHookBlink;
  object.parentBlock = parentBlock;
  object.debug = settings.debug; //TODO Move to settings
  object.settingsGeneral = settings;

  if (domElement.nodeType === 1) {
    // noinspection JSValidateTypes
    for (let i = 0; i < domElement.childNodes.length; i++) {
      object.children.push(createUploaderBlock(domElement.childNodes[i], selectorHookBlink, object));
    }
  }
  return object;
}


/**
 * Moves styles to the properties of objects so that they do not interfere with the comparison of elements
 */
function moveStyles(BlockUploaderOld, BlockUploaderNew) {
  moveStyle(BlockUploaderOld);
  moveStyle(BlockUploaderNew);
}


function moveStyle(BlockUploader) {
  if (BlockUploader.domElement.nodeType === 1) {
    BlockUploader.moveStyleInProperty(); //Style moves in property objects
    for (let i = 0; i < BlockUploader.children.length; i++) {
      moveStyle(BlockUploader.children[i]);
    }
  }
}


/**
 * The function moves styles to the properties of the object so that they do not interfere with the comparison of elements
 */
function undoMoveStyle(BlockUploaderOld) {
  if (BlockUploaderOld.domElement.nodeType === 1) {
    BlockUploaderOld.moveStyleInDOM();
    for (let i = 0; i < BlockUploaderOld.children.length; i++) {
      undoMoveStyle(BlockUploaderOld.children[i]);
    }
  }
}


/**
 * The function prepares our pages by removing old artifacts, empty classes, gaps between them, etc. from them.
 */
function preparationBlockUpdater(domElement) {
  if (domElement.nodeType === 1) {

    deleteClassDoubleSpace(domElement);
    deleteClassFirstAndLastSpace(domElement);
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

function deleteClassFirstAndLastSpace(domElement) {
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


