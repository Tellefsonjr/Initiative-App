export const GET = 'GET_PARTIES';
export const ADD = 'ADD_PARTY';
export const DELETE = 'DELETE_PARTY';
export const UPDATE = 'UPDATE_PARTY';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export const getParty = partyIds => {
  return { type: GET, partyIds: partyIds }
};

export const addParty = party => {
  return { type: ADD, partyData: party }
};

export const updateParty = party => {
  return { type: UPDATE, partyData: party }
};

export const deleteParty = partyId => {
  return { type: DELETE, partyId: partyId }
};
export const deletePlayer = playerId => {
  return { type: DELETE_PLAYER, playerId: playerId }
};
