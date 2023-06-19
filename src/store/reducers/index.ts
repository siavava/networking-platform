// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

import UserReducer from './user_reducer';
import CompanyReducer from './company_reducer';
import TaskReducer from './task_reducer';
import NoteReducer from './note_reducer';
import PersonReducer from './person_reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  company: CompanyReducer,
  task: TaskReducer,
  note: NoteReducer,
  person: PersonReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
