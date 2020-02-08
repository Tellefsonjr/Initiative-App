import ENCOUNTERS from '../../data/dummy-encounter-data';
import { ADD, DELETE, UPDATE, UPDATE_PLAYERS } from '../actions/encounters';
import Encounter from '../../models/encounter';
import Party from '../../models/party';

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
        action.encounterData.enemies,
        action.encounterData.allies

      );
      return { ...state, encounters: state.encounters.concat( newEncounter ) };
    case DELETE:
      return { ...state, encounters: state.encounters.filter((encounter) => encounter.id !== action.encounterId ) };
    case UPDATE:
      const updatedEncounter = action.encounterData;
      return {
        ...state,
        encounters: state.encounters.map( encounter => encounter.id === action.encounterData.id ?
          updatedEncounter :
          encounter
        )
      }
    case UPDATE_PLAYERS:

      return {
        ...state,
        encounters: state.encounters.map( encounter => encounter.id === action.encounterData.id ?
          encounter.players = action.encounterPlayers  :
          encounter
        )
      }
  };
  return state;
};

export default encountersReducer;
