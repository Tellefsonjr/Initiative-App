import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, ScrollView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar, Modal, Portal, Badge } from 'react-native-paper';
import * as _ from 'lodash';

const MonsterDetailModal = props => {

  const renderAbilityScores = (array) => {
    const views = array.map( (abilityScore, i) => {
      let bonuses = props.monster.stats.abilityScoreBonus;
      return(
        <View key={i} style={ styles.abilityScoreItem }>
          <Text style={{ fontSize: 18 }} > {_.slice(_.startCase(abilityScore), 0, 3)}: {props.monster.stats.abilityScores[abilityScore] } </Text>
          <Badge style={{color: 'white', backgroundColor: 'grey'}}>+{bonuses[abilityScore]}</Badge>
        </View>
      )
    });
    return (views);
  }
  return (
      <Modal
        visible={ props.visible }
        onDismiss={ props.onDismiss }
        contentContainerStyle={ styles.modal }>
        <View style={ styles.modalHeader }>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image
              size={24}
              style={ styles.combatantImage }
              source= { require("../../assets/images/whtenemy.png") }
            />
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginRight: 5,}}> { props.monster.name } </Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 24}}>
            <Text style={{ fontSize: 22, color: 'grey', fontStyle: 'italic'}}> { props.monster.type } </Text>
            <Text style={{ fontSize: 22, color: 'grey', fontStyle: 'italic'}}> CR { props.monster.cr } </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={ styles.headerStats }>
              <Icon name='shield-outline' size={20} />
              <Text style={{ fontSize: 18 }}> Armor Class: { props.monster.stats.ac } </Text>
            </View>
            <View style={ styles.headerStats }>
              <Icon name='dice-d20' size={20} />
              <Text style={{ fontSize: 18 }}> Initiative: +{ props.monster.stats.initiativeBonus } </Text>
            </View>
            <View style={ styles.headerStats }>
              <Icon name='heart-outline' size={20} />
              <Text style={{ fontSize: 18 }}> HP: { props.monster.stats.hp }/{ props.monster.stats.maxHp} </Text>
            </View>
          </View>
        </View>
        <View style={ styles.scrollContainer }>
          <ScrollView>
{/* Ability Scores */}
            <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.7)',}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                Ability Scores:
              </Text>
            </View>
            <View style={ styles.abilityScoreContainer}>
            {
              renderAbilityScores(['strength', 'dexterity', 'constitution'])
            }

            </View>
            <View style={ styles.abilityScoreContainer}>
            {
              renderAbilityScores(['intelligence', 'wisdom', 'charisma'])
            }

            </View>
{/* Saving Throws */}
            <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.7)',}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                Saving Throws:
              </Text>
            </View>
            <View style={ styles.abilityScoreContainer}>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Str: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Dex: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Con: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
            </View>
            <View style={ styles.abilityScoreContainer}>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Int: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Wis: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Cha: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
            </View>
{/* Skills */}
            <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.7)',}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                Skills:
              </Text>
            </View>
            <View style={ styles.abilityScoreContainer}>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Str: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Dex: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Con: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
            </View>
            <View style={ styles.abilityScoreContainer}>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Int: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Wis: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Icon name='checkbox-blank-circle-outline' size={12} />
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} > Cha: </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
            </View>
          </ScrollView>

        </View>
        <View style={ styles.buttonContainer }>
          <Button onPress={props.onDismiss }>Dismiss</Button>
        </View>
      </Modal>
  );

};

const styles = StyleSheet.create({
  container: {
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
  modal: {
    backgroundColor: 'white',
    height: '75%',
    padding: 15,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.7)',
  },
  headerStats: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: '70%',
    padding: 10,
    borderWidth: .5,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 5,
  },
  abilityScoreContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  abilityScoreItem:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },


});

export default MonsterDetailModal;
