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
import * as monsterActions from '../store/actions/monsters'; //Redux Actions

const EditEncounterScreen = props => {
  const encounter = useSelector(state => state.encounters.present.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const players = useSelector(state => state.players.players.filter((player) => encounter.party.players.includes(player.id)));
  const monsters = useSelector(state => state.monsters.monsters.filter((monster) => _.matches(encounter.monsters, monster.id)));

  const [open, setOpen ] = useState( false );
  const [visible, setVisible ] = useState( false );
  const [ toggle, setToggle ] = useState( 'create' );
  const [ expandedType, setExpandedType ] = useState(['']);
  const [ expanded, setExpanded ] = useState(true);
  const [modalType, setModalType] = useState( '' );
  const [ progress, setProgress ] = useState( encounter.difficulty );
  const [ editPlayer, setEditPlayer ] = useState({});

  const barWidth = Dimensions.get('screen').width - 30;
  const dispatch = useDispatch();

  const createPlayerHandler = ( player ) => {
    dispatch(playerActions.addPlayer(player));
    const newEncounter = encounter;
    console.log("New encounter: ", newEncounter);
    newEncounter.party.players = newEncounter.party.players.concat(player.id);
    console.log("New encounter after: ", newEncounter);
    dispatch(encounterActions.updateEncounter(newEncounter));
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
    // console.log("New encounter: ", newEncounter);
    newEncounter.party.players = newEncounter.party.players.filter(p => p != playerId);
    // console.log("New encounter after: ", newEncounter);
    updateEncounterHandler(newEncounter);
  };
  const updateEncounterPlayers = ( updatedPlayers ) => {
    const updatedEncounter = encounter;
    updatedEncounter.party.players = updatedPlayers.map(player => player.id);
    updateEncounterHandler(updatedEncounter);
  };
  const updateEncounterHandler = ( encounter ) => {
    // console.log("Updated encounter::::::::", encounter);
    dispatch(encounterActions.updateEncounter(encounter));
    setVisible(false);
  };
  const createMonsterHandler = ( monster ) => {
    dispatch(monsterActions.addMonster(monster));
    encounter.monsters.push({ id: monster.id, count: 1});
    dispatch(encounterActions.updateEncounter(encounter));
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
    console.log("STARTING ENCOUNTER: ");
    const updatedEncounter = encounter;
    // Map through Players & Monsters to populate combatants [ { id, type, name (monster 1, 2, 3, ...), initiative, stats: {hp, ac,} }]
    if(!encounter.active){
      encounter.monsters.forEach( monster => {
        let m = monsters.find( mData => mData.id == monster.id);
        for( i=0; i < monster.count; i++){
          let roll = Math.floor(Math.random() * 20) + 1;
          //console.log(m.name, "rolled :", roll, "+", m.initiativeBonus);
          updatedEncounter.combatants.push({
            cId: Math.random(),
            refId: m.id,
            type: m.type,
            cr: m.cr,
            cType: 'monster',
            name: `${m.name} ${i+1}`,
            initiative: encounter.settings.autoRoll.monsters ? roll + m.initiativeBonus : 0,
            initiativeBonus: m.initiativeBonus,
            stats: {
              maxHp: m.maxHp,
              hp: m.hp,
              ac: m.ac,
              deathSaves: {
                failed: 0,
                succeeded: 0
              }
            }

          });
        }
      });
      players.forEach( player => {
        let roll = Math.floor(Math.random() * 20) + 1;
        console.log(player.name, "rolled :", roll, "+", player.initiativeBonus);
        updatedEncounter.combatants.push({
          cId: Math.random(),
          refId: player.id,
          cType: 'player',
          name: player.name,
          className: player.className,
          level: player.level,
          initiativeBonus: player.initiativeBonus,
          initiative: encounter.settings.autoRoll.players ? roll + player.initiativeBonus : 0,
          stats: {
            maxHp: player.maxHp,
            hp: player.hp,
            ac: player.ac,
            deathSaves: {
              failed: 0,
              succeeded: 0
            }
          }
        });
        updateEncounterHandler(updatedEncounter);
    });
  };
    props.navigation.navigate("ActiveEncounter", { id: encounter.id, title: encounter.title });
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

{/* Monster List view based on expanded && expandedType */}
<View style={ styles.playerListWrapper }>
        <TouchableRipple
          style={ styles.expandButton }
          onPress={() => handleExpand('players')}
          rippleColor="white"
        >
        <View style={ styles.expandInner }>
          <Icon name="account-outline" size={24} color="white">
            <Text style={{ fontSize: 24}}>{ encounter.party.players.length.toString() }</Text>
          </Icon>
          <Text style={ styles.expandText}>Players</Text>
          <Icon name={expanded && expandedType.includes("players")? "menu-up": "menu-down"} size={24} color="white" />
        </View>
        </TouchableRipple>
        {
          expanded && expandedType.includes('players') ?
          <View>

          {
            visible?
            null
            :
              <View style={styles.buttonContainer}>
                <Button
                  icon="account-plus-outline"
                  onPress={() => {setToggle('create'); showModal("player")}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode='contained'>
                Create
                </Button>
                <Button
                  icon="account-details"
                  onPress={() => {setToggle('select'); showModal("player")}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode='contained'>
                Select
                </Button>
              </View>
              }
              <PlayerList
                players={players}
                handlePress={ toggleEditPlayer }
                removePlayerHandler={removePlayerHandler}/>
              </View>
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
          <View>
          {
            visible?
            null
            :
          <View style={styles.buttonContainer}>
            <Button
              icon="emoticon-devil-outline"
              onPress={() => {setToggle('create'); showModal("monster")}}
              style={ styles.toggleButton }
              color='#00578A'
              mode='contained'>
              Create
            </Button>
            <Button
              icon="account-details"
              onPress={() => {setToggle('select'); showModal("monster")}}
              style={ styles.toggleButton }
              color='#00578A'
              mode='contained'>
              Select
            </Button>
          </View>
          }
            <MonsterSelect
              monsters={encounter.monsters}
              submitable={false}
              handleSubmit={updateEncounterMonsters}
              searchable={false}
              />
          </View>
            :
            null
        }
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
              {
                toggle == 'create' ?
                <MonsterForm handleSubmit={ createMonsterHandler } handleCancel={ () => {hideModal('monster') } } />
                :
                <MonsterSelect monsters={encounter.monsters} handleSubmit={ updateEncounterMonsters }
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
  playerListWrapper: {

  },
  monsterListWrapper: {

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
    height: '80%',
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
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  input: {
    marginBottom: 10,
  },
});



 export default EditEncounterScreen;
