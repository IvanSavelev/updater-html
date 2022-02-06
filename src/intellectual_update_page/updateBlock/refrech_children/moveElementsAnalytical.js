import {addInfoWSDOM} from "./helpers/addInfoWSDOM.js";


export function moveElementsAnalytical(_BlockUploaderOld, _BlockUploaderNew) {
  BlockUploaderOld = _BlockUploaderOld;
  BlockUploaderNew = _BlockUploaderNew;
  return _moveElementsAnalytical(BlockUploaderOld, BlockUploaderNew);
}

let BlockUploaderOld
let BlockUploaderNew


/**
 * Does a move so as not to delete elements, namely move 
 * (example: <p>1</p><p>2</p> => <p>update</p><p>1</p> - there should be one move and an update)
 */
function _moveElementsAnalytical() {
  addInfoWSDOM(BlockUploaderOld, BlockUploaderNew);
  addStepMax();
  move();
  BlockUploaderOld.logger('The properties of objects (old)(after the analytical move):');
}

function addStepMax() {
  for (let i = 0; i < BlockUploaderOld.children.length; i++) {
    let item = BlockUploaderOld.children[i];
    if(item.numberElementEqual !== undefined) {
      let itemNew =  BlockUploaderNew.children[item.numberElementEqual];
      item.stepNextMax = itemNew.countUndefinedPrev  - item.countUndefinedPrev;
      item.stepPrevMax = itemNew.countUndefinedNext  - item.countUndefinedNext;
    }
  }
}

function move()
{
  moveNext();
  movePrev();
}


function moveNext() {
  for (let i = 0; i < BlockUploaderOld.children.length; i++) {
    let item = BlockUploaderOld.children[i];
    if(item.numberElementEqual !== undefined && item.numberElementEqual > i) {
      if(
        i + 1 < BlockUploaderOld.children.length &&
        BlockUploaderOld.children[i + 1].numberElementEqual === undefined &&
        item.stepNextMax > 0 &&
        item.stepPrevMax < 0
      ) {
        BlockUploaderOld.move(i, i +1);
        item.turnOnLabel('move_analytical')  //Add a label
        item.stepNextMax--;
        item.stepPrevMax++;
        i=0;
      }
    }
  }
}

function movePrev()
{
  for (let i = 0; i < BlockUploaderOld.children.length; i++) {
    let item = BlockUploaderOld.children[i];
    if(item.numberElementEqual !== undefined  && item.numberElementEqual < i) {
      if(
        i -2 >= 0 &&
        BlockUploaderOld.children[i - 1].numberElementEqual === undefined &&
        item.stepPrevMax > 0 &&
        item.stepNextMax < 0
      ) {
        BlockUploaderOld.move(i, i -2);
        item.turnOnLabel('move_analytical')  //Add a label

        item.stepPrevMax--;
        item.stepNextMax++;
        i = 0;
      }
    }
  }
}

