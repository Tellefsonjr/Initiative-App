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
        action.encounterData.id,
        action.encounterData.title,
        action.encounterData.campaign,
        action.encounterData.description,
        action.encounterData.difficulty,
        action.encounterData.party,
        action.encounterData.monsters,
        action.encounterData.allies

      );
      return { ...state, encounters: state.encounters.concat( newEncounter ) };
    case DELETE:
      return { ...state, encounters: state.encounters.filter((encounter) => encounter.id !== action.encounterId ) };
    case UPDATE:
      const encounterIndex = state.encounters.findIndex( enc => enc.id === action.encounterData.id);
      const updatedEncounter = new Encounter(
        action.encounterData.id,
        action.encounterData.title,
        action.encounterData.campaign,
        action.encounterData.description,
        action.encounterData.difficulty,
        action.encounterData.party,
        action.encounterData.monsters,
        action.encounterData.allies
      );
      const updatedEncounters = [...state.encounters];
      updatedEncounters[encounterIndex] = updatedEncounter;
      return {
        ...state,
        encounters: updatedEncounters,
      };
    };
  return state;

}

export default encountersReducer;
