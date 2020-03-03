/* aka Player List Screen, shows player list and filter players to edit */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, connect } from 'react-redux';
import { FAB, Portal, Modal, Dialog, Button, Searchbar } from 'react-native-paper';

import CustomHeaderButton from '../components/HeaderButton';
import PlayerList from '../components/playerComponents/PlayerList';
import PlayerDetailModal from '../components/playerComponents/PlayerDetailModal';
import PlayerForm from '../components/playerComponents/PlayerForm';

import * as playerActions from '../store/actions/players'; //Redux Actions
import * as encounterActions from '../store/actions/encounters'; //Redux Actions
import * as partyActions from '../store/actions/parties'; //Redux Actions

let PlayersScreen = ({ onUndo, onRedo, addPlayer, updatePlayer, deletePlayer, deletePartyPlayer, deleteEncounterPlayer, players, ...props}) => {
  const [ open, setOpen ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalType, setModalType ] = useState('');
  const [ dialogVisible, setDialogVisible ] = useState(false);
  const [ selectedPlayer, setSelectedPlayer ] = useState(false);
  const [ filteredPlayers, setFilteredPlayers ] = useState(players);
  const [ query, setQuery ] = useState('');

  const showAddModal = () => {
    setModalType('add');
    setModalVisible(true);
    console.log("Showing Modal: ", modalVisible, modalType);
  };
  const showEditModal = (player) => {
    setSelectedPlayer(player);
    setModalType('edit');
    setModalVisible(true);
  };
  const hideModal = () => {
    console.log("hiding modal");
    setModalType('');
    setSelectedPlayer(false);
    setModalVisible(false);
  };
  const showDeleteDialog = (player) => {
    setSelectedPlayer(player);
    setDialogVisible(true);
  };
  const searchByName = (query) => {
    setQuery(query);
    setFilteredPlayers(players.filter( player => player.name.indexOf(query) > -1));
  }
  const createPlayerHandler = ( player ) => {
    addPlayer(player);
    setModalVisible(false);
  };
  const editPlayerHandler = (player) => {
    console.log("Handling edit action: ");
    updatePlayer(player);
    setModalVisible(false);
  };
  const removePlayerHandler = (player) => {
    console.log("Deleting: ", player.id);
    deletePlayer(player.id);
    deletePartyPlayer(player.id);
    deleteEncounterPlayer(player.id);
    setFilteredPlayers(players.filter(p => p.id !== player.id));
    setDialogVisible(false);
  };
  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <View style={ styles.searchBarContainer }>
          <Searchbar
          style={ styles.searchBar }
          placeholder="Search by name"
          onChangeText={query => { searchByName(query) }}
          value={query}
          />
        </View>
        <PlayerList players={filteredPlayers}
        handlePress={ showEditModal }
        removePlayerHandler={ showDeleteDialog } />


        {/* Player Modal changes per toggle and modalType */}

                    <Modal visible={ modalVisible } onDismiss={() => {hideModal()} } contentContainerStyle={ styles.modalContainer }>
                      <View style={styles.formHeader}>
                        { modalType == 'add' ?
                        <Text style={styles.formHeaderText}>Create Player</Text>
                        :
                        modalType == 'edit' && selectedPlayer ?
                        <Text style={styles.formHeaderText}>Edit Player</Text>
                        :
                        null
                        }
                       </View>
                      {
                        modalType == 'add' ?
                          <PlayerForm handleSubmit={ createPlayerHandler } removePlayerHandler={ () => {removePlayerHandler } } handleCancel={ () => {hideModal()}}/>
                        :
                        modalType == 'edit' ?
                          <PlayerForm handleSubmit={ editPlayerHandler } player={ selectedPlayer } handleCancel={ () => {hideModal()}}/>
                        :
                        null
                      }
                    </Modal>
  {/* Show ActionDialog on press */}
          { selectedPlayer && dialogVisible ?
            <View style={ styles.dialogContainer }>
              <Portal>
                <Dialog
                  style={ styles.dialog }
                  visible={ dialogVisible }
                  onDismiss={ () => setDialogVisible(false) }
                >
                  <Dialog.Title>
                    <Text style={ styles.dialogHeader}> Delete { selectedPlayer.name }? </Text>
                  </Dialog.Title>
                  <Dialog.Content style={ styles.dialogContentWrapper }>
                    <Text style={{ fontWeight: 'bold'}}> Warning: This cannot be undone! </Text>
                  </Dialog.Content>
                  <Dialog.Content style={ styles.dialogContentWrapper }>
                    <Text> Are you sure you want to delete this player? </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color='red' onPress={() => removePlayerHandler(selectedPlayer) }>Remove</Button>
                    <Button onPress={() => setDialogVisible(false) }>Dismiss</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
            :
            null
          }
        <FAB.Group
        open={open}
        icon={open ? 'close' : 'dots-vertical'}
        actions={[
          { icon: 'account-plus-outline', label: 'Add Players', onPress: () => { showAddModal() } },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {

            // do something if the speed dial is open
          }
        }}
        />
      </View>
    </ImageBackground>
  );
}

PlayersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Players",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  searchBarContainer: {
    padding: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '80%',
    backgroundColor: 'white',
    padding: 10,
  },
  dialogContainer: {
  },
  dialog: {
  },
  dialogHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dialogHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  dialogSubHeader: {
    fontSize: 18,
    color: 'rgb(77, 77, 77)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(77, 77, 77)',
  },
  dialogContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const mapStateToProps = (state, ownProps) => {
    return {
      players:  state.players.players,
    }
};
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    addPlayer: (player) => dispatch(playerActions.addPlayer(player)),
    updatePlayer: (player) => dispatch(playerActions.updatePlayer(player)),
    deletePlayer: (player) => dispatch(playerActions.deletePlayer(player)),
    deletePartyPlayer: (player) => dispatch(partyActions.deletePlayer(player)),
    deleteEncounterPlayer: (player) => dispatch(encounterActions.deletePlayer(player)),

  }
};

PlayersScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersScreen);


 export default PlayersScreen;
