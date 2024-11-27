class Todo {
  constructor(data, selector, { onUpdateCompleted, onUpdateTotal }) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._onUpdateCompleted = onUpdateCompleted;
    this._onUpdateTotal = onUpdateTotal;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._onUpdateCompleted(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._deleteTodo();
    });
  }

  _deleteTodo() {
    this._todoElement.remove();
    this._onUpdateTotal(false);
    if (this._data.completed) {
      this._onUpdateCompleted(false);
    }
  }

  _generateDate() {
    const dueDate = new Date(this._data.date);
    const todoDateElement = this._todoElement.querySelector(".todo__date");
    if (todoDateElement && !isNaN(dueDate)) {
      todoDateElement.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoNameEl.textContent = this._data.name;
    this._generateCheckBoxEl();
    this._setEventListeners();
    this._generateDate();
    return this._todoElement;
  }
}

export default Todo;
