import Api from './Api';

export const CATEGORY_ALL = 'CATEGORY_ALL' + Math.random();
export const CATEGORY_NONE = 'CATEGORY_NONE' + Math.random();

export const ACTIONS = {
  OPEN_SIDE_MENU: 'OPEN_SIDE_MENU',
  CLOSE_SIDE_MENU: 'CLOSE_SIDE_MENU',
  GET_TODO: 'GET_TODO',
  SAVE_TODO: 'SAVE_TODO',
  TOGGLE_COMPLETE_TODO: 'TOGGLE_COMPLETE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  FILTER_TODO_BY_CATEGORY: 'FILTER_TODO_BY_CATEGORY',
};

export class ActionCreator {

  static openSideMenu() {
    return {
      type: ACTIONS.OPEN_SIDE_MENU,
    };
  }

  static closeSideMenu() {
    return {
      type: ACTIONS.CLOSE_SIDE_MENU,
    };
  }

  static saveTodo(todo) {
    return dispatch => {
      Api
        .saveTodo(todo)
        .then(res => {
          dispatch({
            type: ACTIONS.SAVE_TODO,
            todoList: res,
          });
        });
    };
  }

  static getTodo() {
    return dispatch => {
      Api
        .getTodo()
        .then(res => {
          dispatch({
            type: ACTIONS.GET_TODO,
            todoList: res,
          });
        });
    };
  }

  static toggleCompleteTodo(todoId) {
    return dispatch => {
      Api
        .toggleCompleteTodo(todoId)
        .then(res => {
          dispatch({
            type: ACTIONS.TOGGLE_COMPLETE_TODO,
            todoList: res,
          });
        });
    };
  }

  static deleteTodo(todoId) {
    return dispatch => {
      Api
        .deleteTodo(todoId)
        .then(res => {
          dispatch({
            type: ACTIONS.DELETE_TODO,
            todoList: res,
          });
        });
    };
  }

  static filterTodoByCategory(category) {
    return {
      type: ACTIONS.FILTER_TODO_BY_CATEGORY,
      category,
    };
  }
}