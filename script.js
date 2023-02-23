const colors = ["#ffffff", "#bFFFbF", "#ffffbf"];
// Functions
function initMasonry() {
  var container = document.querySelector("#div-tasks");
  new Masonry(container, {
    itemSelector: ".col-12",
    percentPosition: true,
  });
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function renderTasks(input) {
  // BS col
  let col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-3";
  // BS card
  let card = document.createElement("div");
  card.className = "card mb-3 mt-3";
  // BS card body
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  card.style.backgroundColor = `${input.color}`;
  // BS card text
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  // BS btn group
  let btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  // BS button
  let btnDel = document.createElement("a");
  btnDel.className = "btn btn-danger btn-sm";
  let iconDel = document.createElement("i");
  iconDel.className = "bi bi-x-square-fill";
  // Color btn
  let btnCol = document.createElement("a");
  btnCol.className = "btn btn-primary btn-sm";
  btnCol.id = input.id;
  let iconCol = document.createElement("i");
  iconCol.className = "bi bi-palette-fill";
  // Setting balues
  cardText.innerHTML = input.task;

  // Appending
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(cardText);

  cardBody.appendChild(btnGroup);
  btnGroup.appendChild(btnDel);
  btnDel.appendChild(iconDel);
  btnCol.appendChild(iconCol);
  btnGroup.appendChild(btnCol);

  // Appending to element in INDEX.html
  divTasks.appendChild(col);
  divTasks.className = "row";
  initMasonry();
  btnDel.addEventListener("click", function (e) {
    deleteNote(input.id);
    removeAllChildNodes(divTasks);
    tasksArray.forEach((element) => {
      renderTasks(element);
    });
    localStorage.setItem("storage", JSON.stringify(tasksArray));
  });

  btnCol.addEventListener("click", function (e) {
    console.log(e.target.id);

    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].id === e.target.id) {
        //tasksArray[i].color = "#bFFFbF";

        // LOOP THROUGH COLORS
        for (let j = 0; j < colors.length; j++) {
          if (tasksArray[i].color === colors[j]) {
            tasksArray[i].color = colors[j + 1];
            break;
          } else if (tasksArray[i].color === colors[colors.length - 1]) {
            tasksArray[i].color = colors[0];
            break;
          }
        }
      }
      removeAllChildNodes(divTasks);
      tasksArray.forEach((e) => renderTasks(e));

      console.log(e);
    }
  });
}
// Deletes from array by ID
function deleteNote(id) {
  let result = tasksArray.filter((element) => element.id != id);
  tasksArray = result;
}
// *****************************
// Tasklist
let tasksArray = [];
// DOM HTML selectors
const btnSubmit = document.getElementById("btn-submit");
const divTasks = document.getElementById("div-tasks");
const inputTask = document.getElementById("input-task");
const formTask = document.getElementById("form-task");
// Form listener
formTask.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputTask.value.length > 1000) {
    alert("Překročili jste limit 1 000 znaků");
  } else {
    let taskValue = inputTask.value;
    let taskColor = "#ffffff";
    let taskId = uuidv4();
    tasksArray.push({ id: taskId, task: taskValue, color: taskColor });
    // Pin to our board
    renderTasks({ id: taskId, task: taskValue, color: taskColor });
    // Clear the input
    inputTask.value = "";
    // Pass notes to LocalStorage
    localStorage.setItem("storage", JSON.stringify(tasksArray));
  }
});

// After load - if there are tasks in LS, render them
window.addEventListener("load", function () {
  if (localStorage.getItem("storage") != null) {
    let fromLS = JSON.parse(localStorage.getItem("storage"));

    fromLS.forEach((element) => {
      tasksArray.push(element);

      renderTasks(element);
    });
  }
});

// Onload
window.addEventListener("load", function () {
  initMasonry();
});
