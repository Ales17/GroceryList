function getRandomId(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
// Tasklist
let notesArr = [];
// DOM HTML selectors
const btnSubmit = document.getElementById("btn-submit");
const taskList = document.getElementById("tasklist");
const btnSave = document.getElementById("btn-to-ls");
const inputNote = document.getElementById("input-note");
const form = document.getElementById("to-do-form");
// Form listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let taskValue = inputNote.value;
  let newId = getRandomId(0, 100);
  notesArr.push({ id: newId, task: taskValue });
  // Pin to our board
  renderTasks({ id: newId, task: taskValue });
  // Clear the input
  inputNote.value = "";
  // Pass notes to LocalStorage
  localStorage.setItem("storage", JSON.stringify(notesArr));
});
function renderTasks(input) {
  let box = document.createElement("div");
  let delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.id = input.id; 
  box.className = "box";
  box.innerText = input.task;
  box.appendChild(delBtn);
  taskList.appendChild(box);

  delBtn.addEventListener("click", function (e) {

    deleteNote(input.id);
    removeAllChildNodes(taskList);
    notesArr.forEach((element) => {
      renderTasks(element);
    });

    localStorage.setItem("storage", JSON.stringify(notesArr));

   });
}


function deleteNote(id) {
  // delete from notesArr by ID
  let result = notesArr.filter((element) => element.id != id);
  // update notesArr
  notesArr = result;
  console.log(notesArr);
}

 


window.addEventListener("load", function () {
  if (localStorage.getItem("storage") != null) {
    let fromLS = JSON.parse(localStorage.getItem("storage"));
    console.log("On Load - Loaded from LS");
    fromLS.forEach((element) => {
      notesArr.push(element);
      console.log(element.task);
      renderTasks(element);
    });
    console.log("***");
  }
});
