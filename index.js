var myForm = document.getElementById("myForm");
var inputTodo = document.getElementById("inputTodo");
var inputDescription = document.getElementById("inputDescription");
var inputDate = document.getElementById("inputDate");
var progress = {
  done: "Done",
  pending: "Pending",
};

function addTodo() {
  todoObj = {
    InputTodo: inputTodo.value,
    progress: progress.pending,
  };

  var localCheck = localStorage.getItem("todoObj");
  if (localCheck == null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localCheck);
  }
  todoArray.push(todoObj);
  localStorage.setItem("todoObj", JSON.stringify(todoArray));
  inputTodo.value = "";

  makeCustomCard();
}

function openModal() {
  document.getElementById("editTodo").value = "Test";
}
//edit t
function editTodo(index) {
  var saveIndex = document.getElementById("saveIndex");
  var addTodo = document.getElementById("addTodo");
  var saveTodo = document.getElementById("saveTodo");

  saveIndex.value = index;

  var localCheck = localStorage.getItem("todoObj");
  var todoArray = JSON.parse(localCheck);
  inputTodo.value = todoArray[index].InputTodo;
  inputDescription.value = todoArray[index].InputDescription;
  inputDate.value = todoArray[index].InputDate;

  addTodo.style.display = "none";
  saveTodo.style.display = "inline-block";
}

// delete a todo

var deleteBtn = document.getElementById("delete");
function deleteTodo(index) {
  var localCheck = localStorage.getItem("todoObj");
  var todoArray = JSON.parse(localCheck);

  todoArray.splice(index, 1);
  localStorage.setItem("todoObj", JSON.stringify(todoArray));
  makeCustomCard();
}

// Delete All


function doneTodo(index) {
  var localCheck = localStorage.getItem("todoObj");
  var todoArray = JSON.parse(localCheck);

  const todoObj = {
    ...todoArray[index],
    progress: progress.done,
  };
  todoArray[index] = todoObj;

  localStorage.setItem("todoObj", JSON.stringify(todoArray));
  makeCustomCard();
}
makeCustomCard();

function makeCustomCard() {
  var localCheck = localStorage.getItem("todoObj");
  if (localCheck == null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localCheck);
  }
  let html = "";
  var todoItems = document.getElementById("todoList");

  todoArray.forEach(function (todo, index) {
    html += `<li class="list-group-item">
    <div class="todo-indicator ${
      todo.progress === progress.done ? "bg-success" : "bg-warning"
    } "></div>
    <div class="widget-content px-4">
        <div class="widget-content-wrapper">
  
            <div class="widget-content-left">
                <div class="widget-heading">${
                  todo.InputTodo
                } <div class="badge badge-danger ml-2">${todo.progress}</div>
                </div>
                
            </div>
            <div class="widget-content-right">${
              todo.progress === progress.done
                ? ""
                : 
                `
             <button  class="border-0 btn-transition btn btn-outline-success" onclick="doneTodo(${index});" > <i class="fa fa-check"></i>
             <button  class="border-0 btn-transition btn" onclick="editModal(${index})" data-toggle="modal" data-target="#editModal" ta id="editBtn"> <i class="fa fa-pencil-square-o"></i>
             `
            }
            
            
            </button> <button class="border-0 btn-transition btn btn-outline-danger"> <i onclick="deleteTodo(${index})" id="delete" class="fa fa-trash"></i> </button> </div>
        </div>
    </div>
  </li>`;
  });
  todoItems.innerHTML = html;
}

function editModal(index) {
  var localCheck = localStorage.getItem("todoObj");
  if (localCheck == null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localCheck);
  }
  document.getElementById("editTodo").value = todoArray[index].InputTodo;
  document.getElementById("edit").value = index;
}

function setTodo() {
  var localCheck = localStorage.getItem("todoObj");
  const index = document.getElementById("edit").value;
  if (localCheck == null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localCheck);
  }
  todoArray[index].InputTodo = document.getElementById("editTodo").value;
  localStorage.setItem("todoObj", JSON.stringify(todoArray));
  makeCustomCard();
}
