export const GET = 'GET_PLAYERS';
export const ADD = 'ADD_PLAYER';
export const UPDATE = 'UPDATE_PLAYER';
export const DELETE = 'DELETE_PLAYER';

export const getPlayers = playerIds => {
  return { type: GET, playerIds: playerIds }
};

export const addPlayer = player => {
  return { type: ADD, playerData: player }
};
export const updatePlayer = player => {
  return { type: UPDATE, playerData: player }
};
export const deletePlayer = playerId => {
  return { type: DELETE, playerId: playerId }
};
