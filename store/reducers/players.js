import PLAYERS from '../../data/dummy-player-data';
import { GET, ADD, DELETE } from '../actions/players';

const initialState = {
  // players: [],
  // filteredPlayers: [],
  // orderedPlayers: [],
  players: PLAYERS,
  filteredPlayers: PLAYERS,
  orderedPlayers: PLAYERS
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredPlayers: state.players.filter(
    //     return {(o) => action.playerIds.includes(o.id);}
    //   )};
    case ADD:
      const newPlayer = new Player(
        new Date().toString(),
        action.playerData.name,
        action.playerData.initiativeBonus,
        action.playerData.initiative,
      );
      return { ...state, players: state.players.concat( newPlayer ) };
    case DELETE:
      return { ...state, players: state.players.filter((player) => player.id !== action.playerId ) }

  };
  return state;
}

export default playersReducer;
