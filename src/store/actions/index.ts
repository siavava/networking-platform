/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';

// const ROOT_URL = 'https://plushiedexapi.onrender.com/api';

export const ROOT_URL = 'https://api-goloco.onrender.com';
// export const ROOT_URL = 'http://localhost:9090';

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
    GET_EMAILS: 'GET_EMAILS',
  },
  AUTH: {
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
  },
};

export function createCompany(companyParams: any) {
  return async (dispatch: any, navigate: any) => {
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

export function getCompany(companyId: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies/${companyId}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findCompanies(query: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies/find?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.FIND_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getCompanies() {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function searchCompanies(query: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/companies?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.GET_COMPANIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteCompany(companyId: string) {
  return async (dispatch: any, navigate: any) => {
    try {
      await axios.delete(`${ROOT_URL}/api/companies/${companyId}`, { headers: { authorization: localStorage.getItem('token') } });

      // navigate to people page
      navigate('/companies');
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateCompany(updates: any) {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/companies/${updates.id}`, updates, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.COMPANY.UPDATE_COMPANY, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createTask(taskFields: any, navigate: any) {
  const fields = {
    title: taskFields.title,
    description: taskFields.description,
    tags: taskFields.tags,
    dueDate: taskFields.dueDate,
    associatedCompany: taskFields.associatedCompany,
    associatedPerson: taskFields.associatedPerson,
  };

  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/tasks`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.TASK.CREATE_TASK, payload: response.data });

      // navigate(0);
    } catch (error) {
      console.error(error);
    }
  };
}

export function getTasks() {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/tasks`, { headers: { authorization: localStorage.getItem('token') } });
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

export function getTask(id: string) {
  return async (dispatch: any) => {
    // get
    try {
      const result = await axios.get(`${ROOT_URL}/api/tasks/${id}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.TASK.GET_TASK,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteTask(id: string) {
  return async () => {
    try {
      await axios.delete(`${ROOT_URL}/api/tasks/${id}`, { headers: { authorization: localStorage.getItem('token') } });
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateTask(id: string, taskFields: any) {
  const fields = {
    title: taskFields.title,
    description: taskFields.description,
    tags: taskFields.tags,
    dueDate: taskFields.dueDate,
    associatedCompany: taskFields.associatedCompany,
    associatedPerson: taskFields.associatedPerson,
  };

  return async (dispatch: any) => {
    try {
      const result = await axios.put(`${ROOT_URL}/api/tasks/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.TASK.UPDATE_TASK,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedTasks(idString: string, associationType: any) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/tasks/?${associationType}=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.TASK.GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createNote(noteFields: any) {
  const fields = {
    title: noteFields.title,
    content: noteFields.content,
    tags: noteFields.tags,
    associatedCompany: noteFields.associatedCompany,
    associatedPerson: noteFields.associatedPerson,
    author: noteFields.author,
  };

  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/notes`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NOTE.CREATE_NOTE, payload: fields });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getNotes() {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/notes`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NOTE.GET_NOTES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedNotes(idString: string, associationType: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/notes/?${associationType}=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NOTE.GET_NOTES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getNote(id: string) {
  return async (dispatch: any) => {
    // get
    try {
      const result = await axios.get(`${ROOT_URL}/api/notes/${id}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.NOTE.GET_NOTE,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteNote(id: string) {
  return async () => {
    // delete
    await axios.delete(`${ROOT_URL}/api/notes/${id}`, { headers: { authorization: localStorage.getItem('token') } });
  };
}

export function updateNote(id: string, noteFields: any) {
  const fields = {
    title: noteFields.title,
    content: noteFields.content,
    tags: noteFields.tags,
    associatedCompany: noteFields.associatedCompany,
    associatedPerson: noteFields.associatedPerson,
  };
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/notes/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({
        type: ActionTypes.NOTE.UPDATE_NOTE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createPerson(personParams: any) {
  return async (dispatch: any, navigate: any) => {
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

export function getPerson(personId: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/${personId}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAssociatedPeople(idString: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/?companies=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getPeopleById(idString: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/?id=${idString}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getPeople() {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function searchPeople(query: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deletePerson(personId: string) {
  return async (dispatch: any, navigate: any) => {
    try {
      await axios.delete(`${ROOT_URL}/api/people/${personId}`, { headers: { authorization: localStorage.getItem('token') } });

      // navigate to people page
      navigate('/people');
    } catch (error) {
      console.error(error);
    }
  };
}

export function updatePerson(personId: string, updatedFields: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/people/${personId}`, updatedFields, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.UPDATE_PERSON, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function findPeople(query: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/people/find?q=${query}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.PERSON.GET_PEOPLE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function authError(error: any) {
  return {
    type: ActionTypes.AUTH.AUTH_ERROR,
    message: error,
  };
}

export function signup({
  firstName, lastName, email, password,
}: { firstName: string, lastName: string, email: string, password: string }) {
  return async (dispatch: any, navigate: any) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/signup`, {
        firstName, lastName, email, password,
      });
      await localStorage.setItem('token', response.data.token);
      await localStorage.setItem('name', `${response.data.firstName} ${response.data.lastName}`);
      dispatch({ type: ActionTypes.AUTH.AUTH_USER, payload: response.data });
      navigate('/home');
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
}

export function signin({ email, password }: { email: string, password: string}) {
  return async (dispatch: any, navigate: any) => {
    try {
      const response = await axios.post(`${ROOT_URL}/api/signin`, {
        email, password,
      });
      dispatch({ type: ActionTypes.AUTH.AUTH_USER, payload: response.data });
      await localStorage.setItem('token', response.data.token);
      await localStorage.setItem('name', `${response.data.firstName} ${response.data.lastName}`);
      navigate('/home');
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
}

export function signout() {
  return async (dispatch: any, navigate: any) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    dispatch({ type: ActionTypes.AUTH.DEAUTH_USER });
    navigate('/');
  };
}

export function updateUser(fields: any) {
  return async (dispatch: any, navigate: any) => {
    try {
      const response = await axios.put(`${ROOT_URL}/api/users`, fields, { headers: { authorization: localStorage.getItem('token') } });
    } catch (error) {
      console.error(error);
    }
  };
}

export async function getPersonEmails(id: string) {
  // eslint-disable-next-line no-unused-vars
  try {
    const res = await axios.get(`${ROOT_URL}/api/emails?person=${id}`, { headers: { authorization: localStorage.getItem('token') } });
    return res.data;
  } catch (error: any) {
    console.error(error.response.data);
    return [error.response.data];
  }
}

export async function getCompanyEmails(id: string) {
  // eslint-disable-next-line no-unused-vars
  try {
    const res = await axios.get(`${ROOT_URL}/api/emails?company=${id}`, { headers: { authorization: localStorage.getItem('token') } });
    return res.data;
  } catch (error:any) {
    console.error(error.response.data);
    return [error.response.data];
  }
}
