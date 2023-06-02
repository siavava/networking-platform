/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const TasksReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.TASK.CREATE_TASK:
      draftState.current = action.payload;
      break;

    case ActionTypes.TASK.GET_TASKS:
      draftState.all = action.payload;
      break;

    case ActionTypes.TASK.GET_TASK:
      draftState.current = action.payload;
      break;

    case ActionTypes.TASK.UPDATE_TASK:
      draftState.current = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default TasksReducer;
