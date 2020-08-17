const toDoForm = document.querySelector(".toDoForm"),
    input = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toList");

const listKey = "toList";
let toDos = [];

function saveToList(list) {
    localStorage.setItem(listKey, JSON.stringify(list));
}

function deleteList() {
    const btnId = event.target.parentNode;
    
    toDoList.removeChild(btnId);

    const toDosToList = toDos.filter(function(li) {
        return li.id !== parseInt(btnId.id);
    });

    toDos = toDosToList;

    console.log(toDos);
    saveToList(toDos);
}

function paintToList(text) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    btn.innerText = '❌';
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(btn);
    btn.classList.add("delBtn");
    btn.addEventListener("click", deleteList);
    li.id = newId;
    toDoList.appendChild(li);

    const listObj = {
        text: text,
        id: newId
    };

    toDos.push(listObj);
    saveToList(toDos);
}

function handleSubmit(event) {
    event.preventDefault();
    const inputText = input.value;
    paintToList(inputText);
    input.value = "";
}

function loadListCheck() {
    const currentList = localStorage.getItem(listKey);

    if(currentList !== null) {
        const currentToList = JSON.parse(currentList);

        currentToList.forEach(function(toDo) {
            paintToList(toDo.text);
        });
    } 
}

function init() {
    loadListCheck();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();