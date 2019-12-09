import { USERS } from '../../data/dummy-user-data';

const initialState = {
  users: USERS,
  orderedPlayers: USERS
};

const playersReducer = (state = initialState, action) => {

  return state;
}

export default usersReducer;
