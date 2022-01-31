import { UpdateBlock} from "./intellectual_update_page/main.js";

function updateContentWebSocket() {
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
        debug: true
      });
      let end = new Date().getTime(); //Нужно для подсчета времени выполнения скрипта
      console.log('Время выполнения скрипта вебсокета (миллисекунд): ' + String(Number(end) - Number(start)));
    });

}
elem.onclick = function() {
  updateContentWebSocket();
};
//setInterval(updateContentWebSocket, 10000);


