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


import * as encounterActions from '../store/actions/encounters'; //Redux Actions
import * as playerActions from '../store/actions/players'; //Redux Actions

const EncounterScreen = props => {
  const [open, setOpen ] = useState( false );
  const [visible, setVisible ] = useState( false );
  const [modalType, setModalType] = useState( '' );

  const dispatch = useDispatch();

  const encounter = useSelector(state => state.encounters.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const [ progress, setProgress ] = useState( encounter.difficulty );
  console.log("Encounter.players", encounter.players);
  const players = useSelector(state => state.players.players.filter((player) => encounter.party.players.includes(player.id)))
  const barWidth = Dimensions.get('screen').width - 30;

  const addPlayerHandler = ( player ) => {
    console.log("MADE IT TO THE ENCOUNTER SCREEN: ", player);
    dispatch(playerActions.addPlayer(player));
    console.log("NONO, READ THIS~~~>", encounter);
    encounter.party.players.push(player.id);
    console.log("READ THIS~~~~~~>", encounter);
    dispatch(encounterActions.updateEncounter(encounter));
    setVisible(false);
  };
  const cancelPlayerHandler = (  ) => {
    setVisible(false);
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
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ styles.modalContainer }>
              <PlayerForm addPlayerHandler={ addPlayerHandler } cancelPlayerHandler={ cancelPlayerHandler } />
            </Modal>
          </Portal>
        </Provider>

          <Provider>
            <Portal>
              <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'star', label: 'Start Encounter', onPress: () => console.log('Pressed star')},
                { icon: 'email', label: 'Add Ally', onPress: () => console.log('Pressed email') },
                { icon: 'bell', label: 'Add Monster', onPress: () => console.log('Pressed notifications') },
                { icon: 'plus', label: 'Add Player', color: '#00B358', onPress: () => {showModal('player')} },
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
    backgroundColor: 'white'
  }
});



 export default EncounterScreen;
