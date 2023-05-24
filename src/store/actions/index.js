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
    ADD_TO_ASSCIATED_COMPANY: 'ADD_TO_ASSOCIATED_COMPANY',
    DELETE_FROM_EXISTING_ASSOCOATED_COMPANY: 'DELETE_FROM_EXISTING_ASSOCIATED_COMPANY',
  },
};

export function createCompany(companyParams) {
  return async (dispatch, navigate) => {
    try {
      // check that response is correct
      const response = await axios.post(`${ROOT_URL}/api/${API_KEY}/company`, companyParams);
      dispatch({ type: ActionTypes.COMPANY.CREATE_COMPANY, payload: response.data });

      // navigate to new company page
      navigate(`/company/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCompany(companyId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/${API_KEY}/company/${companyId}`);
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findCompanies(query) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/${API_KEY}/company/find?q=${query}`);
      dispatch({ type: ActionTypes.COMPANY.FIND_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getCompanies() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/company${API_KEY}`);
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteCompany(companyId) {
  return async (dispatch, navigate) => {
    try {
      await axios.delete(`${ROOT_URL}/api/${API_KEY}/company/${companyId}`);

      // navigate to people page
      navigate('/company');
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateCompany(updates) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/${API_KEY}/company/${updates.id}`, updates);
      dispatch({ type: ActionTypes.COMPANY.UPDATE_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createTask(taskFields, navigate) {
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
      navigate('/user/user1'); // navigate to Posts page
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

export function deleteTask(id, navigate) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);
    navigate('/user/user'); // navigate to Posts page
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
      await axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields);
      dispatch({
        type: ActionTypes.TASK.UPDATE_TASK,
        payload: fields,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createNote() {
  return {
    type: ActionTypes.TASK.CREATE_NOTE,
    payload: null,
  };
}

export function getNote() {
  return {
    type: ActionTypes.GET_NOTE,
    payload: null,
  };
}

export function deleteNote() {
  return {
    type: ActionTypes.DELETE_NOTE,
    payload: null,
  };
}

export function updateNote() {
  return {
    type: ActionTypes.UPDATE_NOTE,
    payload: null,
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

export function createPerson() {
  return {
    type: ActionTypes.CREATE_PERSON,
    payload: null,
  };
}

export function getPeople() {
  return {
    type: ActionTypes.GET_PEOPLE,
    payload: null,
  };
}

export function deletePerson() {
  return {
    type: ActionTypes.DELETE_PERSON,
    payload: null,
  };
}

export function updatePerson() {
  return {
    type: ActionTypes.UPDATE_PERSON,
    payload: null,
  };
}

export function persondDeleteFromExistingAssociatedCompany() {
  return {
    type: ActionTypes.DELETE_FROM_EXISTING_ASSOCIATED_COMPANY,
    payload: null,
  };
}
