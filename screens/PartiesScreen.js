/* aka Party List Screen, shows a user's Party Group of Players list */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, connect } from 'react-redux';
import { FAB, } from 'react-native-paper';

import CustomHeaderButton from '../components/HeaderButton';
import PartyList from '../components/partyComponents/PartyList';

import * as partyActions from '../store/actions/parties'; //Redux Actions


let PartiesScreen = ({ onUndo, onRedo, addParty, updateParty, deleteParty, parties, players, ...props}) => {
  const [ open, setOpen ] = useState(false);

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <PartyList parties={parties} players={players}
        handlePress={() => console.log("Hello")}
        handleLongPress={() => console.log("Hello2")} />
      </View>
      <FAB.Group
      open={open}
      icon={open ? 'close' : 'dots-vertical'}
      actions={[
        { icon: 'filter-variant', label: 'Filter', onPress: () => { console.log("Filter") } },
        { icon: 'account-group-outline', label: 'Add Party', onPress: () => { showAddModal() } },
      ]}
      onStateChange={({ open }) => setOpen(open)}
      onPress={() => {
        if (open) {

          // do something if the speed dial is open
        }
      }}
      />
    </ImageBackground>
  );
}

PartiesScreen.navigationOptions = navData => {
  return {
    headerTitle: "Parties",
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

const mapStateToProps = (state, ownProps) => {
    return {
      parties:  state.parties.parties,
      players: state.players.players
    }
};
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    addParty: (party) => dispatch(partyActions.addParty(party)),
    updateParty: (party) => dispatch(partyActions.updateParty(party)),
    deleteParty: (party) => dispatch(partyActions.deleteParty(party)),
  }
};

PartiesScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PartiesScreen);


 export default PartiesScreen;
