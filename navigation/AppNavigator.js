import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import EncountersScreen from '../screens/EncountersScreen';
import EncounterScreen from '../screens/EncounterScreen';
import PartiesScreen from '../screens/PartiesScreen';
import PartyScreen from '../screens/PartyScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MonstersScreen from '../screens/MonstersScreen';
import MonsterScreen from '../screens/MonsterScreen';

const EncounterStack = createStackNavigator({
  Encounters: EncountersScreen,
  Encounter: {
    screen: EncounterScreen
  },
});

EncounterStack.navigationOptions = {
  drawerIcon: (
    <Icon name='sword-cross' size={26} />
  )
};

const PartyStack = createStackNavigator({
  Parties: PartiesScreen,
  Party: PartyScreen,
});

PartyStack.navigationOptions = {
  drawerIcon: (
    <Icon name='account-group-outline' size={26} />
  )
};

const PlayerStack = createStackNavigator({
  Players: PlayersScreen,
  Player: PlayerScreen,
});

PlayerStack.navigationOptions = {
  drawerIcon: (
    <Icon name='account-multiple-outline' size={26} />
  )
};


const MonsterStack = createStackNavigator({
  Monsters: MonstersScreen,
  Monster: MonsterScreen,
});

MonsterStack.navigationOptions = {
  drawerIcon: (
    <Icon name='emoticon-devil-outline' size={26} />
  )
};

const AppNavigator = createDrawerNavigator({
  Encounters: EncounterStack,
  Parties: PartyStack,
  Players: PlayerStack,
  Monsters: MonsterStack,
});

export default createAppContainer(AppNavigator);