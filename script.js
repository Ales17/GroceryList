function getRandomId(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  // Tasklist
  let notesArr = [] ;
  // DOM HTML selectors
  const btnSubmit = document.getElementById("btn-submit");
  const taskList = document.getElementById("tasklist");
  const btnSave = document.getElementById("btn-to-ls");
  const inputNote = document.getElementById("input-note");
  const form = document.getElementById("to-do-form");
  // Form listener
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Task from input
    let taskValue = inputNote.value;
    // Some random task ID
    let newId = getRandomId(0, 100);
    // Push new task to our arr
    notesArr.push({ id: newId, task: taskValue });
    // Pin to our board 
    renderTasks(taskValue)
    // Clear the input
    inputNote.value = "";
    // Pass notes to LocalStorage 
    localStorage.setItem("storage", JSON.stringify(notesArr));
  });
  function renderTasks(input) {
    let box = document.createElement("div");
    box.className = "box";
    box.innerText = input;
    taskList.appendChild(box);
}
function deleteNote(id) {

}
window.addEventListener("load", function () {
    if (localStorage.getItem("storage") != null) {
       let fromLS = JSON.parse(localStorage.getItem("storage"))
      console.log("On Load - Loaded from LS")
      fromLS.forEach(element => {
        notesArr.push(element)
        console.log(element.task)
        renderTasks(element.task)
      });
      console.log("***")
    }
  });