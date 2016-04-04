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

function addTodo(description) {
  // TODO - implement!
}

function renderTodoItem(item, list) {
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
    // When checkbox is checked, apply strikethrough style
    if (this.checked) {
      this.parentElement.style.textDecoration = "line-through";
    } else {
      // Remove strikethrough style if it has been applied
      if (this.parentElement.style.textDecoration = "line-through") {
        this.parentElement.style.textDecoration = null;
      }
    }
  });
}

function renderNewItemInput(containerElement) {
  // Create div to hold the input box
  var div = document.createElement('div');
  div.className = 'input-box';

  // Create input box
  var textBox = document.createElement('input');
  textBox.type = 'text';

  // Append input box to div and div to container
  div.appendChild(textBox);
  containerElement.appendChild(div);

  // Add event listener - listens for 'enter' key
  textBox.addEventListener('keypress', function (event) {
    var key = event.which;

    // When enter key (13) is pressed, add new todo
    if (key == 13) {
      addTodo(this.value);
    }
  });
}

window.onload = function () {
  var containerElement = document.querySelector('.container');
  var todoListElement = document.querySelector('.todo-list');

  // API call - GET all todos, then render them, and input box
  getAllTodos(function (todos) {
    // Render all todos
    todos.forEach(function (item) {
      renderTodoItem(item, todoListElement);
    });

  });

  // Render input box to add new todo item
  renderNewItemInput(containerElement);

};