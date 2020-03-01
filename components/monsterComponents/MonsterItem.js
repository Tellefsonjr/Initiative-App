import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar, Badge } from 'react-native-paper';

const MonsterItem = props => {
  const handlePress = (monsterId) => {
    props.handlePress(monsterId);
  }
  const handleLongPress = (monsterId) => {
    props.handleLongPress(monsterId);
  }
  const decreaseMonster = (monsterId) => {
    props.decreaseMonster(monsterId);
  }
  return (
    <TouchableWithoutFeedback
      onPress={ () => console.log("What to do here?") }
      onLongPress={ () => handleLongPress(props.monster) }>
      <View style={ styles.listItem } >
        <View style= { styles.imageWrapper }>
          <Avatar.Image
            size={24}
            style={ styles.monsterImage }
            source= { require("../../assets/images/whtenemy.png") }
          />
        </View>
        <View>
          <Text allowsFontScaling style={ styles.monsterName}>{ props.monster.name } </Text>
        </View>
        <View style={ styles.statsContainer }>
        <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.type } </Text>
            <Icon size={16} color='grey' name="tag-outline" />
          </View>
          <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.size } </Text>
            <Icon size={16} color='grey' name="ruler" />
          </View>
          <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.cr } </Text>
            <Icon size={16} color='grey' name="sword-cross" />
          </View>
          <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.monsterStatText}> { props.count } </Text>
            <Icon size={16} color='grey' name="emoticon-devil-outline" />
          </View>
        </View>
        <View style={ styles.buttonContainer }>
          <Button onPress={() => handlePress(props.monster.id)}
            styles={ styles.removeButton }
            compact={true}
            dark={true}
            color="red"
            icon="trash-can" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  imageWrapper:{
    marginRight: 5,
  },
  monsterImage: {

  },
  monsterName: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'white',
  },
  monsterStatText: {
    fontSize: 14,
    color: 'white',
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

export default MonsterItem;
