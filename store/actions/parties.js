export const GET = 'GET_PARTIES';
export const ADD = 'ADD_PARTY';
export const DELETE = 'DELETE_PARTY';

export const getParty = partyIds => {
  return { type: GET, partyIds: partyIds }
};

export const addParty = party => {
  return { type: ADD, partyData: party }
};

export const deleteParty = partyId => {
  return { type: DELETE, partyId: partyId }
};
