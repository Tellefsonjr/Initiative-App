import ENCOUNTERS from '../../data/dummy-encounter-data';
import { ADD, DELETE, UPDATE } from '../actions/encounters';
import Encounter from '../../models/encounter';

const initialState = {
  // encounters: [],
  // filteredEncounters: [],
  encounters: ENCOUNTERS,
  filteredEncounters: ENCOUNTERS,
};

const encountersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const newEncounter = new Encounter(
        new Date().toString(),
        action.encounterData.title,
        action.encounterData.campaign,
        action.encounterData.description,
        action.encounterData.party,
        action.encounterData.enemies,
        action.encounterData.allies
      );
      return { ...state, encounters: state.encounters.concat( newEncounter ) };
    case DELETE:
      return { ...state, encounters: state.encounters.filter((encounter) => encounter.id !== action.encounterId ) };
    case UPDATE:

      return {
        ...state,
        encounters: state.encounters.map( encounter => encounter.id === action.encounterData.id ?
          action.encounterData :
          encounter
        )
      }
  };
  return state;
};

export default encountersReducer;
