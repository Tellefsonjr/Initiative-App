export const ADD = 'ADD_ENCOUNTER';
export const DELETE = 'DELETE_ENCOUNTER';
export const UPDATE = 'UPDATE_ENCOUNTER';

export const addEncounter = encounter => {
  return { type: ADD, encounterData: encounter }
};

export const deleteEncounter = encounterId => {
  return { type: DELETE, encounterId: encounterId }
};

export const updateEncounter = encounter => {
  return { type: UPDATE, encounterData: encounter }
};