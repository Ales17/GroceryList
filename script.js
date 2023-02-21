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
  if(inputNote.value.length > 1000) {alert("Překročili jste limit 1 000 znaků")} 
  else{
  let taskValue = inputNote.value;
  
  let newId = getRandomId(1, 100);
  notesArr.push({ id: newId, task: taskValue });
  // Pin to our board
  renderTasks({ id: newId, task: taskValue });
  // Clear the input
  inputNote.value = "";
  // Pass notes to LocalStorage
  localStorage.setItem("storage", JSON.stringify(notesArr));}
});




function renderTasks(input) {
   
  let col = document.createElement("div");
   
  col.className = "col-12 col-sm-6 col-md-3";
  let card = document.createElement("div");
  card.className = "card mb-3 mt-3";
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  let delBtn = document.createElement("a");
  delBtn.className = "btn btn-danger";
 
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(cardText);
  cardBody.appendChild(delBtn);

  cardText.innerHTML = input.task;
  delBtn.innerHTML = "Odstranit";
   
  
  taskList.appendChild(col);
  taskList.className = "row ";
  initMasonry();
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

function initMasonry() {
  var container = document.querySelector('#tasklist');
  new Masonry(container, {
    itemSelector: '.col-12',
    percentPosition: true
  });
}
window.addEventListener('load', function() {
  initMasonry();
});