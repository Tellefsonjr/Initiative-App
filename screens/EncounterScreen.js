/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveEncounterScreen */

import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Portal, Provider, Modal, Button } from 'react-native-paper';

import CustomHeaderButton from '../components/HeaderButton';


import PlayerList from '../components/playerComponents/PlayerList';
import PlayerForm from '../components/playerComponents/PlayerForm';
import PlayerSelect from '../components/playerComponents/PlayerSelect';

import MonsterList from '../components/monsterComponents/MonsterList';
import MonsterForm from '../components/monsterComponents/MonsterForm';
import MonsterSelect from '../components/monsterComponents/MonsterSelect';

import * as encounterActions from '../store/actions/encounters'; //Redux Actions
import * as playerActions from '../store/actions/players'; //Redux Actions
import * as monsterActions from '../store/actions/monsters'; //Redux Actions

const EncounterScreen = props => {
  const encounter = useSelector(state => state.encounters.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const players = useSelector(state => state.players.players.filter((player) => encounter.party.players.includes(player.id)));
  console.log("These are the players", players, players.length);

  const [open, setOpen ] = useState( false );
  const [visible, setVisible ] = useState( false );
  const [ toggle, setToggle ] = useState( 'create' );
  const [modalType, setModalType] = useState( '' );
  const [ progress, setProgress ] = useState( encounter.difficulty );

  const barWidth = Dimensions.get('screen').width - 30;
  const dispatch = useDispatch();

  const createPlayerHandler = ( player ) => {
    dispatch(playerActions.addPlayer(player));
    const newEncounter = encounter;
    console.log("New encounter: ", newEncounter);
    newEncounter.party.players.push(player.id);
    console.log("New encounter after: ", newEncounter);
    dispatch(encounterActions.updateEncounter(newEncounter));
    setVisible(false);
  };
  const updateEncounterPlayers = ( updatedPlayers ) => {
    const updatedEncounter = encounter;
    updatedEncounter.party.players = updatedPlayers.map(player => player.id);
    updateEncounterHandler(updatedEncounter);
  };
  const updateEncounterHandler = ( encounter ) => {
    console.log("Updated encounter::::::::", encounter);
    dispatch(encounterActions.updateEncounter(encounter));
    setVisible(false);
  };
  const createMonsterHandler = ( monster ) => {
    dispatch(monsterActions.addPlayer(monster));
    encounter.monsters.push(monster.id);
    dispatch(encounterActions.updateEncounter(encounter));
    setVisible(false);
  };
  const updateEncounterMonsters = ( updatedMonsters ) => {
    const updatedEncounter = encounter;
    updatedEncounter.monsters = updatedMonsters.map(monster => monster.id);
    updateEncounterHandler(updatedEncounter);
  };
  const showModal = (type) => {
    setModalType(type);
    setVisible(true);
  };
  const hideModal = (type) => {
    setVisible(false);
  }

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
        <View style={ styles.playerListWrapper }>
          <PlayerList players={players} selectable={false} selectedIds={[]}/>
        </View>

        <Provider>
          <Portal>
            <Modal visible={visible && modalType == 'player'} onDismiss={() => {hideModal('player')} } contentContainerStyle={ styles.modalContainer }>
              <View style={styles.formHeader}>
                <Text style={styles.formHeaderText}>Add Player</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  icon="account-plus-outline"
                  onPress={() => {setToggle('create')}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode={toggle == 'create' ? 'contained' : 'outlined' }>
                  Create Player
                </Button>
                <Button
                  icon="account-details"
                  onPress={() => {setToggle('select')}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode={toggle == 'select' ? 'contained' : 'outlined' }>
                  Select Players
                </Button>
              </View>
              {
                toggle == 'create' ?
                  <PlayerForm handleSubmit={ createPlayerHandler } handleCancel={ () => {hideModal('player') } } />
                :
                <View style={{flex: 1}}>
                  <PlayerSelect players={players} handleSubmit={ updateEncounterPlayers } handleCancel={ () => {hideModal('player') } } />
                </View>
              }

            </Modal>
            <Modal visible={visible && modalType == 'monster'} onDismiss={() => {hideModal('monster')} } contentContainerStyle={ styles.modalContainer }>
              <View style={styles.formHeader}>
                <Text style={styles.formHeaderText}>Add Monster</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  icon="emoticon-devil-outline"
                  onPress={() => {setToggle('create')}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode={toggle == 'create' ? 'contained' : 'outlined' }>
                  Create Monster
                </Button>
                <Button
                  icon="account-details"
                  onPress={() => {setToggle('select')}}
                  style={ styles.toggleButton }
                  color='#00578A'
                  mode={toggle == 'select' ? 'contained' : 'outlined' }>
                  Select Monsters
                </Button>
              </View>
              {
                toggle == 'create' ?
                <MonsterForm handleSubmit={ createMonsterHandler } handleCancel={ () => {hideModal('monster') } } />
                :
                <View style={{flex: 1}}>
                  <MonsterSelect monsters={encounter.monsters} handleSubmit={ updateEncounterMonsters } handleCancel={ () => {hideModal('monster') } } />
                </View>
              }

            </Modal>
          </Portal>
        </Provider>

          <Provider>
            <Portal>
              <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'sword-cross', label: 'Start Encounter', onPress: () => console.log('Pressed star')},
                { icon: 'account-heart-outline', label: 'Add Ally', onPress: () => console.log('Pressed email') },
                { icon: 'emoticon-devil-outline', label: 'Add Monster', onPress: () => {showModal('monster')} },
                { icon: 'account-plus-outline', label: 'Add Player', color: '#00B358', onPress: () => {showModal('player')} },
              ]}
              onStateChange={({ open }) => setOpen(open)}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
              />
            </Portal>
          </Provider>
      </View>
    </ImageBackground>
  );
}

EncounterScreen.navigationOptions = navData => {
  return {
    headerTitle: "Encounters",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
      </HeaderButtons>
    )
  };
};

EncounterScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("title"),
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  playerListWrapper: {
    height: '100%',
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
    padding: 5,
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



 export default EncounterScreen;
