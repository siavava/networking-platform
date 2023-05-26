/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
// eslint-disable-next-line import/no-extraneous-dependencies
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  name: '',
  website: '',
  imageUrl: '',
  linkedin: '',
  description: '',
  location: '',
  tags: [],
  notes: [],
  author: '',
  associatedPeople: [],
  companies: [],
};

const CompanyReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    // CREATE_COMPANY
    case ActionTypes.COMPANY.CREATE_COMPANY:
      draftState.name = action.payload.name;
      draftState.website = action.payload.website;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.tags = action.payload.tags;
      draftState.notes = action.payload.notes;
      draftState.author = action.payload.author;
      draftState.associatedPeople = action.payload.associatedPeople;
      return draftState;
      // GET_COMPANIES
    case ActionTypes.COMPANY.GET_COMPANIES:
      draftState.companies = action.payload;
      console.log(draftState.companies);
      return draftState;
      // GET_COMPANY
    case ActionTypes.COMPANY.GET_COMPANY:
      draftState.name = action.payload.name;
      draftState.website = action.payload.website;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.tags = action.payload.tags;
      draftState.notes = action.payload.notes;
      draftState.author = action.payload.author;
      draftState.associatedPeople = action.payload.associatedPeolpe;
      draftState.companies = action.payload.companies;
      return draftState;
      // UPDATE_COMPANY
    case ActionTypes.COMPANY.UPDATE_COMPANY:
      draftState.name = action.payload.name;
      draftState.website = action.payload.website;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.linkedin = action.payload.linkedin;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.tags = action.payload.tags;
      draftState.notes = action.payload.notes;
      draftState.author = action.payload.author;
      draftState.associatedPeople = action.payload.associatedPeople;
      return draftState;
    default:
      return draftState;
  }
}, initialState);

export default CompanyReducer;
