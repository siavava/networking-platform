/* eslint-disable no-param-reassign */
import produce from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  id: '',
  email: '',
  authToken: '',
};

const UserReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.USER.LOGIN:
      draftState.id = action.payload.id;
      draftState.email = action.payload.email;
      draftState.authToken = action.payload.authToken;
      return draftState;

    case ActionTypes.USER.SIGNUP:
      draftState.id = action.payload.id;
      draftState.email = action.payload.email;
      draftState.authToken = action.payload.authToken;
      return draftState;

    default:
      return draftState;
  }
}, initialState);

export default UserReducer;
