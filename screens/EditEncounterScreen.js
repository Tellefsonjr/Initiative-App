/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveEditEncounterScreen */

import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Portal, Provider, Modal, Button, TouchableRipple, Badge } from 'react-native-paper';
import * as _ from 'lodash';

import CustomHeaderButton from '../components/HeaderButton';

import EncounterForm from '../components/encounterComponents/EncounterForm';

import PlayerList from '../components/playerComponents/PlayerList';
import PlayerForm from '../components/playerComponents/PlayerForm';
import PlayerSelect from '../components/playerComponents/PlayerSelect';

import MonsterList from '../components/monsterComponents/MonsterList';
import MonsterForm from '../components/monsterComponents/MonsterForm';
import MonsterSelect from '../components/monsterComponents/MonsterSelect';

import * as encounterActions from '../store/actions/encounters'; //Redux Actions
import * as playerActions from '../store/actions/players'; //Redux Actions
import * as partyActions from '../store/actions/parties'; //Redux Actions
import * as monsterActions from '../store/actions/monsters'; //Redux Actions

const EditEncounterScreen = props => {
  const encounter = useSelector(state => state.encounters.present.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const party = useSelector(state => state.parties.parties.find((party) => party.id == encounter.partyId));
  const players = useSelector(state => state.players.players.filter((player) => party.players.includes(player.id)));
  const monsters = useSelector(state => state.monsters.monsters.filter((monster) => _.find(encounter.monsters, {id: monster.id})));
  console.log("PARTY AT ENCOUNTER SCREEN: ", encounter.party);
  const [open, setOpen ] = useState( false );
  const [visible, setVisible ] = useState( false );
  const [ toggle, setToggle ] = useState( 'create' );
  const [ expandedType, setExpandedType ] = useState(['monsters', 'players']);
  const [ expanded, setExpanded ] = useState(true);
  const [modalType, setModalType] = useState( '' );
  const [ progress, setProgress ] = useState( encounter.difficulty );
  const [ editPlayer, setEditPlayer ] = useState({});

  const barWidth = Dimensions.get('screen').width - 30;
  const dispatch = useDispatch();

  const createPlayerHandler = ( player ) => {
    dispatch(playerActions.addPlayer(player));
    const newParty = party;
    dispatch(partyActions.updateParty({
      id: newParty.id,
      title: newParty.title,
      players: newParty.players.concat(player.id)
    }));
    setVisible(false);
  };
  const toggleEditPlayer = ( player ) => {
    console.log("Editing: ", player);
    setToggle('edit');
    setModalType('player');
    setEditPlayer(player);
    setVisible(true);
  };
  const editPlayerHandler = ( player ) => {
    console.log("Handling edit action: ");
    dispatch(playerActions.updatePlayer(player));
    setVisible(false);

  };
  const removePlayerHandler = ( playerId ) => {
    const newEncounter = encounter;
    const updatedParty = party;
    // console.log("New encounter: ", newEncounter);
    updatedParty.players = updatedParty.players.filter(p => p != playerId);
    dispatch(partyActions.updateParty(updatedParty));
    newEncounter.combatants = newEncounter.combatants.filter(p => p.refId != playerId);
    // console.log("New encounter after: ", newEncounter);
    updateEncounterHandler(newEncounter);

  };
  const updateEncounterPlayers = ( updatedPlayers ) => {
    const updatedParty = party;
    const updatedPartyPlayers = updatedPlayers.map(player => player.id);
    dispatch(partyActions.updateParty({
      id: updatedParty.id,
      title: updatedParty.title,
      players: updatedPartyPlayers
    }));
    setVisible(false);
  };
  const updateEncounterHandler = ( encounter ) => {
    // TO DO: Calculate difficult here
    dispatch(encounterActions.updateEncounter(encounter));
    setVisible(false);
  };
  const createMonsterHandler = ( monster ) => {
    dispatch(monsterActions.addMonster(monster));
    const updatedEncounter = encounter;
    updatedEncounter.monsters.push({ id: monster.id, count: 1});
    updateEncounterHandler(encounter);
    setVisible(false);
  };
  const updateEncounterMonsters = ( updatedMonsters ) => {
    // console.log("Updating Monsters:", updatedMonsters);
    const updatedEncounter = encounter;
    updatedEncounter.monsters = updatedMonsters;
    updateEncounterHandler(updatedEncounter);
  };
  const showModal = (type) => {
    setModalType(type);
    setVisible(true);
  };
  const hideModal = (type) => {
    setVisible(false);
  }
  const handleExpand = (type) => {
    expandedType.includes(type) ?
      setExpandedType(expandedType.filter( t => t != type ))
      :
      setExpandedType( expandedType.concat([type]));
    expandedType == [''] ?
      setExpanded(false)
      :
      setExpanded(true);
  };
  const startEncounter = ( ) => {
    // TO DO: this is not efficient, nearly 3 loops... Likely need to just create new table for Combatants
    console.log("STARTING ENCOUNTER: ");
    const monsterCount = encounter.monsters.reduce(function(prev, cur) {
      return prev + cur.count;
    }, 0);
    // Map through Players & Monsters to populate combatants [ { id, type, name (monster 1, 2, 3, ...), initiative, stats: {hp, ac,} }]
    if(!encounter.active || encounter.combatants.length != monsterCount + party.players.length){
      encounter.monsters.forEach( monster => {
        let m = monsters.find( mData => mData.id == monster.id);
        // if combatants contains monsters already, reduce loop by length of refId array
        let mCount = encounter.combatants.filter( c=> c.refId == m.id).length;

        for( i=mCount; i < monster.count; i++){
          let roll = Math.floor(Math.random() * 20) + 1;
          //console.log(m.name, "rolled :", roll, "+", m.initiativeBonus);
          //Makes a new Combatant
          let newCombatant = {
            cId: Math.random(),
            refId: m.id,
            avatar: m.avatar,
            type: m.type,
            cr: m.cr,
            cType: 'monster',
            name: `${m.name} ${String.fromCharCode(i+1+64)}`,
            initiative: encounter.settings.autoRoll.monsters ? roll + m.stats.initiativeBonus : 0,
            stats: m.stats,

          };
          if(encounter.active){
            // Encounter already going on, find index to place new Combatant
            console.log(`!!!New monster ${newCombatant.cId} rolled`, newCombatant.initiative);
            pushNewCombatant(newCombatant);
          } else {
            // Encounter not active, just push into combatants
            encounter.combatants.push(newCombatant);
          }
        }
      });
      players.forEach( player => {
        // skip player if combatants already contains it
        if( _.some(encounter.combatants, [ 'refId', player.id ])){
          console.log("Skipping player", player.name);
        } else {
          let roll = Math.floor(Math.random() * 20) + 1;
          console.log(player.name, "rolled :", roll, "+", player.stats.initiativeBonus, '=', roll+player.stats.initiativeBonus);
          const newCombatant = {
            cId: Math.random(),
            refId: player.id,
            cType: 'player',
            avatar: player.avatar,
            name: player.name,
            className: player.className,
            initiative: encounter.settings.autoRoll.players ? (roll + player.stats.initiativeBonus) : 0,
            stats: player.stats,
        };
        console.log("NEW COMBATANT: ", newCombatant.initiative);
          if(encounter.active){
            // Encounter already going on, find index to place new Combatant
            pushNewCombatant(newCombatant);
            updateEncounterHandler(encounter);
          } else {
            // Encounter not active, just push into combatants
            encounter.combatants.push(newCombatant);
          }


        }
    });
    updateEncounterHandler(encounter);
  };
    props.navigation.navigate("ActiveEncounter", { id: encounter.id, title: encounter.title, partyId: encounter.partyId });
  };
  const pushNewCombatant = (newCombatant) => {
    console.log(" PUSHING: ", newCombatant.name);
    let topCombatant = _.maxBy(encounter.combatants, 'initiative');
    // console.log("TOP INDEX::: ", topCombatant);
    let bottomCombatant = _.minBy(encounter.combatants, 'initiative');
    if (newCombatant.initiative >= topCombatant.initiative){
      let topIndex = _.findIndex(encounter.combatants, topCombatant);
      // console.log(`Top: This player: ${newCombatant.name} (${newCombatant.initiative}) is greater than top: ${topCombatant.name} (${topIndex})`);
      encounter.combatants.splice( topIndex, 0, newCombatant);
    } else if ( newCombatant.initiative <= bottomCombatant.initiative ){
      let bottomIndex = _.findIndex(encounter.combatants, bottomCombatant);
      if (bottomIndex == encounter.combatants.length - 1){
        // console.log(`Bottom of list: This player: ${newCombatant.name} (${newCombatant.initiative}) is less than bottom: ${bottomCombatant.name} (${bottomIndex})`);
        encounter.combatants.push(newCombatant);
      } else if (bottomIndex == 0 && encounter.combatants.length > 1) {
        // console.log(`Top of list: This player: ${newCombatant.name} (${newCombatant.initiative}) is less than bottom: ${bottomCombatant.name} (${bottomIndex})`);
        encounter.combatants.splice(bottomIndex+1, 0, newCombatant);
      }else {
        // console.log(`End of Initiative: This player: ${newCombatant.name} (${newCombatant.initiative}) is less than bottom: ${bottomCombatant.name} (${bottomIndex})`);
        encounter.combatants.splice(bottomIndex, 0, newCombatant);
      }
    } else {
      // console.log("Not > top or < bottom");
      for(var index=0; index <= encounter.combatants.length - 1; index++){
        // console.log("Looping:::");
        let combatant = encounter.combatants[index];
        let nextPosition = index == encounter.combatants.length - 1 ? 0 : index + 1;
        let current = combatant.initiative;
        let newI = newCombatant.initiative;
        let next = encounter.combatants[nextPosition].initiative;
        // console.log("Current: ", current, "Next: ", next, "New Init: ", newI);
         if ( newI <= current && newI >= next && nextPosition != 0 ) {
           // console.log("Not top or bottom, found a position between", current, "and ", next);
           encounter.combatants.splice(nextPosition, 0, newCombatant);
           break
         } else if (newI <= current && newI >= next && nextPosition == 0) {
           // console.log("Got to the end and found a spot after", combatant.name, current);
           encounter.combatants.push(newCombatant);
           break
         }else if (
          newCombatant.initiative == 0
        ){
          encounter.combatants.push(newCombatant);
          break
        };
      }
    }

  };
 return (
   <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <View style={ styles.difficultyWrapper }>
          <Text style={ styles.labelText }>Difficulty: { encounter.difficulty }</Text>
          <ProgressBarAnimated
            style={ styles.difficultyBar }
            width={ barWidth }
            value={ progress }
            backgroundColorOnComplete="#6CC644"
          />
        </View>
        <View style={ styles.listViewWrapper}>
<ScrollView>
{/* Player List view based on expanded && expandedType */}
<View style={ styles.playerListWrapper }>
        <TouchableRipple
          style={ styles.expandButton }
          onPress={() => handleExpand('players')}
          rippleColor="white"
        >
        <View style={ styles.expandInner }>
          <Icon name="account-outline" size={24} color="white">
            <Text style={{ fontSize: 24}}>{ party.players.length.toString() }</Text>
          </Icon>
          <Text style={ styles.expandText}>Players</Text>
          <Icon name={expanded && expandedType.includes("players")? "menu-up": "menu-down"} size={24} color="white" />
        </View>
        </TouchableRipple>
        {
          expanded && expandedType.includes('players') ?
              <PlayerList
                players={players}
                handlePress={ toggleEditPlayer }
                removePlayerHandler={removePlayerHandler}/>
            :
            null
        }
</View>
{/* Monster List view based on expanded && expandedType */}
<View style={ styles.monsterListWrapper }>
        <TouchableRipple
          style={ styles.expandButton }
          onPress={() => handleExpand('monsters')}
          rippleColor="white"
        >
          <View style={ styles.expandInner}>
          <Icon name="emoticon-devil-outline" size={24} color="white">
            <Text style={{ fontSize: 24}}>{
              encounter.monsters.reduce(function(prev, cur) {
                return prev + cur.count;
              }, 0)
            }</Text>
          </Icon>
          <Text style={ styles.expandText}>Monsters</Text>
          <Icon name={expanded && expandedType.includes("monsters")? "menu-up": "menu-down"} size={24} color="white" />
          </View>
        </TouchableRipple>
        {
          expanded && expandedType.includes('monsters') ?
            <MonsterList
              monsters={monsters}
              monsterCount={encounter.monsters}
              handlePress={() => console.log("Pressed a Monster")}
              removeMonsterHandler={() => console.log("Deleting a monster")}
              />
            :
            null
        }
</View>
</ScrollView>
</View>

{/* Player Modal changes per toggle and modalType */}

            <Modal visible={visible && modalType == 'player'} onDismiss={() => {hideModal('player')} } contentContainerStyle={ styles.modalContainer }>
              <View style={styles.formHeader}>
                { toggle == 'create' ?
                <Text style={styles.formHeaderText}>Create Player</Text>
                :
                toggle == 'edit'?
                <Text style={styles.formHeaderText}>Edit Player</Text>
                :
                <Text style={styles.formHeaderText}>Select Players</Text>
                }
               </View>
               <View style={styles.buttonContainer}>
                 <Button
                   icon="account-plus-outline"
                   onPress={() => {setToggle('create')}}
                   style={ styles.toggleButton }
                   color={toggle == 'create' ? 'rgb(0, 87, 138)' : 'rgba(0, 87, 138, .7)'}
                   mode='contained'>
                 Create
                 </Button>
                 <Button
                   icon="account-details"
                   onPress={() => {setToggle('select')}}
                   style={ styles.toggleButton }
                   color={toggle == 'select' ? 'rgb(0, 87, 138)' : 'rgba(0, 87, 138, .7)'}
                   mode='contained'>
                 Select
                 </Button>
               </View>
              {
                toggle == 'create' ?
                  <PlayerForm handleSubmit={ createPlayerHandler } removePlayerHandler={ () => {removePlayerHandler } } handleCancel={ () => {hideModal('player')}}/>
                :
                toggle == 'edit' ?
                  <PlayerForm handleSubmit={ editPlayerHandler } player={ editPlayer } handleCancel={ () => {hideModal('player')}}/>
                :
                <View style={{flex: 1}}>
                  <PlayerSelect players={players} handleSubmit={ updateEncounterPlayers } handleCancel={ () => {hideModal('player') } } />
                </View>
              }
            </Modal>

{/* Monster Modal changes per toggle and modalType */}

            <Modal visible={visible && modalType == 'monster'} onDismiss={() => {hideModal('monster')} } contentContainerStyle={ styles.modalContainer }>
              <View style={styles.formHeader}>
                { toggle == 'create' ?
                <Text style={styles.formHeaderText}>Create Monster</Text>
                :
                <Text style={styles.formHeaderText}>Select Monsters</Text>
                }
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  icon="emoticon-devil-outline"
                  onPress={() => {setToggle('create'); showModal("monster")}}
                  style={ styles.toggleButton }
                  color={toggle == 'create' ? 'rgb(0, 87, 138)' : 'rgba(0, 87, 138, .7)'}
                  mode='contained'>
                  Create
                </Button>
                <Button
                  icon="account-details"
                  onPress={() => {setToggle('select'); showModal("monster")}}
                  style={ styles.toggleButton }
                  color={toggle == 'select' ? 'rgb(0, 87, 138)' : 'rgba(0, 87, 138, .7)'}
                  mode='contained'>
                  Select
                </Button>
              </View>
              {
                toggle == 'create' ?
                <MonsterForm handleSubmit={ createMonsterHandler } handleCancel={ () => {hideModal('monster') } } />
                :
                <MonsterSelect selectedMonsters={encounter.monsters} handleSubmit={ updateEncounterMonsters }
                 submitable={true} searchable={true} handleCancel={ () => {hideModal('monster') } } />
              }
            </Modal>

{/* Encounter Modal changes per toggle and modalType */}

                        <Modal visible={visible && modalType == 'encounter'} onDismiss={() => {hideModal('encounter')} } contentContainerStyle={ styles.modalContainer }>
                          <View style={styles.formHeader}>
                            { toggle == 'edit' ?
                            <Text style={styles.formHeaderText}>Edit Encounter</Text>
                            :
                            null
                            }
                          </View>
                          {
                            toggle == 'edit' ?
                            <EncounterForm encounter={ encounter } handleSubmit={ updateEncounterHandler }
                            cancelEncounterHandler={ () => hideModal('encounter') }/>
                            :
                            null
                          }
                        </Modal>
{/* Render Google Floating Action Button */}

              <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'sword-cross', label: 'Start Encounter', onPress: () => startEncounter() },
                { icon: 'pencil-outline', label: 'Edit Encounter', onPress: () => {
                  setToggle('edit');
                  showModal('encounter');
                }},
                { icon: 'account-plus-outline', label: 'Add Players', onPress: () => {
                  setToggle('create');
                  showModal('player');
                }},
                { icon: 'emoticon-devil-outline', label: 'Add Monsters', onPress: () => {
                  setToggle('create');
                  showModal('monster');
                }},
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

EditEncounterScreen.navigationOptions = (navData, encounter) => {
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
    height: '90%',

  },
  listViewWrapper: {
    height: '80%'
  },
  playerListWrapper: {
    marginBottom: 10,
  },
  monsterListWrapper: {
    marginTop: 10,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  difficultyWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  labelText: {
    color: 'white',
  },
  difficultyBar: {
    marginTop: 5,
    alignSelf: 'center',
  },
  expandButton: {
    padding: 5,
  },
  expandInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandText: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    height: '85%',
    backgroundColor: 'white',
    padding: 10,
  },
  formHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  formHeaderText: {
    fontSize: 20,
    paddingLeft: 16,
    color: "black",
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toggleButton:{
    marginTop: 10,
    width: "50%",
    borderRadius: 0,
  },
  input: {
    marginBottom: 10,
  },
});



 export default EditEncounterScreen;
