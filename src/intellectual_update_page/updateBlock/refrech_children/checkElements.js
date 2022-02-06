export function checkElements(BlockUploaderOld, BlockUploaderNew) {
  debug = BlockUploaderOld.debug;
  return _checkElements(BlockUploaderOld, BlockUploaderNew);
}

let debug = null;


function _checkElements(BlockUploaderOld, BlockUploaderNew) {
  let old_children = BlockUploaderOld.children;
  let new_children = BlockUploaderNew.children;
  let count_delete = 0;
  for (let i = 0; i < old_children.length; i++) {
    if (old_children[i].isDelete === true) {
      count_delete++; //Counting the number of items to delete
      continue;
    }
    if (old_children[i].numberElementEqual) {
      let new_child = new_children[old_children[i].numberElementEqual].domElement;
      if (!new_child) {
        showError('No compliance!');
      }
      if (!old_children[i].domElement.isEqualNode(new_child)) {
        showError('No equal!');
      }
    }

    if (old_children[i].numberElementEqual === undefined && new_children[i - count_delete].numberElementEqual !== undefined) {
      showError('No equal numberElementEqual!');
    }
  }

  if (old_children.length - count_delete !== new_children.length) {
    showError('Different number of items!!');
  }
}


/**
 * Either we cause an error, or we write to the browser console about the problem
 */
function showError(text) {
  if (debug) {
    console.log(text);
    throw new Error(text);
  } else {
    console.log(text);
  }
}