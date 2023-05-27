/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  name: '',
  title: '',
  imageUrl: '',
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
      draftState.imageUrl = action.payload.imageUrl;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.associatedCompany = action.payload.associatedCompany;
      draftState.notes = action.payload.notes;
      draftState.tags = action.payload.tags;
      draftState.tasks = action.payload.tasks;
      return draftState;

    case ActionTypes.PERSON.GET_PERSON:
      console.log(action.payload);
      draftState.name = action.payload.name;
      draftState.title = action.payload.title;
      draftState.email = action.payload.email;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.location = action.payload.location;
      draftState.associatedCompany = action.payload.associatedCompany;
      draftState.notes = action.payload.notes;
      draftState.tags = action.payload.tags;
      draftState.tasks = action.payload.tasks;
      return draftState;

    // UPDATE_PERSON
    case ActionTypes.PERSON.UPDATE_PERSON:
      draftState.name = action.payload.name;
      draftState.title = action.payload.title;
      draftState.email = action.payload.email;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.associatedCompany = action.payload.associatedCompany;
      draftState.notes = action.payload.notes;
      draftState.tags = action.payload.tags;
      draftState.tasks = action.payload.tasks;
      return draftState;

    // GET_PEOPLE
    case ActionTypes.PERSON.GET_PEOPLE:
      draftState.people = action.payload;
      break;

    default:
      return draftState;
  }
}, initialState);

export default PersonReducer;
