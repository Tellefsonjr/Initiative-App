export const ADD = 'ADD_ENCOUNTER';
export const DELETE = 'DELETE_ENCOUNTER';
export const UPDATE = 'UPDATE_ENCOUNTER';
export const UNDO = 'UNDO_ENCOUNTER_ACTION';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export const addEncounter = encounter => {
  return { type: ADD, encounterData: encounter }
};

export const deleteEncounter = encounterId => {
  return { type: DELETE, encounterId: encounterId }
};

export const updateEncounter = encounter => {
  return { type: UPDATE, encounterData: encounter }
};
export const undoEncounter = encounter => {
  return { type: UNDO, encounterData: encounter }
};
export const deletePlayer = playerId => {
  return { type: DELETE_PLAYER, playerId: playerId }
};
