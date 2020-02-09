/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Chip, Avatar, Searchbar, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import DynamicForm from '../DynamicForm';


const PlayerSelect = props => {
  const [ players, setPlayers ] = useState( useSelector(state => state.players.players) );
  const [ query, setQuery ] = useState('');
  const [ toggleDialog, setToggleDialog ] = useState(false);
  const [ selectedPlayers, setSelectedPlayers ] = useState(props.players);
  const [ filteredPlayers, setFilteredPlayers ] = useState( players );
  // console.log("PARTIIIIESSSSSUHH: ", players);
  const handleSubmit = (selectedPlayers) => {
    console.log("Subbmitting players: ", selectedPlayers);
    props.handleSubmit(selectedPlayers)
  };
  const addPlayer = (playerId) => {
    setSelectedPlayers( selectedPlayers.concat(playerId) );
  }
  const removePlayer = (playerId) => {
    setSelectedPlayers( selectedPlayers.filter((selected) => selected.id !== playerId ) );
  }
  const handleClearParty = () => {
    setSelectedParty('');
  };
  const searchByName = (query) => {
    setQuery(query);
    setFilteredPlayers(players.filter( player => player.name.indexOf(query) > -1));
  }
  const showDialog = () => {
    console.log("showing!");
    setToggleDialog(true);
  }
  const hideDialog = () => {
    setToggleDialog(false);
  }
  const fields = [
    {label: 'Select Players', type: 'multi-select', name: 'selectedPlayers', data: players,},
  ];
  return (
      <View style={ styles.container }>
            <View style={ styles.playerListContainer }>
              <View style={ styles.searchBarContainer }>
                <Searchbar
                style={ styles.searchBar }
                placeholder="Search by name"
                onChangeText={query => { searchByName(query) }}
                value={query}
                />
              </View>
              <ScrollView>
              {
                (players.length) == 0 ? (
                    <View>
                      <Text> Looks like you haven't made any players yet. </Text>
                      <Text> Click add new player to begin setting one up! </Text>
                    </View>
                  )
                  :
                  (
                    filteredPlayers.map( player => {
                      console.log("SELECTED PLAYERS", selectedPlayers);
                      const isSelected = selectedPlayers.find( p => p.id == player.id);

                      return(
                        <View>
                        <Chip
                        key={player.id}
                        avatar={
                          <Avatar.Image
                            style={ styles.avatar }
                            size={25}
                            source={require("../../assets/images/whtenemy.png")} />
                          }
                        accessibilityLabel={`player: ${player.name}+selected: ${isSelected}`}
                        style={ styles.playerChip }
                        textStyle={ styles.chipText }
                        selected={isSelected}
                        onPress={() => { isSelected? removePlayer(player.id) : addPlayer(player.id) }}
                        onLongPress={() => { showDialog() }}
                        >
                        <Text style={ styles.playerName }> {player.name} </Text>
                        <Text style={ styles.playerStatsText }> {player.className} </Text>
                        <Text style={ styles.playerStatsText }> Level {player.level} </Text>
                      </Chip>
                      <Portal>
                        <Dialog
                        visible={ toggleDialog }
                        onDismiss={ hideDialog }>
                          <Dialog.Title style={ styles.dialogHeaderWrapper }>
                            <Text style={ styles.dialogueHeader }> { player.name } </Text>
                            <Text style={ styles.dialogueSubHeader }> { player.className }</Text>
                            <Text style={ styles.dialogueSubHeader }> Level { player.level }</Text>
                          </Dialog.Title>
                          <Dialog.Content style={ styles.dialogContentWrapper }>
                            <View style={ styles.contentGroup }>
                              <View style={ styles.contentSubGroup }>
                                <Text style={{ fontWeight: 'bold'}}>Health:</Text>
                                <Text> {player.hp} </Text>
                              </View>
                              <View style={ styles.contentSubGroup }>
                                <Text style={{ fontWeight: 'bold'}}>Initiative Bonus:</Text>
                                <Text> {player.initiativeBonus} </Text>
                              </View>
                              <View style={ styles.contentSubGroup }>
                                <Text style={{ fontWeight: 'bold'}}>Armor Class:</Text>
                                <Text> 15 </Text>
                              </View>
                            </View>
                          </Dialog.Content>
                          <Dialog.Actions>
                            <Button onPress={hideDialog} color="#00578A">Dismiss</Button>
                          </Dialog.Actions>
                        </Dialog>
                      </Portal>
                      </View>
                      )})
                  )
              }
              </ScrollView>
              <View style={styles.buttonContainer}>
                <Button onPress={() => {handleCancel} } style={styles.button}
                icon="cancel"
                mode="contained"
                title="Cancel"
                color="rgba(255, 61, 0, .5)">
                Cancel
                </Button>
                <Button onPress={() => {handleSubmit(selectedPlayers)}}
                  icon="check-circle-outline"
                  mode="contained"
                  color="#00578A">
                  Save party
                </Button>
              </View>
              </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  searchBarContainer: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 30,
  },
  playerListContainer: {
    height: '90%'
  },
  playerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 25,
    height: 25,
    borderWidth: 1,
  },
  chipContainer: {
    width: '100%',

  },
  playerChip: {
    height: 35,
    width: '100%',
    marginBottom: 5,
    padding: 0,
  },
  chipText: {

  },
  dialogHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dialogHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  dialogueSubHeader: {
    fontSize: 18,
    color: 'rgb(77, 77, 77)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(77, 77, 77)',
  },
  dialogContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSubGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerName: {
    fontWeight: 'bold',
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  playerStatText: {
    marginRight: 5,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  button: {
    width: '30%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});



 export default PlayerSelect;
