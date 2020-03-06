import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';
import * as _ from 'lodash';

import PlayerList from '../playerComponents/PlayerList';


const PartyItem = props => {

  return (
    <View style={ styles.partyListWrapper }>
            <TouchableRipple onPress={() => { props.navigate("EditParty", { id: props.party.id, title: props.party.title })} }>
              <View style={ (props.index == 0 ? [styles.first, styles.listItem]: styles.listItem)  }>
              <View style={ styles.encounterTitleWrapper }>
                <Text style={ styles.encounterName}> { props.party.title } </Text>
                <View style={ styles.wrapper }>
                <Text style={ styles.title }> Avg Lv: { Math.floor(_.mean(_.flatMap(props.players, 'stats.level'))) } </Text>
                </View>
              </View>
              <View style={ styles.partyStats }>
                <View>
                  <Icon name="account-outline" size={24} color="white" />
                <Text style={ styles.statItem}> { props.party.players? " "+props.party.players.length : 0} </Text>
                </View>
              </View>
              </View>
            </TouchableRipple>
    </View>

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
    width: '80%',
    flexDirection: 'column',
  },
  wrapper: {
    marginTop: 2,
    paddingLeft: 3,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  title:{
    color: "white",
    fontSize: 14,
  },
  encounterName:{
    fontSize:18,
    color: "white",
  },
  encounterStats: {
    alignItems: 'center',
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem:{
    fontSize:16,
    color: "white",
  },
});

export default PartyItem;
