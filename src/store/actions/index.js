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

export function createTask() {
  return {
    type: ActionTypes.TASK.CREATE_TASK,
    payload: null,
  };
}

export function getTasks() {
  return {
    type: ActionTypes.TASK.GET_TASKS,
    payload: null,
  };
}

export function findTasks() {
  return {
    type: ActionTypes.TASK.FIND_TASKS,
    payload: null,
  };
}

export function getTask() {
  return {
    type: ActionTypes.TASK.GET_TASK,
    payload: null,
  };
}

export function deleteTask() {
  return {
    type: ActionTypes.TASK.DELETE_TASK,
  };
}

export function updateTask() {
  return {
    type: ActionTypes.TASK.UPDATE_TASK,
    payload: null,
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
