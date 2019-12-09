/* aka Player Detail Screen, shows selected player details and allows edit of player */

import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';

const PlayerScreen = props => {
  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <Text>I'm the Player component</Text>
      </View>
    </ImageBackground>
  );
}

PlayerScreen.navigationOptions = navData => {
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



 export default PlayerScreen;
