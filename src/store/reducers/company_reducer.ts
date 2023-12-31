/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
// eslint-disable-next-line import/no-extraneous-dependencies
import { produce } from 'immer';
import { ActionTypes } from '../actions';

export interface CompanyState {
  name?: string;
  website?: string;
  imageUrl?: string;
  linkedin?: string;
  emailDomain?: string;
  description?: string;
  location?: string;
  tags: string[];
  notes: string[];
  author?: string;
  associatedPeople: string[];
  companies: string[];
}

const initialState: CompanyState = {
  name: '',
  website: '',
  imageUrl: '',
  linkedin: '',
  emailDomain: '',
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
      draftState.emailDomain = action.payload.emailDomain;
      draftState.location = action.payload.location;
      draftState.tags = action.payload.tags;
      draftState.notes = action.payload.notes;
      draftState.author = action.payload.author;
      draftState.associatedPeople = action.payload.associatedPeople;
      return draftState;
      // GET_COMPANIES
    case ActionTypes.COMPANY.GET_COMPANIES:
      draftState.companies = action.payload;
      return draftState;
      // GET_COMPANY
    case ActionTypes.COMPANY.GET_COMPANY:
      draftState.name = action.payload.name;
      draftState.website = action.payload.website;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.linkedin = action.payload.linkedin;
      draftState.emailDomain = action.payload.emailDomain;
      draftState.description = action.payload.description;
      draftState.location = action.payload.location;
      draftState.tags = action.payload.tags;
      draftState.notes = action.payload.notes;
      draftState.author = action.payload.author;
      draftState.associatedPeople = action.payload.associatedPeople;
      draftState.companies = action.payload.companies;
      return draftState;
      // UPDATE_COMPANY
    case ActionTypes.COMPANY.UPDATE_COMPANY:
      draftState.name = action.payload.name;
      draftState.website = action.payload.website;
      draftState.imageUrl = action.payload.imageUrl;
      draftState.emailDomain = action.payload.emailDomain;
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
