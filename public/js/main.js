function xhreq(reqType, reqUrl, callback) {
  var xhr = new XMLHttpRequest();

  // When xhr request is returned (status 4), execute callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (callback && typeof callback === 'function') {
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
    var todos = JSON.parse(res);

    // Execute callback, if it exists and is a function
    if (callback && typeof callback === 'function') {
      callback(todos);
    }
  });
}

function renderItem(item, list) {
  // Create new element for item
  var div = document.createElement('div');
  div.className = 'todo-item';

  // Checkbox properties
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = item.description;
  checkbox.value = item.description;
  checkbox.id = item._id;
  checkbox.className = 'todo-checkbox';

  // Label for checkbox
  var label = document.createElement('label');
  label.htmlFor = checkbox.id;
  label.appendChild(document.createTextNode(item.description));

  // Add checkbox and label to div
  div.appendChild(checkbox);
  div.appendChild(label);

  // Add div to list
  list.appendChild(div);

  // Add event listener
  checkbox.addEventListener('click', function () {
    // Do something to the checkbox
  });
}

window.onload = function () {
  var todoListElement = document.querySelector('.todo-list');

  // Render full list of todos
  getAllTodos(function (todos) {
    todos.forEach(function (item) {
      renderItem(item, todoListElement);
    });
  });
};