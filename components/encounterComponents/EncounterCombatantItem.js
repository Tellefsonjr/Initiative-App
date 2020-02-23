import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar, ProgressBar } from 'react-native-paper';

const EncounterCombatantItem = props => {
  const handlePress = (combatant) => {
    console.log("Pressed: ", combatant);
    props.handlePress(combatant);
  }
  const handleLongPress = (combatant) => {
    props.handleLongPress(combatant);
  }
  const onDelete = (combatantId) => {
    props.onDelete(combatantId);
  }
  return (
    <TouchableWithoutFeedback
      onPress={ () => handlePress(props.combatant) }
      onLongPress={ () => handleLongPress(props.combatant) }>
      {/* <View style={{ borderRadius: 2, backgroundColor: props.index==0 ? 'rgba(255, 100, 79, 0.2)' : props.index==1? 'rgba(224, 211, 39, 0.1)' : 'rgba(255, 255, 255, 0)' }}> */}
      <View style={ [ styles.listItem, props.index == 0? styles.first : props.index == 1? styles.second : styles.notFirst] } >
        <View style={ styles.listItemInner }>
          <View style= { styles.imageWrapper }>
            <Avatar.Image
              size={24}
              style={ styles.combatantImage }
              source= { require("../../assets/images/whtenemy.png") }
            />
          </View>
          <View>
            <Text allowsFontScaling style={ styles.combatantName}>{ props.combatant.name } </Text>
          </View>
          <View style={ styles.statsContainer }>
            <View style={ styles.statItem }>
              <Icon size={26} color="grey" name={props.combatant.cType == 'player'? "account-circle-outline" : "emoticon-devil-outline"} />
            </View>
            <View style={ styles.statItem }>
              <Icon size={18} color="grey" name="shield-half-full" />
              <Text allowsFontScaling style={ styles.combatantStatText}> { props.combatant.stats.ac } </Text>
            </View>
            {/* TO DO: If user != encounter creator, hide Monster HP */}
            <View style={ styles.statItem }>
              <Icon size={18} color="grey" name="heart-outline" />
              <Text allowsFontScaling style={ styles.combatantStatText }> { props.combatant.stats.hp } </Text>
            </View>
            <View style={ styles.statItem  }>
              <Icon size={18} color="grey" name="dice-d20" />
              <Text allowsFontScaling style={ styles.combatantStatText}> { props.combatant.initiative } </Text>
            </View>
          </View>

        </View>
        <View style={{ width: '100%', height: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{ width: '5%'}}>
            <Icon size={14} color="grey" name="heart-outline" />
          </View>
          <View style={{ width: '95%', height: 5}}>
            <ProgressBar style={{height: 2}} progress={props.hpPercentage} color={props.hpPercentage > .5? 'green' : 'red'} />
          </View>
        </View>
      </View>
      { /*</View> */}
    </TouchableWithoutFeedback>
  );

};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
  },
  listItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  first: {
    borderWidth: 2,
    borderColor: 'rgba(255, 100, 79, 0.8)',
    marginVertical: 15,
  },
  second: {
    borderWidth: 1,
    marginLeft: '5%',
    borderColor: 'rgba(224, 211, 39, 0.7)',
    marginVertical: 10,
  },
  notFirst: {
    marginLeft: '8%',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  imageWrapper:{
    marginRight: 5,
  },
  combatantImage: {

  },
  combatantName: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'white',
  },
  combatantStatText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
  },
  buttonContainer: {
    height: '100%',
    width: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  removeButton: {
    padding: 2,
  }
});

export default EncounterCombatantItem;
