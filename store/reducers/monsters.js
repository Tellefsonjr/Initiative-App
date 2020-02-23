import MONSTERS from '../../data/dummy-monster-data';
import { GET, ADD, DELETE } from '../actions/monsters';
import Monster from '../../models/monster';

const initialState = {
  // monsters: [],
  // filteredMonsters: [],
  // orderedMonsters: [],
  monsters: MONSTERS,
  filteredMonsters: MONSTERS,
  orderedMonsters: MONSTERS
};

const monstersReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredMonsters: state.monsters.filter(
    //     return {(o) => action.monsterIds.includes(o.id);}
    //   )};
    case ADD:
      const newMonster = new Monster(
        action.monsterData.id,
        action.monsterData.name,
        action.monsterData.type,
        action.monsterData.cr,
        action.monsterData.maxHp,
        action.monsterData.hp,
        action.monsterData.ac,
        action.monsterData.initiativeBonus,
        action.monsterData.initiative,
      );
      return { ...state, monsters: state.monsters.concat( newMonster ) };
    case DELETE:
      return { ...state, monsters: state.monsters.filter((monster) => monster.id !== action.monsterId ) }

  };
  return state;
}

export default monstersReducer;
