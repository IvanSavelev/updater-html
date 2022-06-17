export class BlockUploader {
  numberElementEqual = undefined; //The number of the same element that is a copy
  isDelete = undefined; //The property indicates that the item is going to be deleted
  isAdd = undefined; //The property shows that the element has been added
  domElement = null; //There is a DOM element whose wrapper is an object of this class
  saveStyle = null; //The style of the object (temporarily stored here, for convenience)
  countUndefinedPrev = null; //The count of elements without numberElementEqual prev the object
  countUndefinedNext = null; //The count of elements without numberElementEqual next the object
  
  //For moveElementsAnalytical
  stepPrevMax = null;
  stepNextMax = null;

  //For add
  stepToNumberElementEqual = undefined;
  nextNumberElementEqual = undefined;
  stepToNumberElementEqualReverse = undefined;
  
  children = []; //The children BlockUploader objects (nesting coincides with the nesting of DOM elements)
  debug = false; //A property based on which it is clear how to output errors
  
  //A block of labels for adding classes
  label =
    {
      update_tag: undefined, 
      update_type: undefined, 
      update_attributes: undefined,
      move: undefined,
      move_analytical: undefined,
      delete: undefined,
      add: undefined,
      update_content: undefined
    }

  constructor(domElement) {
    Object.seal(this);
    this.domElement = domElement;
  }
  
  turnOnLabel(nameLabel)
  {
    this.label[nameLabel] = true;
  }
  
  getTurnOnLabelList() {
    let labelList = [];
    for (let key in this.label) {
      if(this.label[key] !== undefined) {
        labelList.push(key);
      }
    }
    return labelList;
  }


  /**
   * The function moves the DOM style to the saveStyle object property 
   * so that it does not interfere when comparing elements
   */
  moveStyleInProperty() {
    if (this.domElement.hasAttribute('style')) {
      this.saveStyle = this.domElement.getAttribute('style');
      this.domElement.removeAttribute('style');
    }
  }

  
  /**
   * Moving a style to the properties of a DOM object
   */
  moveStyleInDOM() {
    if (this.saveStyle) {
      this.domElement.setAttribute('style', this.saveStyle);
    }
  }


  /**
   * Creates a clone of an object
   * @returns {BlockUploader} - returns a clone
   */
  clone() {
    let copy = new BlockUploader(this.domElement);
    for (let attr in this) {
      if (this.hasOwnProperty(attr)) copy[attr] = this[attr];
    }
    return copy;
  }


  /**
   * Moves the BlockUploader object as well as the DOM element
   * @param plaseOld {int}
   * @param placeNew {int}
   */
  move(plaseOld, placeNew) {
    let children = this.children;
    let domOld = children[plaseOld].domElement;
    let domNew = children[placeNew].domElement;
    domNew.after(domOld);
    children.splice(placeNew + 1, 0, children[plaseOld]);
    if (placeNew < plaseOld) {
      plaseOld++;  //Prev
    }
    children.splice(plaseOld, 1);
  }


  /**
   * Adds a BlockUploader object as well as a DOM element
   * @param place {int}
   * @param blockUploaderNew {BlockUploader}
   * @param type - type operation
   */
  add(place, blockUploaderNew, type = 'after') {
    let children = this.children;
    let blockOld = children[place];
    let domOld = blockOld.domElement;
    let domNew = blockUploaderNew.domElement;
    let cloneDomNew = domNew.cloneNode(true);
    if(type === 'before') {
      domOld.before(cloneDomNew);
    } 
    if (type === 'after') {
      domOld.after(cloneDomNew);
    }
    
    let blockUploaderCloneNew = blockUploaderNew.clone();
    blockUploaderCloneNew.domElement = cloneDomNew;
    if (type === 'after') {
      place++;
    }
    children.splice(place, 0, blockUploaderCloneNew);
  }

  
  /**
   * Adds a BlockUploader object as well as a DOM element before
   * @param place {int}
   * @param blockUploaderNew {BlockUploader}
   */
  addBefore(place, blockUploaderNew) {
    this.add(place, blockUploaderNew, 'before')
  }


  /**
   * Adds a BlockUploader object as well as a DOM element after
   * @param place {int}
   * @param blockUploaderNew {BlockUploader}
   */
  addAfter(place, blockUploaderNew) {
    this.add(place, blockUploaderNew, 'after')
  }

  
  /**
   * Outputs the status of BlockUploader elements to the console
   * @param nameLog {string} - name log`s
   * @param showParametr - adding property
   */
  logger(nameLog, ...showParametr) {
    if (this.debug === true) {
      console.log('\n');
      console.log(nameLog);
      let i = 0;
      for (let item of this.children) {
        let showParametrText = '';
        for (let parametr of showParametr) {
          if (item[parametr] !== undefined) {
            showParametrText = showParametrText + ' ' + parametr + ':' + item[parametr] + ' ';
          }
        }
        let textContent = (item.domElement.nodeType === 3) ? '' : item.domElement.textContent;
        console.log(i + ' type "' + item.domElement.tagName + '" content:"' + textContent + '" nee: ' + item.numberElementEqual + showParametrText);
        i++;
      }
      console.log('\n');
    }
  }


  /**
   * Outputs the state of DOM elements to the console
   * @param nameLog {string} - name log`s
   * @param showParametr - adding property
   */
  loggerDOM(nameLog, ...showParametr) {
    if (this.debug === true) {
      console.log('\n');
      console.log(nameLog);
      let i = 0;
      for (let item of this.domElement.childNodes) {
        let showParametrText = '';
        for (let parametr of showParametr) {
          if (item[parametr] !== undefined) {
            showParametrText = showParametrText + ' ' + parametr + ':' + item[parametr] + ' ';
          }
        }
        console.log(i + ' type "' + item.tagName + '" ' + item.textContent + ' : ' + showParametrText);
      }
      console.log('\n');
    }
  }
}