import PARTIES from '../../data/dummy-party-data';
import { GET, ADD, DELETE, UPDATE, DELETE_PLAYER } from '../actions/parties';
import Party from '../../models/party';
import * as _ from 'lodash';

const initialState = {
  // parties: [],
  // filteredParties: [],
  // orderedParties: [],
  parties: PARTIES,
  filteredParties: PARTIES,
  orderedParties: PARTIES
};

const partiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredParties: state.parties.filter(
    //     return {(o) => action.partyIds.includes(o.id);}
    //   )};
    case ADD:
      const newParty = new Party(
        action.partyData.id,
        action.partyData.title,
        action.partyData.players,
      );
      return { ...state, parties: state.parties.concat( newParty ) };
      case UPDATE:
        console.log("Updating Redux State: ", action.partyData.players);
        const partyIndex = state.parties.findIndex( p => p.id === action.partyData.id);
        const updatedParty = new Party(
          action.partyData.id,
          action.partyData.title,
          action.partyData.players,
        );
        const updatedParties = [...state.parties];
        updatedParties[partyIndex] = updatedParty;
        return {
          ...state,
          parties: updatedParties,
        };
    case DELETE:
      return { ...state, parties: state.parties.filter((party) => party.id !== action.partyId ) }
    case DELETE_PLAYER:
      let updatedPartiesWithoutPlayer = [];
      state.parties.forEach( party => {
        if(_.includes(party.players, action.playerId)){
          party.players = _.pull(party.players, action.playerId);
          updatedPartiesWithoutPlayer.push(party);
        } else {
          updatedPartiesWithoutPlayer.push(party);
        }
      });
      return {
        ...state,
        parties: updatedPartiesWithoutPlayer,
      };
  };
  return state;
}

export default partiesReducer;
