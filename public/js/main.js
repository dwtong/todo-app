function xhreq(reqType, reqUrl, callback, body) {
  var xhr = new XMLHttpRequest();

  // When xhr request is has returned (status 4), execute callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

      // Only execute callback if it exists and it's a function
      if (callback && typeof callback === 'function') {
        callback(xhr.responseText);

      } else {
        console.log('Successful request.');
      }
    }
  }

  // Make XHR request
  xhr.open(reqType, reqUrl, true);

  // Include request header and content for POST
  if (reqType == 'POST') {
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(body);

  } else {
    xhr.send();
  }
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

function addTodo(description, callback) {
  var jsonRequest = JSON.stringify({
    'description': description
  });

  // Make request with todo description included, execute callback with response
  xhreq('POST', '/api/todo', function (res) {
    // Pass todo object to callback after parsing JSON response
    var todo = JSON.parse(res);
    callback(todo);
  }, jsonRequest);
}

function deleteTodo(todoId) {
  xhreq('DELETE', '/api/todo/' + todoId);
}

function renderChecklistItem(item, parent) {
  // Create new element for item
  var div = document.createElement('div');
  div.className = 'todo-item';
  div.id = item._id;
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
  parent.appendChild(div);

  // Add event listener
  checkbox.addEventListener('click', function () {
    // TODO - Remember when item has been checked - update DB schema?
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

function renderInputField(containerElement, todoListElement) {
  // Create div to hold the input box
  var div = document.createElement('div');
  div.className = 'input-box';

  // Create input box
  var textBox = document.createElement('input');
  textBox.type = 'text';

  // Add submit button
  var submitButton = document.createElement('button');
  submitButton.innerHTML = 'add';
  // Append input box and submit button to div and div to container
  div.appendChild(textBox);
  div.appendChild(submitButton);
  containerElement.appendChild(div);

  // Add event listener for button
  submitButton.addEventListener('click', function () {
    // Add entered item to checklist
    addTodo(textBox.value, function (todo) {
      renderChecklistItem(todo, todoListElement);
    });

    // Clear input box
    textBox.value = null;

  });

  // Add event listener for 'enter' key
  textBox.addEventListener('keypress', function (event) {
    var key = event.which;

    // When enter key (13) is pressed, add new todo
    if (key == 13) {
      // Add entered item to checklist
      addTodo(this.value, function (todo) {
        renderChecklistItem(todo, todoListElement);
      });

      // Clear input box
      this.value = null;
    }
  });
}

function renderDeleteButton(containerElement) {
  // Create delete button and div to put it in
  var div = document.createElement('div');
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'delete completed items';
  div.appendChild(deleteButton);
  containerElement.appendChild(div);

  deleteButton.addEventListener('click', function () {
    var todoCheckboxes = document.getElementsByClassName('todo-checkbox');

    // For each checked item, send DELETE request
    for (var i = 0; i < todoCheckboxes.length; i++) {
      if (todoCheckboxes[i].checked) {
        // API call to delete item from DB
        deleteTodo(todoCheckboxes[i].id);

        // Remove element from page
        var todoDiv = document.getElementById(todoCheckboxes[i].id);
        document.querySelector('.todo-list').removeChild(todoDiv);
      }
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
      renderChecklistItem(item, todoListElement);
    });
  });

  // Render input box to add new todo item
  renderInputField(containerElement, todoListElement);

  // Render delete button, with associated delete functionality
  renderDeleteButton(containerElement);
};