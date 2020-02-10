export const GET = 'GET_MONSTERS';
export const ADD = 'ADD_MONSTER';
export const DELETE = 'DELETE_MONSTER';

export const getMonsters = monsterIds => {
  return { type: GET, monsterIds: monsterIds }
};

export const addMonster = monster => {
  return { type: ADD, monsterData: monster }
};

export const deleteMonster = monsterId => {
  return { type: DELETE, monsterId: monsterId }
};
