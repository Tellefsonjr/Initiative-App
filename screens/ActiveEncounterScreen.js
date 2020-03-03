/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveActiveEncounterScreen */

import React, { Component, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ImageBackground, Platform, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch, connect } from 'react-redux';
import { FAB, Modal, Button, Switch, Portal, Dialog, IconButton, Badge, Avatar, TextInput, Chip, Snackbar } from 'react-native-paper';
import * as _ from 'lodash';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import CustomHeaderButton from '../components/HeaderButton';
import UndoRedo from '../components/UndoRedo';

import EncounterCombatantItem from '../components/encounterComponents/EncounterCombatantItem';
import EncounterCombatantForm from '../components/encounterComponents/EncounterCombatantForm';
import PlayerDetailModal from '../components/playerComponents/PlayerDetailModal';
import MonsterDetailModal from '../components/monsterComponents/MonsterDetailModal';


import * as encounterActions from '../store/actions/encounters'; //Redux Actions

let ActiveEncounterScreen = ({ canUndo, canRedo, onUndo, onRedo, encounter, players, party, ...props}) => {
  const [ open, setOpen ] = useState(false);
  const [ detailModalVisible, setDetailModalVisible ] = useState(false);
  const [ displayRollModal, setDisplayRollModal ] = useState( encounter.state.turn == 0 || encounter.combatants.filter( c => c.initiative == 0).length > 0? true : false );
  const [ showUndo, setShowUndo ] = useState(false);
  const [ lastAction, setLastAction ] = useState({});
  const [ selectedCombatant, setSelectedCombatant ] = useState(encounter.combatants[0]);
  const [ monsterCount, setMonsterCount ] = useState( encounter.monsters.reduce(function(prev, cur) {
      return prev + cur.count;
    }, 0));
  const [ showActionDialog, setShowActionDialog ] = useState(false);


  const dispatch = useDispatch();

  const saveInitiative = ( newCombatants ) => {
    if( encounter.state.turn == 0){
      console.log("________ STATE = 0 _____ SAVEINITIATIVE");
      encounter.combatants = newCombatants;
      startEncounter();
    } else {
      nextTurn(encounter.state.turn);
    }
  };
  const startEncounter = () => {
    const updatedEncounter = encounter;
    !updatedEncounter.active ? updatedEncounter.active = true : null;
    setLastAction( {
      type: 'turn',
      prevState: encounter,
    });
    if(updatedEncounter.state.turn == 0){
      console.log("STARTING ENCOUNTER, TURN 0_____");
      updatedEncounter.combatants = _.sortBy(updatedEncounter.combatants, ['initiative'], 'desc').reverse();
      dispatch(encounterActions.updateEncounter(updatedEncounter));
    };
    nextTurn(updatedEncounter.state.turn);

  };
  const nextTurn = ( turn ) => {
    setLastAction( {
      type: 'turn',
      prevState: encounter,
    });
    const updatedEncounter = encounter;
    // Handle shift array if not turn 0
    if( encounter.state.turn > 0){
      let first = updatedEncounter.combatants[0];
      updatedEncounter.combatants.splice(0, 1);
      updatedEncounter.combatants.push(first);
    };
    if( updatedEncounter.state.turn % updatedEncounter.combatants.length == 0 ){
      updatedEncounter.state.round++;
    } else {
      null;
    }
    // Handle turn logic no matter what
    updatedEncounter.state.round == 0? updatedEncounter.state.round = 1 : null;
    updatedEncounter.state.turn ++;
    dispatch(encounterActions.updateEncounter(updatedEncounter));
    setShowUndo(true);
    displayRollModal? setDisplayRollModal(false) : null;

  };
  const undoTurn = (turn) => {
    const updatedEncounter = encounter;
    if(turn == 1){
      // If it's the first turn, user may want to show the roll modal again to correct something
      setDisplayRollModal(true);
    } else {
      let last = _.last(updatedEncounter.combatants);
      updatedEncounter.combatants.splice(updatedEncounter.combatants.length-1, 1);
      updatedEncounter.combatants = _.concat(last, updatedEncounter.combatants);
    };
    updatedEncounter.state.turn--;
    updatedEncounter.state.turn & updatedEncounter.combatants.length == 1? updatedEncounter.state.round -- : null;
    dispatch(encounterActions.updateEncounter(updatedEncounter));

  };
  const showCombatantActions = ( combatant ) => {
    setSelectedCombatant(combatant);
    setShowActionDialog(true);
  }
  const editCombatantHealth = ( combatant, method ) => {
    const updatedEncounter = encounter;
    target = updatedEncounter.combatants.find( c => c.cId == combatant.cId);
    if(method == 'damage'){
        target.stats.hp--;
      } else if(method == 'heal'){
        target.stats.hp++;
      } else if(method == 'addMax'){
        target.stats.maxHp++;
      } else if(method == 'lowerMax'){
        target.stats.maxHp--;
      } else if(method == 'successfulSave'){
        target.stats.deathSaves.succeeded++;
        if( target.stats.deathSaves.succeeded == 3){
          target.stats.hp = 1;
          target.stats.deathSaves.failed = 0;
          target.stats.deathSaves.succeeded = 0;
        }
      } else if(method == 'failedSave'){
        target.stats.deathSaves.failed--;
      }
      console.log("UPDATED THIS ONE : ", updatedEncounter.combatants.find( c => c.cId == combatant.cId) );
      dispatch(encounterActions.updateEncounter(updatedEncounter));
  };
  const removeCombatant = ( removedCombatant ) => {
    setLastAction( {
      type: 'remove',
      prevState: encounter,
    });
    const updatedEncounter = encounter;
    if(removedCombatant.cType == 'monster'){
      const updatedItem = updatedEncounter.monsters.find( monster => monster.id == removedCombatant.refId );
      updatedItem.count--;
      if(updatedItem.count == 0){
        updatedEncounter.monsters = _.reject( updatedEncounter.monsters, {'id': removedCombatant.refId});
      }
    } else {
      party.players = _.reject( party.players, removedCombatant.refId );
    };
    newCombatants = _.reject( updatedEncounter.combatants, {'cId': removedCombatant.cId} );
    updatedEncounter.combatants = newCombatants;
    dispatch(encounterActions.updateEncounter(updatedEncounter));
    setShowActionDialog(false);
    // TO DO, allow undo remove combatant
    // setShowUndo(true);
  };

  const showDetailModal = ( combatant ) => {
    setSelectedCombatant( combatant )
    setDetailModalVisible(true);
  };
  const handleUndo = (type) => {
    if( type == 'turn' ){
      undoTurn(encounter.state.turn);
    } else {
      //TO DO: Undo remove combatant
    }
  }

 return (
   <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
      <View style={ styles.headerContainer}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={ styles.headerText }> Round: </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>{ encounter.state.round }</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <Text style={ styles.headerText }> Turn: </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>{ encounter.state.turn }</Text>
        </View>
      </View>
      <View style={ styles.combatantContainer }>
        <ScrollView
          indicatorStyle="white"
        >
          {
            encounter.combatants.map( (combatant, i) => {
              console.log("COMBATANT MAP: ", combatant.initiative);
              return(
                <EncounterCombatantItem combatant={combatant}
                hpPercentage={(combatant.stats.hp / combatant.stats.maxHp)}
                key={combatant.cId}
                index={i}
                handlePress={ showCombatantActions }
                handleLongPress={ showDetailModal }
                onDelete={ () => console.log("Uhoh, deleting")} />
              )
            })
          }
        </ScrollView>
      </View>

{/* Render initiative Modal on before start */}
      <Modal
        visible={ displayRollModal }
        onDismiss={ () => setDisplayRollModal(false)}
        contentContainerStyle={ styles.modalContainer }
        >
        <View style={ styles.initiativeModal }>
          <View style={ styles.modalHeader }>
            <Text style={ styles.modalHeaderText }> Roll for initiative! </Text>
          </View>
          <View style={ styles.combatantFormContainer }>
            <EncounterCombatantForm combatants={ encounter.combatants }
              handleSubmit={ saveInitiative }
              handleCancel={ ()=> setDisplayRollModal(false) }
              autoRoll={ encounter.settings.autoRoll }
              playerCount={ party.players.length }
              monsterCount={ monsterCount }
              />
          </View>
          </View>
      </Modal>

{/* Show ActionDialog on press */}
      <View>
        { selectedCombatant?
          <View style={ styles.dialogContainer }>
            <Portal>
              <Dialog
                style={ styles.dialog }
                visible={ showActionDialog }
                onDismiss={ () => setShowActionDialog(false) }
              >
                <Dialog.Title>
                  <Text style={ styles.dialogHeader}> { selectedCombatant.name } </Text>
                  <Text style={ styles.dialogSubHeader}> { selectedCombatant.cType } </Text>
                </Dialog.Title>
                <Dialog.Content style={ styles.dialogContentWrapper }>
                  <Text style={ styles.combatantStatText }> Hit Points: </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'damage') }
                      icon="minus"
                      color="red"
                      size={20}
                      disabled={ selectedCombatant.stats.hp == 0}
                    />
                    <Text style={ styles.combatantStatValue }> { selectedCombatant.stats.hp } </Text>
                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'heal') }
                      icon="plus"
                      color="green"
                      size={20}
                      disabled={ selectedCombatant.stats.hp == selectedCombatant.stats.maxHp}
                    />
                  </View>
                </Dialog.Content>

                <Dialog.Content style={ styles.dialogContentWrapper }>
                  <Text style={ styles.combatantStatText }> Max HP: </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'lowerMax') }
                      icon="minus"
                      color="red"
                      size={20}
                      disabled={ selectedCombatant.stats.maxHp == 0}

                    />
                    <Text style={ styles.combatantStatValue }> { selectedCombatant.stats.maxHp } </Text>
                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'addMax') }
                      icon="plus"
                      color="green"
                      size={20}

                    />
                  </View>
                </Dialog.Content>
{/* Render Death Saves Indicators if HP == 0 */}
                <Dialog.Content style={ styles.dialogContentWrapper }>
                  <Text style={ styles.combatantStatText }> Death Saves: </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'failedSave') }
                      icon="minus"
                      color="red"
                      size={20}
                      disabled={ selectedCombatant.stats.hp != 0 || selectedCombatant.stats.deathSaves == 3 }
                    />
                    <Icon name='skull' size={16} color={ selectedCombatant.stats.deathSaves.failed == -3? "red" : "grey" } />
                    <Icon name='skull' size={16} color={ selectedCombatant.stats.deathSaves.failed <= -2? "red" : "grey" } />
                    <Icon name='skull' size={16} color={ selectedCombatant.stats.deathSaves.failed <= -1? "red" : "grey" } />
                    <Avatar.Image
                      size={20}
                      style={ styles.combatantImage }
                      source= { require("../assets/images/whtenemy.png") }
                    />
                    <Icon name='heart-pulse' size={16} color={ selectedCombatant.stats.deathSaves.succeeded >= 1? "green" : "grey" } />
                    <Icon name='heart-pulse' size={16} color={ selectedCombatant.stats.deathSaves.succeeded >= 2? "green" : "grey" } />
                    <Icon name='heart-pulse' size={16} color={ selectedCombatant.stats.deathSaves.succeeded >= 3? "green" : "grey" } />

                    <IconButton onPress={() => editCombatantHealth(selectedCombatant, 'successfulSave') }
                      icon="plus"
                      color="green"
                      size={20}
                      disabled={ selectedCombatant.stats.hp != 0 || selectedCombatant.stats.deathSaves == 3 }
                    />
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => removeCombatant(selectedCombatant) }>Remove</Button>
                  <Button onPress={() => setShowActionDialog(false) }>Dismiss</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          :
          null
        }
      </View>

