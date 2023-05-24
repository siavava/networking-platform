/* eslint-disable no-console */
import axios from 'axios';

const ROOT_URL = 'https://plushiedexapi.onrender.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';

// keys for actiontypes
export const ActionTypes = {
  COMPANY: {
    CREATE_COMPANY: 'CREATE_COMPANY',
    GET_COMPANIES: 'GET_COMPANIES',
    FIND_COMPANIES: 'FIND_COMPANIES',
    GET_COMPANY: 'GET_COMPANY',
    DELETE_COMPANY: 'DELETE_COMPANY',
    UPDATE_COMPANY: 'UPDATE_COMPANY',
  },
  TASK: {
    CREATE_TASK: 'CREATE_TASK',
    GET_TASKS: 'GET_TASKS',
    FIND_TASKS: 'FIND_TASKS',
    GET_TASK: 'GET_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
  },
  NOTE: {
    CREATE_NOTE: 'CREATE_NOTE',
    GET_NOTES: 'GET_NOTES',
    FIND_NOTES: 'FIND_NOTES',
    GET_NOTE: 'GET_NOTE',
    DELETE_NOTE: 'DELETE_NOTE',
    UPDATE_NOTE: 'UPDATE_NOTE',
    ADD_TO_ASSOCIATED_COMPANY: 'ADD_TO_ASSOCIATED_COMPANY',
    DELETE_FROM_EXISTING_ASSOCIATED_COMPANY: 'DELETE_FROM_EXISTING_ASSOCIATED_COMPANY',
    ADD_TO_ASSOCIATED_PERSON: 'ADD_TO_ASSOCIATED_PERSON',
    DELETE_FROM_EXISTING_ASSOCIATED_PERSON: 'DELETE_FROM_EXISTING_ASSOCIATED_PERSON',
  },
  PERSON: {
    CREATE_PERSON: 'CREATE_PERSON',
    GET_PEOPLE: 'GET_PEOPLE',
    FIND_PEOPLE: 'FIND_PEOPLE',
    GET_PERSON: 'GET_PERSON',
    DELETE_PERSON: 'DELETE_PERSON',
    UPDATE_PERSON: 'UPDATE_PERSON',
  },
};

export function createCompany() {
  return {
    type: ActionTypes.COMPANY.CREATE_COMPANY,
    payload: null,
  };
}

export function getCompany() {
  return {
    type: ActionTypes.COMPANY.GET_COMPANY,
    payload: null,
  };
}

export function findCompanies() {
  return {
    type: ActionTypes.COMPANY.FIND_COMPANIES,
    payload: null,
  };
}

export function getCompanies() {
  return {
    type: ActionTypes.COMPANY.GET_COMPANIES,
    payload: null,
  };
}

export function deleteCompany() {
  return {
    type: ActionTypes.COMPANY.DELETE_COMPANY,
    payload: null,
  };
}

export function updateCompany() {
  return {
    type: ActionTypes.COMPANY.UPDATE_COMPANY,
    payload: null,
  };
}

export function createTask(taskFields) {
  const fields = {
    title: taskFields.title,
    description: taskFields.description,
    tags: taskFields.tags,
    dueDate: taskFields.dueDate,
    associatedCompany: taskFields.associatedCompany,
    associatedPerson: taskFields.associatedPerson,
  };

  return async () => {
    try {
      await axios.post(`${ROOT_URL}/tasks${API_KEY}`, fields);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTasks() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/tasks${API_KEY}`);
      dispatch({ type: ActionTypes.TASK.GET_TASKS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

// not done yet
export function findTasks() {
  return {
    type: ActionTypes.TASK.FIND_TASKS,
    payload: null,
  };
}

export function getTask(id) {
  return async (dispatch) => {
    // get
    try {
      const result = await axios.get(`${ROOT_URL}/tasks/${id}${API_KEY}`);
      dispatch({
        type: ActionTypes.TASK.GET_TASK,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteTask(id) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/tasks/${id}${API_KEY}`);
  };
}

