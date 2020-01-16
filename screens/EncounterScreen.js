/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveEncounterScreen */

import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';

import PlayerList from '../components/playerComponents/PlayerList';

import * as encounterActions from '../store/actions/encounters'; //Redux Actions

const EncounterScreen = props => {
  const dispatch = useDispatch();

  const encounter = useSelector(state => state.encounters.encounters.find((encounter) => encounter.id == props.navigation.getParam("id")));
  const [ progress, setProgress ] = useState( encounter.difficulty );
  console.log("Encounter.players", encounter.players);
  const players = useSelector(state => state.players.players.filter((player) => encounter.party.players.includes(player.id)))
  const barWidth = Dimensions.get('screen').width - 30;

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

        <PlayerList players={players} selectable={false} selectedIds={[]}/>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});



 export default EncounterScreen;
