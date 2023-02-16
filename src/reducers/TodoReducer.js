import produce from 'immer';
import ActionTypes from '../actions/TodoActions';
import generateId from '../utils/generateId';

const TodoReducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.ADD_TODO:
        draft.todos.push({ id: generateId(), title: action.payload, completed: false });
        break;
      case ActionTypes.CLEAR_COMPLETED:
        draft.todos = draft.todos.filter(todo => !todo.completed)
        break;
      case ActionTypes.DELETE_TOD0:
        draft.todos = draft.todos.filter(todo => todo.id !== action.payload);
        break;
      case ActionTypes.TOGGLE_COMPLETED_ALL:
        draft.todos = draft.todos.map(t => ({ ...t, completed: action.payload }))
        break;
      case ActionTypes.TOGGLE_COMPLETED: {
        const todo = draft.todos.find(t => t.id === action.payload);
        todo.completed = !todo.completed;
      }
        break;
      case ActionTypes.EDIT_TODO: {
        const todo = draft.todos.find(t => t.id === action.payload.id);
        todo.title = action.payload.title;
      }
        break;
      case ActionTypes.SET_TODOS:
        draft.todos = action.payload;
        break;

      default:
        break;
    }
  });

export default TodoReducer;