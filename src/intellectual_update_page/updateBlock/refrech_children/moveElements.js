export function moveElements(_BlockUploaderOld) {
  BlockUploaderOld = _BlockUploaderOld;
  return _moveElements(BlockUploaderOld);
}

let BlockUploaderOld


/**
 * Moving the elements so that they go in the correct sequence (swapping them so that they go from smaller to larger, according to numberElementEqual)
 */
function _moveElements() {
  let children = BlockUploaderOld.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].numberElementEqual === undefined) {
      continue;
    }
    let i_up = compare(i, children);
    if (i_up !== null) {
      swap(BlockUploaderOld, i, i_up);
      setLabel(children[i]);
      setLabel(children[i_up]);
      i--; //Starting the search again
    }
  }

  BlockUploaderOld.logger('We output a list of objects (old) (after moving):', );
}


/**
 * If an element with a smaller numberElementEqual is found in front, it returns
 * the index of the element that needs to be swapped
 * @param startPlace
 * @param children
 * @returns
 */
function compare(startPlace, children) {
  let swapPlaces = null;
  for (let nextPlace = startPlace + 1; nextPlace < children.length; nextPlace++) {
    if (children[nextPlace].numberElementEqual === undefined) {
      continue;
    }

    if (children[nextPlace].numberElementEqual < children[startPlace].numberElementEqual) {
      return nextPlace;
    }
    swapPlaces = nextPlace;
  }
  return null;
}


/**
 * Changes places
 */
function swap(BlockUploaderOld, first, next) {
  BlockUploaderOld.move(next, first);
  BlockUploaderOld.move(first, next);
}


function setLabel(wsdom_1) {
  if (wsdom_1.domElement.nodeType === 1) {
    wsdom_1.turnOnLabel('move')  //Add a label
  }

}