/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

export interface UserState {
  firstName: string;
}

const initialState = {
  firstName: '',
  lastName: '',
  id: '',
  email: '',
  authenticated: false,
};

const UserReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH.AUTH_USER:
      draftState.firstName = action.payload.firstName;
      draftState.lastName = action.payload.lastName;
      draftState.id = action.payload.id;
      draftState.email = action.payload.email;
      draftState.authenticated = true;
      return draftState;

    case ActionTypes.AUTH.DEAUTH_USER:
      draftState.id = '';
      draftState.email = '';
      draftState.authenticated = false;
      return draftState;

    case ActionTypes.AUTH.AUTH_ERROR:
      draftState.id = '';
      draftState.email = '';
      draftState.authenticated = true;
      return draftState;

    default:
      return draftState;
  }
}, initialState);

export default UserReducer;
