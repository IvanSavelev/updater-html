import { UpdateBlock} from "./intellectual_update_page/Main.js";

function updateContentWebSocket() {
  fetch(document.URL)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      let docNew = new DOMParser().parseFromString(data, "text/html");
      console.log(docNew);
      UpdateBlock({
        newDomDocument:docNew,
        timeCloseBlink:500,
        oldDomDocument:document,
        debug: true
      });
    });

}
elem.onclick = function() {
  updateContentWebSocket();
};
//setInterval(updateContentWebSocket, 10000);


