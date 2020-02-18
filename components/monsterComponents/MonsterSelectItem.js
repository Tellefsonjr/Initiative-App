import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar } from 'react-native-paper';

const MonsterSelectItem = props => {

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
        onLongPress={ () => handleLongPress(props.monster.id) }>
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
          <View style={{ alignItems: 'center'}}>
              <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.type } </Text>
              <Icon color="white" size={16} name="tag-outline" />
            </View>
            <View style={{ alignItems: 'center'}}>
              <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.size } </Text>
              <Icon color="white" size={16} name="tape-measure" />
            </View>
            <View style={{ alignItems: 'center'}}>
              <Text allowsFontScaling style={ styles.monsterStatText}> { props.monster.cr } </Text>
              <Icon color="white" size={16} name="sword-cross" />
            </View>
          </View>
          {
            props.isSelected?
            <View style={ styles.buttonContainer }>
              <IconButton onPress={() => decreaseMonster(props.monster.id)}
                icon="minus"
                color="white"
                size={18}
              />
              <Text style={{ color: "white", fontSize: 14}}>{ props.isSelected.count }</Text>
              <IconButton onPress={() => handlePress(props.monster.id) }
                icon="plus"
                color="white"
                size={18}
              />
            </View>
            :
          <View style={ styles.buttonContainer }>
            <Button onPress={() => handlePress(props.monster.id)}
              compact={true}
              color="white"
              style={ styles.addButton }
              icon="plus">Add</Button>
          </View>
          }
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
    color: 'white'
  },
  buttonContainer: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  addButton: {
    padding: 2,
  }
});

export default MonsterSelectItem;
