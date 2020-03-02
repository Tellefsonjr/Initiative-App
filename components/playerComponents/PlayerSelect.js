/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, FlatList, ImageBackground } from 'react-native';
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
  const [ refresh, setRefresh ] = useState(false);


  const handleSubmit = (selectedPlayers) => {
    props.handleSubmit(selectedPlayers);
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  const addPlayer = (player) => {
    const updatedPlayers = selectedPlayers;
    updatedPlayers.push(player);
    setSelectedPlayers( updatedPlayers );
    setRefresh(!refresh);
  }
  const removePlayer = (playerId) => {
    setSelectedPlayers( selectedPlayers.filter((selected) => selected.id !== playerId ) );
    setRefresh(!refresh);
  }
  const handleClearParty = () => {
    setSelectedParty('');
  };
  const searchByName = (query) => {
    setQuery(query);
    setFilteredPlayers(players.filter( player => player.name.indexOf(query) > -1));
  }
  const showDialog = () => {
    setToggleDialog(true);
  }
  const hideDialog = () => {
    setToggleDialog(false);
  }
  const renderPlayer = (itemData, index) => {
    return(
            <View>
            <Chip
            key={itemData.item.id}
            avatar={
              <Avatar.Image
                style={ styles.avatar }
                size={25}
                source={ itemData.item.avatar ? {uri: itemData.item.avatar} : require("../../assets/images/whtenemy.png") } />
              }
            accessibilityLabel={`player: ${itemData.item.name}+selected: ${selectedPlayers.length > 0 && selectedPlayers.find( p => p.id == itemData.item.id)}? true : false`}
            style={ styles.playerChip }
            textStyle={ styles.chipText }
            selected={selectedPlayers.length > 0 && selectedPlayers.find( p => p.id == itemData.item.id)? true : false}
            onPress={() => { selectedPlayers.length > 0 && selectedPlayers.find( p => p.id == itemData.item.id)? removePlayer(itemData.item.id) : addPlayer(itemData.item) }}
            onLongPress={() => { showDialog() }}
            >
            <Text style={ styles.playerName }> {itemData.item.name} </Text>
            <Text style={ styles.playerStatsText }> Level {itemData.item.stats.level} </Text>
            <Text style={ styles.playerStatsText }> {itemData.item.race} </Text>
            <Text style={ styles.playerStatsText }> {itemData.item.className} </Text>
          </Chip>
          <Portal>
            <Dialog
            visible={ toggleDialog }
            onDismiss={ hideDialog }>
              <Dialog.Title style={ styles.dialogHeaderWrapper }>
                <Text style={ styles.dialogueHeader }> { itemData.item.name } </Text>
                <Text style={ styles.dialogueSubHeader }> { itemData.item.className }</Text>
                <Text style={ styles.dialogueSubHeader }> Level { itemData.item.stats.level }</Text>
              </Dialog.Title>
              <Dialog.Content style={ styles.dialogContentWrapper }>
                <View style={ styles.contentGroup }>
                  <View style={ styles.contentSubGroup }>
                    <Text style={{ fontWeight: 'bold'}}>Health:</Text>
                    <Text> {itemData.item.stats.hp} </Text>
                  </View>
                  <View style={ styles.contentSubGroup }>
                    <Text style={{ fontWeight: 'bold'}}>Initiative Bonus:</Text>
                    <Text> {itemData.item.stats.initiativeBonus} </Text>
                  </View>
                  <View style={ styles.contentSubGroup }>
                    <Text style={{ fontWeight: 'bold'}}>Armor Class:</Text>
                    <Text> {itemData.item.stats.ac} </Text>
                  </View>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} color="#00578A">Dismiss</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          </View>
      )
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
              {
              (players.length) == 0 ? (
                  <View>
                    <Text> Looks like you haven't made any players yet. </Text>
                    <Text> Click add new player to begin setting one up! </Text>
                  </View>
                )
                :
                (<FlatList
                  extraData={ refresh }
                  keyExtractor={(item, index) => index.toString()}
                  data={ filteredPlayers }
                  renderItem={ (item, index) => renderPlayer(item, index) } />     )
              }
              <View style={styles.buttonContainer}>
                <Button onPress={() => {handleCancel()} } style={styles.button}
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
                  Submit
                </Button>
              </View>
              </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
