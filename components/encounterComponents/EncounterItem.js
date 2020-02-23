import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const EncounterItem = props => {

  return (
      <TouchableOpacity onPress={() => { props.navigate("EditEncounter", { id: props.encounter.id, title: props.encounter.title })} }>
        <View style={ (props.index == 0 ? [styles.first, styles.listItem]: styles.listItem)  }>
        <View style={ styles.encounterTitleWrapper }>
          <Text style={ styles.encounterName}> { props.encounter.title } </Text>
          <View style={ styles.partyWrapper }>
            <Icon name="account-group-outline" size={16} color="white" />
          <Text style={ styles.partyTitle }> { props.encounter.party.title? props.encounter.party.title : "none" } </Text>
          </View>
        </View>
        <View style={ styles.encounterStats }>
          <View>
            <Icon name="account-outline" size={28} color="white" />
          <Text style={ styles.encounterName}> { props.encounter.party.players? " "+props.encounter.party.players.length : 0} </Text>
          </View>
          <View>
            <Icon name="emoticon-devil-outline" size={28} color="white"/>
            <Text style={ styles.encounterName}> { " "+props.encounter.monsters.length } </Text>
          </View>
          <View>
            <Icon name="account-heart-outline" size={28} color="white" />
            <Text style={ styles.encounterName}> { " "+props.encounter.allies.length } </Text>
          </View>
        </View>
        </View>
      </TouchableOpacity>
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
  encounterTitleWrapper: {
    flex: 2,
    flexDirection: 'column',
  },
  partyWrapper: {
    marginTop: 2,
    paddingLeft: 3,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  partyTitle:{
    color: "white",
    fontSize: 14,
  },
  encounterName:{
    fontSize:18,
    color: "white",
  },
  encounterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  gradientContainer: {
    borderRadius: 5,
    marginBottom: 2
  },
  swipeableView:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    height: '75%',
    padding: 10,
    width: 150,
    backgroundColor: 'rgba(255, 61, 0, 0.5)'
  },
  actionText: {
    fontSize: 20,
    color: 'white'
  },
  rightAction: {
    height: '100%',
  },
});

export default EncounterItem;