{/* Show detail modal on longPress */}
    { selectedCombatant.cType == 'player'?
      <PlayerDetailModal visible={ detailModalVisible } player={ selectedCombatant } onDismiss={ () => setDetailModalVisible(false)} />
      :
      <MonsterDetailModal visible={ detailModalVisible } monster={ selectedCombatant } onDismiss={ () => setDetailModalVisible(false)} />
    }

{/* Show Snackbar to undo turn or action */}
    <Snackbar
        style={{ width: '75%' }}
        visible={ showUndo }
        duration={8000}
        onDismiss={() => setShowUndo(false) }
        action={{
          label: 'Undo',
          onPress: () => { handleUndo(lastAction.type) }
        }}>
        {
          lastAction.type == 'turn'?
                  encounter.state.turn == 1?
                  'The encounter begins!'
                  :
                  `${encounter.combatants[encounter.combatants.length-1].name} ended their turn!`
                :
                lastAction.type == 'remove'?
                "Removed a combatant from the encounter!"
                :
                ''
        }
      </Snackbar>

{/* Render Google Floating Action Button */}

              <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'dice-d20', label: 'Roll Initiative', onPress: () => setDisplayRollModal(true)},
                { icon: 'undo', label: 'Undo Turn', onPress: () => handleUndo('turn') },
                { icon: 'arrow-right-circle-outline', label: 'Next Turn', onPress: () => nextTurn(encounter.state.turn)},
              ]}
              onStateChange={({ open }) => setOpen(open)}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
              />


        </View>
{/* Container End */}
    </ImageBackground>
  );
}

ActiveEncounterScreen.navigationOptions = (navData, encounter) => {
  return {
    headerTitle: navData.navigation.getParam("title"),
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(78, 78, 78, 0.9)',
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  combatantContainer: {
    height: '80%',
    paddingHorizontal: 5,
  },
  combatantFormContainer: {
    marginTop: 10,
    height: '80%',
    paddingHorizontal: 5,
  },
  modalContainer: {
    height: '75%',
    backgroundColor: 'white',
    padding: 10,
  },
  initiativeModal: {
    height: '100%'
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  modalHeaderText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  combatantImage: {

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
  combatantStatText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  combatantStatValue: {
    fontSize: 20,
  },
  contentGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSubGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state, ownProps) => {
    state.encounters.past? console.log("Encounter Screen State: ", state.encounters.past.length ) : null;
    return {
      encounter: state.encounters.present.encounters.find((encounter) => encounter.id == ownProps.navigation.getParam("id")),
      party:  state.parties.parties.find((party) => party.id == ownProps.navigation.getParam("partyId")),

    }
};
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

ActiveEncounterScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveEncounterScreen);

 export default ActiveEncounterScreen;
