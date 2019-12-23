/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FormButton from '../FormButton';
import PlayerList from './PlayerList';


const PartySelect = props => {
  const players = useSelector(state => state.players.players);

  const [ toggleListView, setToggleListView ] = useState(true);
  const [ toggleAddView, setToggleAddView ] = useState(false);

  const [ selectedPlayers, setSelectedPlayers ] = useState([]);
  // console.log("PARTIIIIESSSSSUHH: ", players);
  const handlePress = (playerId) => {
    console.log("PROPS: ", props);
    console.log("CLICKED", playerId);
    setSelectedPlayers([...selectedPlayers, playerId]);
    props.onChangeValue(selectedPlayers);
    console.log("SELECTED PLAYERS", selectedPlayers);

  };
  const handleClearParty = () => {
    console.log("CLEARING");
    setSelectedParty('');
  };
  const handleTogglePress = (string) => {
    console.log("toggling");
      if(string == "add") {
        setToggleAddView(true);
        setToggleListView(false);
      } else {
        setToggleListView(true);
        setToggleAddView(false);
      }
  };
  return (
      <View style={ styles.container }>
            <View style={ styles.playerListContainer }>
              <View style={ styles.buttonContainer }>
                <View style={ styles.button }>
                  <FormButton icon="view-list" text="Player list" iconPosition="left" color={ toggleListView? '#00578A' : 'rgba(0, 87, 138, 0.8)'  } onPress={ () => handleTogglePress("list") } />
                </View>
                <View style={ styles.button }>
                  <FormButton icon="plus" text="Add new player" iconPosition="left" color={ toggleAddView? '#00578A' : 'rgba(0, 87, 138, 0.8)' } onPress={ () => handleTogglePress("add") } />
                </View>
              </View>
              {
                toggleListView?
                ((players.length) == 0 ? (
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
                  ))
                 :
                (<Text> Hihihi </Text>)
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



 export default PartySelect;
