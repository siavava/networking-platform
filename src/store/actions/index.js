/* eslint-disable no-console */
import axios from 'axios';

// const ROOT_URL = 'https://plushiedexapi.onrender.com/api';

// const ROOT_URL = 'https://api-goloco.onrender.com';
const ROOT_URL = 'http://localhost:9090';
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
  },
  PERSON: {
    CREATE_PERSON: 'CREATE_PERSON',
    GET_PEOPLE: 'GET_PEOPLE',
    GET_PERSON: 'GET_PERSON',
    DELETE_PERSON: 'DELETE_PERSON',
    UPDATE_PERSON: 'UPDATE_PERSON',
  },
  AUTH: {
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
  },
};

export function createCompany(companyParams) {
  return async (dispatch, navigate) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/companies`, companyParams, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.CREATE_COMPANY, payload: response.data });

      // navigate to new person's page
      navigate(`/companies/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };
}

export function getCompany(companyId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies/${companyId}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findCompanies(query) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies/find?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.FIND_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getCompanies() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteCompany(companyId) {
  return async (dispatch, navigate) => {
    try {
      await axios.delete(`${ROOT_URL}/api/companies/${companyId}`, { headers: { authorization: localStorage.getItem('token') } });

      // navigate to people page
      navigate('/companies');
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateCompany(updates) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/companies/${updates.id}`, updates, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.UPDATE_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
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
      await axios.post(`${ROOT_URL}/api/tasks${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getTasks() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/tasks${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.TASK.GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
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
      const result = await axios.get(`${ROOT_URL}/tasks/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.TASK.GET_TASK,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteTask(id) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/tasks/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } });
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
      await axios.put(`${ROOT_URL}/tasks/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.TASK.UPDATE_TASK,
        payload: fields,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedTasks(idString, associationType) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/tasks/?${associationType}=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.TASK.GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
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

  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/notes`, fields, { headers: { authorization: localStorage.getItem('token') } });
      console.log(response);
      dispatch({ type: ActionTypes.NOTE.CREATE_NOTE, payload: fields });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getNotes() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/notes`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NOTE.GET_NOTES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedNotes(idString, associationType) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/notes/?${associationType}=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NOTE.GET_NOTES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getNote(id) {
  return async (dispatch) => {
    // get
    try {
      const result = await axios.get(`${ROOT_URL}/api/notes/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.NOTE.GET_NOTE,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteNote(id) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/api/notes/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } });
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
      await axios.put(`${ROOT_URL}/api/notes/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.NOTE.UPDATE_NOTE,
        payload: fields,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createPerson(personParams) {
  return async (dispatch, navigate) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/people`, personParams, { headers: { authorization: localStorage.getItem('token') } });
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
      const response = await axios.get(`${ROOT_URL}/api/people/${personId}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedPeople(idString) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/?companies=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getPeople() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deletePerson(personId) {
  return async (dispatch, navigate) => {
    try {
      await axios.delete(`${ROOT_URL}/api/people/${personId}`, { headers: { authorization: localStorage.getItem('token') } });

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
      const response = await axios.put(`${ROOT_URL}/api/people/${updates.id}`, updates, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.UPDATE_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findPeople(query) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/find?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.FIND_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signup({
  firstName, lastName, email, password,
}) {
  return async (dispatch, navigate) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/signup`, {
        firstName, lastName, email, password,
      });
      dispatch({ type: ActionTypes.AUTH.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      navigate('/homepage');
    } catch (error) {
      console.error(error);
    }
  };
}

export function signin({
  email, password,
}) {
  return async (dispatch, navigate) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/signin`, {
        email, password,
      });
      dispatch({ type: ActionTypes.AUTH.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      navigate('/homepage');
    } catch (error) {
      console.error(error);
    }
  };
}

export function signout() {
  return async (dispatch, navigate) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.AUTH.DEAUTH_USER });
    navigate('/');
  };
}