export function updateTask(taskFields, id) {
  const fields = {
    title: taskFields.title,
    description: taskFields.description,
    tags: taskFields.tags,
    dueDate: taskFields.dueDate,
    associatedCompany: taskFields.associatedCompany,
    associatedPerson: taskFields.associatedPerson,
  };

  return async (dispatch) => {
    try {
      await axios.put(`${ROOT_URL}/tasks/${id}${API_KEY}`, fields);
      dispatch({
        type: ActionTypes.TASK.UPDATE_TASK,
        payload: fields,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createNote(noteFields) {
  const fields = {
    title: noteFields.title,
    content: noteFields.content,
    tags: noteFields.tags,
    associatedCompany: noteFields.associatedCompany,
    associatedPerson: noteFields.associatedPerson,
    author: noteFields.author,
  };

  return async () => {
    try {
      await axios.post(`${ROOT_URL}/notes/${API_KEY}`, fields);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNotes() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/notes/${API_KEY}`);
      dispatch({ type: ActionTypes.NOTE.GET_NOTES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNote(id) {
  return async (dispatch) => {
    // get
    try {
      const result = await axios.get(`${ROOT_URL}/notes/${id}${API_KEY}`);
      dispatch({
        type: ActionTypes.NOTE.GET_NOTE,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteNote(id) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/notes/${id}${API_KEY}`);
  };
}

export function updateNote(noteFields, id) {
  const fields = {
    title: noteFields.title,
    content: noteFields.content,
    tags: noteFields.tags,
    associatedCompany: noteFields.associatedCompany,
    associatedPerson: noteFields.associatedPerson,
    author: noteFields.author,
  };

  return async (dispatch) => {
    try {
      await axios.put(`${ROOT_URL}/notes/${id}${API_KEY}`, fields);
      dispatch({
        type: ActionTypes.NOTE.UPDATE_NOTE,
        payload: fields,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addToAssocitedCompany() {
  return {
    type: ActionTypes.ADD_TO_ASSCIATED_COMPANY,
    payload: null,
  };
}

export function deleteFromExistingAssociatedCompany() {
  return {
    type: ActionTypes.DELETE_FROM_EXISTING_ASSOCIATED_COMPANY,
    payload: null,
  };
}

export function addToAssociatedPerson() {
  return {
    type: ActionTypes.ADD_TO_ASSOCIATED_PERSON,
    payload: null,
  };
}

export function deleteFromExistingAssociatedPerson() {
  return {
    type: ActionTypes.DELETE_FROM_EXISTING_ASSOCIATED_PERSON,
    payload: null,
  };
}

export function createPerson(personParams) {
  return async (dispatch, navigate) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/${API_KEY}/people`, personParams);
      dispatch({ type: ActionTypes.PERSON.CREATE_PERSON, payload: response.data });

      // navigate to new person's page
      navigate(`/people/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };
}

export function getPerson(personId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/${API_KEY}/people/${personId}`);
      dispatch({ type: ActionTypes.PERSON.GET_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getPeople() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/people${API_KEY}`);
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deletePerson(personId) {
  return async (dispatch, navigate) => {
    try {
      await axios.delete(`${ROOT_URL}/api/${API_KEY}/people/${personId}`);

      // navigate to people page
      navigate('/people');
    } catch (error) {
      console.error(error);
    }
  };
}

export function updatePerson(updates) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/${API_KEY}/people/${updates.id}`, updates);
      dispatch({ type: ActionTypes.PERSON.UPDATE_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findPeople(query) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/${API_KEY}/people/find?q=${query}`);
      dispatch({ type: ActionTypes.PERSON.FIND_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function persondDeleteFromExistingAssociatedCompany() {
  return {
    type: ActionTypes.DELETE_FROM_EXISTING_ASSOCIATED_COMPANY,
    payload: null,
  };
}
