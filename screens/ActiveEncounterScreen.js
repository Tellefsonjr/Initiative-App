/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveActiveEncounterScreen */

import React, { Component, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ImageBackground, Platform, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Modal, Button, Switch, Snackbar, Portal, Dialog, IconButton, Badge, Avatar, TextInput, Chip } from 'react-native-paper';
import * as _ from 'lodash';

import CustomHeaderButton from '../components/HeaderButton';

import EncounterCombatantItem from '../components/encounterComponents/EncounterCombatantItem';
import PlayerDetailModal from '../components/playerComponents/PlayerDetailModal';
import MonsterDetailModal from '../components/monsterComponents/MonsterDetailModal';


import * as encounterActions from '../store/actions/encounters'; //Redux Actions

const ActiveEncounterScreen = (props) => {
  const encounter = useSelector(state => state.encounters.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const players = useSelector(state => state.players.players.filter((player) => encounter.party.players.includes(player.id)));


  console.log("ENCOUNTER ACTIVE : ", encounter);
  const [ open, setOpen ] = useState(false);
  const [ detailModalVisible, setDetailModalVisible ] = useState(false);
  const [ displayRollModal, setDisplayRollModal ] = useState( encounter.state.turn == 0? true : false );
  const [ showUndo, setShowUndo ] = useState(false);
  const [ selectedCombatant, setSelectedCombatant ] = useState(encounter.combatants[0]);
  const [ showActionDialog, setShowActionDialog ] = useState(false);
  const [ combatantCount , setCombatantCount ] = useState( {
    monsters: encounter.combatants.filter( c => c.cType == 'monster' && c.initiative != 0).length,
    players: encounter.combatants.filter( c => c.cType == 'player' && c.initiative != 0).length,
  });
  const [ monsterCount, setMonsterCount ] = useState( encounter.monsters.reduce(function(prev, cur) {
    return prev + cur.count;
  }, 0));

  const dispatch = useDispatch();

  const rollInitiative = ( combatant ) => {
    // roll individual combatant's initiative + bonus
    let roll = Math.floor(Math.random() * 20) + 1;

  };
  const nextTurn = ( turn ) => {
    !encounter.active ? encounter.active = true : null;

    if(turn == 0){
      encounter.combatants = _.sortBy(encounter.combatants, ['initiative'], 'desc').reverse();
      console.log("Next order: ", encounter.combatants);
    } else {
      let first = encounter.combatants[0];
      console.log("first", first);
      encounter.combatants.splice(0, 1);
      encounter.combatants.push(first);
    }
    encounter.state.round == 0? encounter.state.round = 1 : null;
    encounter.state.turn ++;
    if( encounter.state.turn % encounter.combatants.length == 0 ){
      encounter.state.round++;
    } else {
      null;
    }
    setShowUndo(true);
    displayRollModal? setDisplayRollModal(false) : null;

  };
  const undoTurn = (turn) => {
    if(turn == 1){
      // If it's the first turn, user may want to show the roll modal again to correct something
      setDisplayRollModal(true);
    } else {
      let last = _.last(encounter.combatants);
      encounter.combatants.splice(encounter.combatants.length-1, 1);
      console.log("CONCATED: ", _.concat(last, encounter.combatants));
      encounter.combatants = _.concat(last, encounter.combatants);
    };
    encounter.state.turn--;
    encounter.state.turn & encounter.combatants.length == 1? encounter.state.round -- : null;
  };
  const showCombatantActions = ( combatant ) => {
    setSelectedCombatant(combatant);
    setShowActionDialog(true);
    console.log("Selected: ", selectedCombatant, showActionDialog);
  }
  const editCombatantHealth = ( combatant, method ) => {
    updatedEncounter = encounter;
    target = updatedEncounter.combatants.find( c => c.cId == combatant.cId);
    console.log("Editing Health: ", target, method);
    if(method == 'damage'){
        target.stats.hp--;
      } else if(method == 'heal'){
        target.stats.hp++;
      } else if(method == 'addMax'){
        target.stats.maxHp++;
      } else if(method == 'lowerMax'){
        target.stats.maxHp--;
      }
      console.log("UPDATED THIS ONE : ", updatedEncounter.combatants.find( c => c.cId == combatant.cId) );
      dispatch(encounterActions.updateEncounter(updatedEncounter));
  };
  const hideActionDialog = () => {
    console.log("hiding", showActionDialog);
    setShowActionDialog(false);
  }
  const showDetailModal = ( combatant ) => {
    console.log("SHOWING MODAL");
    setSelectedCombatant( combatant )
    setDetailModalVisible(true);
  };

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
          <View style={ styles.statusContainer }>
            <View style={ styles.statusItem }>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ styles.statusLabel}> Monsters </Text>
                <Text style={ styles.statusLabel, combatantCount.monsters == monsterCount? styles.countReady : styles.countNotReady }> { combatantCount.monsters } / { monsterCount } </Text>
                <Icon name="emoticon-devil-outline" size={20} />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text> Waiting on these monsters... </Text>
                <View>
                  {
                    encounter.combatants.map( combatant => {
                      combatant.initiative == 0 && combatant.cType == 'monster' ?
                      (<Chip
                        avatar={
                          <Avatar.Image
                            size={18}
                            style={ styles.combatantImage }
                            source= { require("../assets/images/whtenemy.png") }
                          />}
                      > { combatant.name } </Chip>)
                      :
                      (null)
                    })
                  }
                </View>
              </View>
            </View>
            <View style={ styles.statusItem }>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ styles.statusLabel}> Players </Text>
                <Text style={ styles.statusLabel, combatantCount.players == encounter.party.players.length? styles.countReady : styles.countNotReady}> { combatantCount.players } / { encounter.party.players.length } </Text>
                <Icon name="account-outline" size={20} />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text> Waiting on these players... </Text>
                <View style={{ height: '50%'}}>
                {
                  encounter.combatants.map( combatant =>
                    combatant.initiative == 0 && combatant.cType == 'player' ?
                    <Chip
                      avatar={
                        <Avatar.Image
                          size={18}
                          style={ styles.combatantImage }
                          source= { require("../assets/images/whtenemy.png") }
                        />}
                    > { combatant.name } </Chip>
                    :
                    null
                  )
                }
                </View>
              </View>
            </View>
          </View>
          <View style={ styles.buttonContainer }>
            <Button onPress={() => console.log("Save!")}
              style={ styles.button }
              mode='contained'
              compact={true}
              icon='undo'
            >Undo</Button>
            <Button onPress={() => nextTurn(encounter.state.turn)}
              style={ styles.button }
              mode='contained'
              compact={true}
              disabled={ combatantCount.monsters + combatantCount.players != monsterCount + encounter.party.players.length }
              icon='check-circle-outline'
            >Save</Button>
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
                onDismiss={ () => hideActionDialog() }
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
                <Dialog.Actions>
                  <Button onPress={() => hideActionDialog() }>Dismiss</Button>
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
          onDismiss={() => setShowUndo(false)}
          action={{
            label: 'Undo',
            onPress: () => {
              undoTurn(encounter.state.turn)
            },
          }}> { encounter.state.turn == 1?
            'The encounter begins!'
            :
            `${encounter.combatants[encounter.combatants.length-1].name} ended their turn!` }
        </Snackbar>

{/* Render Google Floating Action Button */}

              <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'dice-d20', label: 'Roll Initiative', onPress: () => setDisplayRollModal(true)},
                { icon: 'undo', label: 'Undo Turn', onPress: () => undoTurn(encounter.state.turn)},
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(78, 78, 78, 0.9)',
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  combatantContainer: {
    marginTop: 10,
    height: '75%',
    paddingHorizontal: 5,
  },
  modalContainer: {
    height: '50%',
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  statusItem: {
    flexDirection: 'column',
  },
  statusLabel: {
    fontSize: 18,
  },
  countReady: {
    color: 'green',
    fontSize: 18,
  },
  countNotReady: {
    color: 'red',
    fontSize: 20,
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



 export default ActiveEncounterScreen;
