
let toDoInput; //where the user enters the task content
let errorInfo; //error
let addBtn; //ADD button - adds new elements to the list
let ulList; //task list, an UL element
let newToDo; //newly added li, a new task

let popup; //popup
let popupInfo; //text in the popup, showing a test text
let todoToEdit; //edited Todo
let popupInput; //input in the popup
let popupAddBtn; //the 'accept' button in the popup
let popupCloseBtn; //the 'cancel' button in the popup

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    loadToDoListFromLocalStorage(); // Load existing to-do list from local storage on page load
};

//---------Get all Elements------>
const prepareDOMElements = () => {
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
};

//----Event listeners--------->
const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
};

//<---------create a new toDo----->
const addNewToDo = () => {
    if (toDoInput.value != '') {
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        createToolArea();
        ulList.append(newToDo);

        // <-----Save the updated to-do list to local storage----->
        saveToDoListToLocalStorage();

        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter the task content!';
    }
};

const createToolArea = () => {
    const div = document.createElement('div');
    div.classList.add('tools');
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>';

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    div.append(buttonDone, buttonEdit, buttonCancel);
};

const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')) {
        editToDo(e);
    } else if (e.target.matches('.delete')) {
        deleteToDo(e);
    }

    // Save the updated to-do list to local storage
    saveToDoListToLocalStorage();
};

// <-------functions  for popupMenu---->
const editToDo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
};

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
};

const changeTodoText = () => {
    if (popupInput.value != '') {
        todoToEdit.firstChild.textContent = popupInput.value;

        popup.style.display = 'none';
        popupInfo.textContent = '';

        // Save the updated to-do list to local storage
        saveToDoListToLocalStorage();
    } else {
        popupInfo.textContent = 'You must enter some content!';
    }
};

const deleteToDo = (e) => {
    e.target.closest('li').remove();

    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'No tasks on the list.';
    }

    // Save the updated to-do list to local storage
    saveToDoListToLocalStorage();
};

const enterKeyCheck = (e) => {
    if (e.key == 'Enter') {
        addNewToDo();
    }
};

const loadToDoListFromLocalStorage = () => {
    const savedToDoList = localStorage.getItem('todoList');
    if (savedToDoList) {
        ulList.innerHTML = savedToDoList;
    }
};

const saveToDoListToLocalStorage = () => {
    localStorage.setItem('todoList', ulList.innerHTML);
};

document.addEventListener('DOMContentLoaded', main);
