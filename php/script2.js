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
        new_dom_document:docNew,
        old_dom_document:document,
        debug: true
      });
    });

}
elem.onclick = function() {
  updateContentWebSocket();
};
//setInterval(updateContentWebSocket, 10000);


