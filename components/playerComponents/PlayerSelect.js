/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PlayerList from './PlayerList';


const PlayerSelect = props => {
  const players = useSelector(state => state.players.players);

  const [ selectedPlayers, setSelectedPlayers ] = useState(props.players);
  // console.log("PARTIIIIESSSSSUHH: ", players);
  const handlePress = (playerId) => {
    console.log("PROPS: ", props);
    console.log("CLICKED", playerId);
    setSelectedPlayers([...selectedPlayers, playerId]);
    console.log("SELECTED PLAYERS", selectedPlayers);

  };
  const handleClearParty = () => {
    setSelectedParty('');
  };

  return (
      <View style={ styles.container }>
            <View style={ styles.playerListContainer }>
              {
                (players.length) == 0 ? (
                    <View>
                      <Text> Looks like you haven't made any players yet. </Text>
                      <Text> Click add new player to begin setting one up! </Text>
                    </View>
                  )
                  :
                  (
                    <PlayerList
                      players={ players }
                      removePlayerHandler={ handlePress }
                      handlePress={ handlePress }
                      selectable={ true }
                      selectedIds={ selectedPlayers }
                    />
                  )
              }
              </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  titleText: {
    color: "black",
  },
  titleCountText: {
    color: "black",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerListContainer: {
    height: '90%'
  },
  playerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: '50%'
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
  },
});



 export default PlayerSelect;
