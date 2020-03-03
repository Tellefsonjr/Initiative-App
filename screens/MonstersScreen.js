/* aka Monster List Screen, shows monster list and filter monsters to edit */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, connect } from 'react-redux';
import { FAB, Portal, Modal, Dialog, Button, Searchbar } from 'react-native-paper';

import CustomHeaderButton from '../components/HeaderButton';
import MonsterList from '../components/monsterComponents/MonsterList';
import MonsterDetailModal from '../components/monsterComponents/MonsterDetailModal';
import MonsterForm from '../components/monsterComponents/MonsterForm';

import * as monsterActions from '../store/actions/monsters'; //Redux Actions
import * as encounterActions from '../store/actions/encounters'; //Redux Actions

let MonstersScreen = ({ onUndo, onRedo, addMonster, updateMonster, deleteMonster, monsters, ...props}) => {
  const [ open, setOpen ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalType, setModalType ] = useState('');
  const [ dialogVisible, setDialogVisible ] = useState(false);
  const [ selectedMonster, setSelectedMonster ] = useState(false);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);
  const [ query, setQuery ] = useState('');

  const showAddModal = () => {
    setModalType('add');
    setModalVisible(true);
    console.log("Showing Modal: ", modalVisible, modalType);
  };
  const showEditModal = (monster) => {
    setSelectedMonster(monster);
    setModalType('edit');
    setModalVisible(true);
  };
  const hideModal = () => {
    console.log("hiding modal");
    setModalType('');
    setSelectedMonster(false);
    setModalVisible(false);
  };
  const showDeleteDialog = (monster) => {
    setSelectedMonster(monster);
    setDialogVisible(true);
  };
  const searchByName = (query) => {
    setQuery(query);
    setFilteredMonsters(monsters.filter( monster => monster.name.indexOf(query) > -1));
  }
  const createMonsterHandler = ( monster ) => {
    addMonster(monster);
    setModalVisible(false);
  };
  const editMonsterHandler = (monster) => {
    console.log("Handling edit action: ");
    updateMonster(monster);
    setModalVisible(false);
  };
  const removeMonsterHandler = (monster) => {
    console.log("Deleting: ", monster.id);
    deleteMonster(monster.id);
    setFilteredMonsters(monsters.filter(m => m.id !== monster.id));
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
        <MonsterList monsters={filteredMonsters}
        handlePress={ showEditModal }
        removeMonsterHandler={ showDeleteDialog } />


        {/* Monster Modal changes per toggle and modalType */}

                    <Modal visible={ modalVisible } onDismiss={() => {hideModal()} } contentContainerStyle={ styles.modalContainer }>
                      <View style={styles.formHeader}>
                        { modalType == 'add' ?
                        <Text style={styles.formHeaderText}>Create Monster</Text>
                        :
                        modalType == 'edit' && selectedMonster ?
                        <Text style={styles.formHeaderText}>Edit Monster</Text>
                        :
                        null
                        }
                       </View>
                      {
                        modalType == 'add' ?
                          <MonsterForm handleSubmit={ createMonsterHandler } removeMonsterHandler={ () => {removeMonsterHandler } } handleCancel={ () => {hideModal()}}/>
                        :
                        modalType == 'edit' ?
                          <MonsterForm handleSubmit={ editMonsterHandler } monster={ selectedMonster } handleCancel={ () => {hideModal()}}/>
                        :
                        null
                      }
                    </Modal>
  {/* Show ActionDialog on press */}
          { selectedMonster && dialogVisible ?
            <View style={ styles.dialogContainer }>
              <Portal>
                <Dialog
                  style={ styles.dialog }
                  visible={ dialogVisible }
                  onDismiss={ () => setDialogVisible(false) }
                >
                  <Dialog.Title>
                    <Text style={ styles.dialogHeader}> Delete { selectedMonster.name }? </Text>
                  </Dialog.Title>
                  <Dialog.Content style={ styles.dialogContentWrapper }>
                    <Text style={{ fontWeight: 'bold'}}> Warning: This cannot be undone! </Text>
                  </Dialog.Content>
                  <Dialog.Content style={ styles.dialogContentWrapper }>
                    <Text> Are you sure you want to delete this monster? </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color='red' onPress={() => removeMonsterHandler(selectedMonster) }>Remove</Button>
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
          { icon: 'filter-variant', label: 'Filter', onPress: () => { console.log("Filter") } },
          { icon: 'emoticon-devil-outline', label: 'Add Monsters', onPress: () => { showAddModal() } },
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

MonstersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Monsters",
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
      monsters:  state.monsters.monsters,
    }
};
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    addMonster: (monster) => dispatch(monsterActions.addMonster(monster)),
    updateMonster: (monster) => dispatch(monsterActions.updateMonster(monster)),
    deleteMonster: (monster) => dispatch(monsterActions.deleteMonster(monster)),
  }
};

MonstersScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonstersScreen);


 export default MonstersScreen;
