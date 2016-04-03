var todos = [];

function xhreq(reqType, reqUrl, callback) {

  var xhr = new XMLHttpRequest();

  // When xhr request is returned (status 4), execute callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (callback) {
        callback(xhr.responseText);
      } else {
        console.log('Successful request.');
      }
    }
  }

  // Make XHR request
  xhr.open(reqType, reqUrl, true);
  xhr.send();
}

function getAllTodos(callback) {

  // Request JSON object with all todos from API
  xhreq('GET', '/api/todo', function (res) {

    // Parse todos into an array of objects
    res = JSON.parse(res);

    // TODO - Get rid of this - only use one forEach
    res.forEach(function (item) {
      todos.push(item.description);
    });

    callback();

  });
}

window.onload = function () {
  var todoList = document.querySelector('.todo-list');

  getAllTodos(function () {
    todos.forEach(function (item) {
      var div = document.createElement('li');
      div.className = 'todo-item';
      var content = document.createTextNode(item);
      div.appendChild(content);
      todoList.appendChild(div);
    });
  });

  //todoList.innerHTML = ;
  //foo = JSON.parse(xhr.responseText);


};