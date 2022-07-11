import UpdateBlock from "./intellectual_update_page/main.js";

export function updateContentWebSocket() {
  fetch(document.URL)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      let docNew = new DOMParser().parseFromString(data, "text/html");
      console.log(new Date());
      let start = new Date().getTime(); //Нужно для подсчета времени выполнения скрипта
      UpdateBlock({
        newDomDocument:docNew,
        timeCloseBlink:500,
        oldDomDocument:document,
        debug: true,
        onlyAddAndDelete:true,
        moduleStatus: {
          move: 'working', //Moving (swapping elements so that they go in order)  working/not working
          move_analytical: 'working', //Analytical move  working/not working
          update_attributes: 'working', //Update attributes without style
          update_tag: 'working', //Updating the element tag (class, data, name etc, except for teg style)  working/not working
        },
      });
      let end = new Date().getTime(); //Нужно для подсчета времени выполнения скрипта
      console.log('Время выполнения скрипта вебсокета (миллисекунд): ' + String(Number(end) - Number(start)));
    });

}
elem.onclick = function() {
  updateContentWebSocket();
};
//setInterval(updateContentWebSocket, 50);


