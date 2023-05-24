/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const NotesReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.NOTE.GET_NOTES:
      draftState.all = action.payload;
      break;

    case ActionTypes.NOTE.GET_NOTE:
      draftState.current = action.payload;
      break;

    case ActionTypes.NOTE.UPDATE_NOTE:
      draftState.current = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default NotesReducer;
