import { ACTIONS, CATEGORY_ALL } from './ActionCreator';

const initialState = {
  todoList: [],
  filter: CATEGORY_ALL,
  isOpenSideMenu: false,
};

export default function Redusers(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.OPEN_SIDE_MENU: {
      const newState = Object.assign({}, state, {
        isOpenSideMenu: true,
      });
      return newState;
    }

    case ACTIONS.CLOSE_SIDE_MENU: {
      const newState = Object.assign({}, state, {
        isOpenSideMenu: false,
      });
      return newState;
    }

    case ACTIONS.SAVE_TODO:
    case ACTIONS.GET_TODO:
    case ACTIONS.TOGGLE_COMPLETE_TODO:
    case ACTIONS.DELETE_TODO: {
      const newState = Object.assign({}, state, {
        todoList: action.todoList,
      });
      return newState;
    }

    case ACTIONS.FILTER_TODO_BY_CATEGORY: {
      const newState = Object.assign({}, state, {
        filter: action.category,
      });
      return newState;
    }


    default: return initialState;
  }
}