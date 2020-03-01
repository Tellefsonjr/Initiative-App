import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar } from 'react-native-paper';

const PlayerItem = props => {
  const handlePress = (player) => {
    props.handlePress(player);
  }
  const handleLongPress = (player) => {
    props.handleLongPress(player);
  }
  const onDelete = (playerId) => {
    props.onDelete(playerId);
  }
  return (
    <TouchableWithoutFeedback
      onPress={ () => handlePress(props.player) }
      onLongPress={ () => handleLongPress(props.player) }>
      <View style={ styles.listItem } >
        <View style= { styles.imageWrapper }>
          <Avatar.Image
            size={24}
            style={ styles.playerImage }
            source= { require("../../assets/images/whtenemy.png") }
          />
        </View>
        <View>
          <Text allowsFontScaling style={ styles.playerName}>{ props.player.name } </Text>
        </View>
        <View style={ styles.statsContainer }>
        <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.playerStatText}> { props.player.className } </Text>
            <Icon size={16} color="grey" name="tag-outline" />
          </View>
          <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.playerStatText}> lv { props.player.stats.level } </Text>
            <Icon size={16} color="grey" name="account-star-outline" />
          </View>
          <View style={ styles.statItem }>
            <Text allowsFontScaling style={ styles.playerStatText}> { props.player.stats.hp } </Text>
            <Icon size={16} color="grey" name="heart-outline" />
          </View>
        </View>
          <View style={ styles.buttonContainer }>
            <Button onPress={() => onDelete(props.player.id)}
            style={ styles.removeButton }
            compact={true}
            dark={true}
            color="red"
            icon="trash-can">
            </Button>
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
    marginHorizontal: 5,
  },
  imageWrapper:{
    marginRight: 5,
  },
  playerImage: {

  },
  playerName: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'white',
  },
  playerStatText: {
    fontSize: 14,
    color: 'white'
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

export default PlayerItem;
