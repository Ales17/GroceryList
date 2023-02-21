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
const inputTask = document.getElementById("input-task");
const formTask = document.getElementById("form-task");
// Form listener
formTask.addEventListener("submit", function (e) {  
  e.preventDefault();
  if(inputTask.value.length > 1000) {alert("Překročili jste limit 1 000 znaků")} 
  else{
  let taskValue = inputTask.value;
  
  let newId = uuidv4();
  notesArr.push({ id: newId, task: taskValue });
  // Pin to our board
  renderTasks({ id: newId, task: taskValue });
  // Clear the input
  inputTask.value = "";
  // Pass notes to LocalStorage
  localStorage.setItem("storage", JSON.stringify(notesArr));}
});


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
  // BS card text
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  // BS button
  let btnDel = document.createElement("a");
  btnDel.className = "btn btn-danger";
  // Setting balues
  cardText.innerHTML = input.task;
  btnDel.innerHTML = "Odstranit";
  // Appending
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(cardText);
  cardBody.appendChild(btnDel);
  // Appending to element in INDEX.html
  taskList.appendChild(col);
  taskList.className = "row";
  initMasonry();
  btnDel.addEventListener("click", function (e) {
    deleteNote(input.id);
    removeAllChildNodes(taskList);
    notesArr.forEach((element) => {
      renderTasks(element);
    });
    localStorage.setItem("storage", JSON.stringify(notesArr));
  });
}
// Deletes from notesArr by ID
function deleteNote(id) {
  let result = notesArr.filter((element) => element.id != id);
  notesArr = result;
  
}
// If there are tasks in LS, render them
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
// Masonry init
function initMasonry() {
  var container = document.querySelector('#tasklist');
  new Masonry(container, {
    itemSelector: '.col-12',
    percentPosition: true
  });
}
// Onload
window.addEventListener('load', function() {
  initMasonry();
});