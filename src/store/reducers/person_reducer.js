/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  name: '',
  title: '',
  email: '',
  linkedin: '',
  description: '',
  location: '',
  associatedCompany: {},
  notes: [],
  tags: [],
  tasks: [],
  people: [],
};

const PersonReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    // CREATE_PERSON
    case ActionTypes.PERSON.CREATE_PERSON:
      draftState.name = action.payload.name;
      draftState.title = action.payload.title;
      draftState.email = action.payload.email;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.associatedCompany = action.payload.associatedCompany;
      draftState.notes = action.payload.notes;
      draftState.tags = action.payload.tags;
      draftState.tasks = action.payload.tasks;
      break;

    // GET_PERSON
    case ActionTypes.PERSON.GET_PERSON:
      draftState.name = action.payload.data.name;
      draftState.title = action.payload.data.title;
      draftState.email = action.payload.data.email;
      draftState.linkedin = action.payload.data.linkedin;
      draftState.description = action.payload.data.description;
      draftState.location = action.payload.data.location;
      draftState.associatedCompany = action.payload.data.associatedCompany;
      draftState.notes = action.payload.data.notes;
      draftState.tags = action.payload.data.tags;
      draftState.tasks = action.payload.data.tasks;
      break;

      // DELETE_PERSON
      // case ActionTypes.PERSON.DELETE_PERSON:
      //   break;

    // UPDATE_PERSON
    case ActionTypes.PERSON.UPDATE_PERSON:
      draftState.name = action.payload.name;
      draftState.title = action.payload.title;
      draftState.email = action.payload.email;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.associatedCompany = action.payload.associatedCompany;
      draftState.notes = action.payload.notes;
      draftState.tags = action.payload.tags;
      draftState.tasks = action.payload.tasks;
      break;

    // GET_PEOPLE
    case ActionTypes.PERSON.GET_PEOPLE:
      draftState.people = action.payload.people;
      break;

    // FIND_PEOPLE
    case ActionTypes.PERSON.FIND_PEOPLE:
      draftState.people = action.payload.people;
      break;

    default:
      return draftState;
  }
}, initialState);

export default PersonReducer;
