import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, Animated, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MonsterItem = props => {

  return (
      <TouchableWithoutFeedback onPress={ props.handlePress.bind(this, props.id) }>
        <View style={ (props.index == 0 ? [styles.first, styles.listItem]: styles.listItem)  }>
          <View style= { styles.imageWrapper }>
            <Image
              style={ styles.monsterImage }
              source= { require("../../assets/images/whtenemy.png") }
            />
          </View>
          <View>
            <Text style={ styles.monsterName}> { props.monster.name } </Text>
            <Icon name="account-outline" size={28} color="white" />
          </View>

        </View>
      </TouchableWithoutFeedback>
  );

};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    // backgroundColor: 'transparent',
    // backgroundColor: '#F5BB73',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    // borderWidth: 1,
    borderRadius: 5,

    // width: "90%"
  },
  imageWrapper:{
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 2,
    padding: 5,
  },
  monsterImage: {
    height: 40,
    width: 40,
  },
  monsterName:{
    fontSize:25,
    color: "white",
  },
  monsterInitiative:{
    fontSize:30,
    color: "white",
    marginTop: 3,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 12,
  },
  initiativeBG: {
    height: 55,
    width: 55,
    color: "white",
    backgroundColor: "transparent",
    padding: 3,
  },
  gradientContainer: {
    borderRadius: 5,
    marginBottom: 2
  },
  first: {
    borderWidth: 2,
    borderColor: "#FF3D00",
    shadowColor: "#FF3D00",
    shadowOffset: {
    	width: 0,
    	height: 12,
    },
    shadowOpacity: .58,
    shadowRadius: 16.00,
    },
    swipeableView:{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 15,
      height: '75%',
      padding: 10,
      width: 300,
      backgroundColor: 'rgba(255, 61, 0, 0.5)'
    },
    actionText: {
      fontSize: 20,
    },
    rightAction: {
      height: '100%',
    },
    button: {
      width: '40%',
    }
});

export default MonsterItem;
