/* WEBSOCKET */

import {UpdateBlock} from './UpdateBlock.js';
//Pusher.logToConsole = $('meta[name="app_debug_cds"]').attr('content'); //Ведем лог запросов в браузере
if ($('input[name="websocket_check"]').val()) {
  createWebSocket();
}

function createWebSocket() {
  let path_uri = (window.location.pathname).slice(1);
  let pusher_channel = 'presence-page_update';
  let db_serv = 'real';
  if ($('meta[name="db_serv"]').attr('content') == 'test') {
    pusher_channel = 'presence-test_page_update';
    db_serv = 'test';
  }

  let path_correct = path_uri.replace(new RegExp('\/', 'g'), '_'); //Заменим слеши на нижнее подчеркивание
//Создаем коннект (это нужно на каждой странице)
  let pusher = new Pusher($('input[name="websocket_pusher_app_key"]').val(), {
    broadcaster: 'pusher', //Тип соединения
    wsHost: window.location.hostname, //Имя хоста для соединения совпадает с именем сайта (сервер вебсокетов крутится под таким же именем, но другим портом)
    wssPort: 6001, //Чтоб и в локальной и в боевой версии работало, показываем порты wss и ws
    wsPort: 6001,
    cluster: $('input[name="websocket_pusher_app_cluster"]').val(), //Кластер должен быть у всех один, чтоб соединение было
    authEndpoint: $('input[name="websocket_url_of_auth"]').val(), //url для рукопожатия (аутенификации)
    auth: {
      params: {
        uri: path_uri,
        db_serv: db_serv
      },
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') //Дополнительно передаем csrf-token
      }
    },
    disableStats: true, //Отключаем сбор статистики, поэтому метрики соединения не отправляются на серверы Pusher.
    enabledTransports: ['ws', 'wss'], //Чтоб и в локальной и в боевой версии работало, говорим что готовы работать по обоим протоколам
    encrypted: $('input[name="websocket_encrypted"]').val(), //Шифрование, на локальном сайте отключаем, на боевом включаем
  });


  let presence_queue_group = pusher.subscribe(pusher_channel + '_' + path_correct);
  presence_queue_group.bind('update_view', function (data, metadata) {
    if (!data.message) {
      console.log('WS: event no message');
      return;
    }
    if (data.message === "no_change_content") {
      console.log('WS: event no change content');
      return;
    }
    //Перезагружаем страницу
    if (data.type_update === 'update_page') {
      location.reload();
    }
    //Меняем на странице только те места, которые реально поменялись
    if (data.type_update === 'intellectual_update_page') {
      if (data.message === "change_content") {
        if (data.content) {
          console.log('WS: event change content ');
          updateContentWebSocket(data.content); //Эта функция меняет контент на странице
        } else {
          console.log('WS: event no content');
        }
      }
    }
  });


  function updateContentWebSocket(data) {
    let start = new Date().getTime(); //Нужно для подсчета времени выполнения скрипта
    let doc_new = new DOMParser().parseFromString(data, "text/html");
    let doc_old = document;

    setSortingFirstTables();  //Тут смена контента
    IntellectualUpdateBlock({
      new_dom_document: doc_new,
      old_dom_document: doc_old,
      event: {
        end_update: setSaveSortingFirst
      }
    });
    console.log('222');

    setSorting(); //Приводим таблицы к состоянию сортировки, в котором они находились перед обновлением вебсокетами
    let end = new Date().getTime(); //Нужно для подсчета времени выполнения скрипта
    console.log('Время выполнения скрипта вебсокета (миллисекунд): ' + String(Number(end) - Number(start)));

    //showNewValue(); //Вставить новые значения

  }


  function showNewValue() {
    setTimeout(function () { //Удаляем классы подсветки измененых областей
      let element = document.querySelectorAll('[data-websocket_new_value]');
      element.forEach(
        function (currentValue, currentIndex, listObj) {
          currentValue.childNodes[0].nodeValue = currentValue.dataset.websocket_new_value;
          currentValue.removeAttribute('data-websocket_new_value');
        });
    }, 1000);
  }


  if ($.cookie('check_connect_websocket') === 'false') {
    checkConnectWebsocketNo();
  }
  pusher.connection.bind('error', function (err) {
    $.cookie('check_connect_websocket', false, {path: '/'});
    checkConnectWebsocketNo();
  });
  pusher.connection.bind('connected', function () {
    //Включить вебсокеты
    $('.websocket-status').removeClass('gray error');
    $('.websocket-status').addClass('green');
    $('.websocket-status').attr('title', 'Автообновление работает');
    $.removeCookie('check_connect_websocket', {path: '/'});
  });

  function checkConnectWebsocketNo() {
    $('.websocket-status').removeClass('gray green');
    $('.websocket-status').addClass('error');
    $('.websocket-status').attr('title', 'Автообновление не работает, обновите страницу нажав F5, если не заработает, обратитесь в службу поддержки');
  }

}








