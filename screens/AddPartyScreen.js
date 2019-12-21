/* aka Encounter Detail Screen, shows selected encounter details and allows edit before ActiveEncounterScreen */

import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import * as partyActions from '../store/actions/parties'; //Redux Actions

import CustomHeaderButton from '../components/HeaderButton';
import PartyForm from '../components/partyComponents/PartyForm';


const AddEncounterScreen = props => {
  const dispatch = useDispatch();

  // Reset to new Encounter with EncountersList on top...
  const resetAction = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: 'Encounters' }),
      NavigationActions.navigate({ routeName: 'Encounter' }),
    ],
  });

  const addPartyHandler = ( encounter ) => {
    dispatch(partyActions.addParty(encounter));
    props.navigation.dispatch(resetAction);
  };

 return (
   <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <PartyForm addPartyHandler={ addPartyHandler }/>
      </View>
    </ImageBackground>
  );
}

AddEncounterScreen.navigationOptions = navData => {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },


  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});



 export default AddEncounterScreen;
