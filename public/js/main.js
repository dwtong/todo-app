// Global object array containing all todo items
var todos;

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
    todos = JSON.parse(res);

    callback();

  });
}

function renderItem(description, list) {
  // Create new div element for item
  var li = document.createElement('li');
  li.className = 'todo-item';

  // Add todo item description to new element
  var content = document.createTextNode(description);
  li.appendChild(content);
  list.appendChild(li);
}

window.onload = function () {
  var todoList = document.querySelector('.todo-list');

  getAllTodos(function () {
    todos.forEach(function (item) {
      renderItem(item.description, todoList);
    });

  });

};