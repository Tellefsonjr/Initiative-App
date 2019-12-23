import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PartyItem = props => {
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-301, -300, -50, 0],
      outputRange: [300, 0, 0, 1],
    });
    return (
      <TouchableWithoutFeedback style={styles.rightAction} onPress={ props.onDelete.bind(this, props.party.id) }>
        <Animated.View
          style={[
            styles.swipeableView,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          <Icon name="trash-can" size={26} color="white" />
          <Text style={ styles.actionText } > Delete?</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Swipeable
      renderRightActions={this.renderRightActions}>
      <TouchableOpacity onPress={ props.handlePress.bind(this, props.party.id) }>
        <View style={ styles.listItem }>
          <View style={ styles.partyTitleWrapper }>
            <Text style={ styles.partyName}> { props.party.title } </Text>
            <View style={ styles.partyWrapper }>
              <Icon name="account-group-outline" size={16} color="white" />
              <Text style={ styles.partyTitle }> Party title... </Text>
            </View>
          </View>
          <View style={ styles.partyStats }>
            <View>
              <Icon name="account-outline" size={28} color="white" />
              <Text style={ styles.partyName}> { " "+props.party.players.length } </Text>
            </View>
            <View>
              <Text style={ styles.textIcon }> Lvl:</Text>
              <Text style={ styles.partyName}> ~{ props.party.players.length }</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>

  );

};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    // backgroundColor: 'transparent',
    // backgroundColor: '#F5BB73',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    // borderWidth: 1,
    borderRadius: 5,

    // width: "90%"
  },
  partyTitleWrapper: {
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
  partyName:{
    fontSize:18,
    color: "white",
  },
  textIcon:{
    padding: 2,
    fontSize: 20,
    color: "white",
    letterSpacing: .5,
  },
  longValueText:{
    color: "white",
    fontSize: 16,
  },
  partyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default PartyItem;
