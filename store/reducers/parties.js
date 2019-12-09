import PARTIES from '../../data/dummy-party-data';
import { GET, ADD, DELETE } from '../actions/parties';

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
        new Date().toString(),
        action.partyData.title,
        action.partyData.parties,
      );
      return { ...state, parties: state.parties.concat( newParty ) };
    case DELETE:
      return { ...state, parties: state.parties.filter((party) => party.id !== action.partyId ) }

  };
  return state;
}

export default partiesReducer;
