const SOTRAGE_KEY = 'todoList';

export default class Api {
  static saveTodo(todo) {
    const todoList = JSON.parse(window.localStorage.getItem(SOTRAGE_KEY)) || [];
    if (todo.id) {
      let idx;
      todoList.some((t, index) => {
        if (t.id === todo.id) {
          idx = index;
          return true;
        }
      });
      todoList[idx] = todo;
    } else {
      todo.id = Date.now();
      todoList.push(todo);
    }
    window.localStorage.setItem(SOTRAGE_KEY, JSON.stringify(todoList));

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(todoList);
      }, 1);
    });
  }

  static getTodo() {
    const todoList = JSON.parse(window.localStorage.getItem(SOTRAGE_KEY)) || [];

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(todoList);
      }, 1);
    });
  }

  static deleteTodo(todoId) {
    const todoList = JSON.parse(window.localStorage.getItem(SOTRAGE_KEY)) || [];
    let idx;
    todoList.some((todo, index) => {
      if (todo.id === todoId) {
        idx = index;
        return true;
      }
    });
    todoList.splice(idx, 1);
    window.localStorage.setItem(SOTRAGE_KEY, JSON.stringify(todoList));

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(todoList);
      }, 1);
    });
  }

  static toggleCompleteTodo(todoId) {
    const todoList = JSON.parse(window.localStorage.getItem(SOTRAGE_KEY)) || [];
    todoList.some(todo => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
        return true;
      }
    });
    window.localStorage.setItem(SOTRAGE_KEY, JSON.stringify(todoList));

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(todoList);
      }, 1);
    });
  }
}