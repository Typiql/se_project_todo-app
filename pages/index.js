import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addToDoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addToDoPopupElement.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    onUpdateCompleted: (isCompleted) => todoCounter.updateCompleted(isCompleted),
    onUpdateTotal: (isAdding) => todoCounter.updateTotal(isAdding),
  });
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addToDoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues
    const dateObject = new Date(date);
    dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset());
    const newTodo = {
      name,
      date: dateObject,
      completed: false,
      id: uuidv4(),
    };
    const todoElement = generateTodo(newTodo);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    addToDoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addToDoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addToDoPopup.open());
