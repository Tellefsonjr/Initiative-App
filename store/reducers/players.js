import PLAYERS from '../../data/dummy-player-data';
import { GET, ADD, DELETE, UPDATE, } from '../actions/players';
import Player from '../../models/player';

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
        action.playerData.id,
        action.playerData.avatar,
        action.playerData.name,
        action.playerData.race,
        action.playerData.className,
        action.playerData.stats,
      );
      return { ...state, players: state.players.concat( newPlayer ) };
    case UPDATE:
        const playerIndex = state.players.findIndex( player => player.id == action.playerData.id);
        const updatedPlayer = new Player(
          action.playerData.id,
          action.playerData.avatar,
          action.playerData.name,
          action.playerData.race,
          action.playerData.className,
          action.playerData.stats,
        );
        const updatedPlayers = [ ...state.players ];
        updatedPlayers[playerIndex] = updatedPlayer;
        return {
          ...state,
          players: updatedPlayers,
        }
    case DELETE:
    console.log("Deleteing in reducer: ", action.playerId);
      return { ...state, players: state.players.filter((player) => player.id !== action.playerId ) }
  };
  return state;
}

export default playersReducer;
