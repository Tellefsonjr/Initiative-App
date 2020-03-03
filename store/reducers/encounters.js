import undoable, { includeAction } from 'redux-undo';
import ENCOUNTERS from '../../data/dummy-encounter-data';
import { ADD, DELETE, UPDATE, DELETE_PLAYER } from '../actions/encounters';
import Encounter from '../../models/encounter';
import * as _ from 'lodash';

const initialState = {
  // encounters: [],
  // filteredEncounters: [],
  encounters: ENCOUNTERS,
  filteredEncounters: ENCOUNTERS,
  selectedEncounter: ENCOUNTERS[0],
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
        action.encounterData.partyId,
        action.encounterData.monsters,
        action.encounterData.allies,
        action.encounterData.settings,
        action.encounterData.active,
        action.encounterData.state,
        action.encounterData.combatants,
      );
      return { ...state, encounters: state.encounters.concat( newEncounter ) };
    case DELETE:
      return { ...state, encounters: state.encounters.filter((encounter) => encounter.id !== action.encounterId ) };
    case UPDATE:
      console.log("Updating Redux State: ", action.encounterData.state);
      const encounterIndex = state.encounters.findIndex( enc => enc.id === action.encounterData.id);
      const updatedEncounter = new Encounter(
        action.encounterData.id,
        action.encounterData.title,
        action.encounterData.campaign,
        action.encounterData.description,
        action.encounterData.difficulty,
        action.encounterData.partyId,
        action.encounterData.monsters,
        action.encounterData.allies,
        action.encounterData.settings,
        action.encounterData.active,
        action.encounterData.state,
        action.encounterData.combatants,
      );
      let updatedEncounters = [...state.encounters];
      updatedEncounters[encounterIndex] = updatedEncounter;
      return {
        ...state,
        encounters: updatedEncounters,
      };
      case DELETE_PLAYER:
        let updatedEncountersWithoutPlayer = [];
        state.encounters.forEach( encounter => {
          if(_.includes(encounter.combatants, ['refId', action.playerId])){
            encounter.combatants = _.pull(encounter.combatants, ['refId', action.playerId]);
            updatedEncountersWithoutPlayer.push(encounter);
          } else {
            updatedEncountersWithoutPlayer.push(encounter);
          }
        });
        return {
          ...state,
          encounters: updatedEncountersWithoutPlayer,
        };
      };
      return state;
    };


const undoableEncountersReducer = undoable(encountersReducer, {
  filter: includeAction(UPDATE)
});

export default undoableEncountersReducer;
