function xhreq(reqType, reqUrl, callback, body) {
  var xhr = new XMLHttpRequest();

  // When xhr request is has returned (status 4), execute callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

      // Only execute callback if it exists and it's a function
      if (callback && typeof callback === 'function') {
        callback(xhr.responseText);
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
  xhreq('GET', '/api/todo', function (response) {

    // Parse todos into an array of objects
    var todos = JSON.parse(response);

    // Execute callback, if it exists and is a function
    if (callback && typeof callback === 'function') {
      callback(todos);
    }
  });
}

function postTodo(description, callback) {
  var jsonRequest = JSON.stringify({
    'description': description
  });

  // Make request with todo description included, execute callback with response
  xhreq('POST', '/api/todo', function (response) {
    // Pass todo object to callback after parsing JSON response
    var todo = JSON.parse(response);

    if (callback && typeof callback === 'function') {
      callback(todo);
    }
  }, jsonRequest);
}

function deleteTodo(todoId) {
  xhreq('DELETE', '/api/todo/' + todoId);
}

function renderChecklistItem(item, parent) {
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
  parent.appendChild(div);
}

function renderInputField(containerElement, todoListElement) {
  // Create elements
  var div = document.createElement('div');
  div.className = 'input-box';

  var textBox = document.createElement('input');
  textBox.type = 'text';
  div.appendChild(textBox);

  var submitButton = document.createElement('button');
  submitButton.innerHTML = 'add';
  div.appendChild(submitButton);

  containerElement.appendChild(div);

  // Add event listener for button
  submitButton.addEventListener('click', function () {
    // Add entered item to checklist
    postTodo(textBox.value, function (todo) {
      renderChecklistItem(todo, todoListElement);
    });

    // Clear input box
    textBox.value = null;

  });

  // Add event listener for 'enter' key
  textBox.addEventListener('keypress', function (event) {
    // When enter key (13) is pressed, add new todo
    var key = event.which;
    if (key == 13) {
      postTodo(this.value, function (todo) {
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
  div.className = 'delete-box';
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'delete completed items';
  div.appendChild(deleteButton);
  containerElement.appendChild(div);

  deleteButton.addEventListener('click', function () {
    var todoCheckboxes = document.getElementsByClassName('todo-checkbox');

    // For each checked item, send DELETE request
    for (var i = todoCheckboxes.length - 1; i >= 0; i--) {
      if (todoCheckboxes[i].checked) {
        deleteTodo(todoCheckboxes[i].id);

        // Remove element from page
        var todoDiv = document.getElementById(todoCheckboxes[i].id).parentElement;
        document.querySelector('.todo-list').removeChild(todoDiv);
      }
    }
  });
}

window.onload = function () {
  var containerElement = document.querySelector('.container');
  var todoListElement = document.querySelector('.todo-list');

  getAllTodos(function (todos) {
    todos.forEach(function (item) {
      renderChecklistItem(item, todoListElement);
    });
  });

  renderInputField(containerElement, todoListElement);
  renderDeleteButton(containerElement);
};
