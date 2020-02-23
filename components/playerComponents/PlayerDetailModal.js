import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ImageBackground, ScrollView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton, Avatar, Modal, Portal, Badge } from 'react-native-paper';

const PlayerDetailModal = props => {

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
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginRight: 5,}}> { props.player.name } </Text>
            <Text style={{ fontSize: 24, color: 'grey', fontStyle: 'italic'}}> Level { props.player.level } </Text>
            <Text style={{ fontSize: 24, color: 'grey', fontStyle: 'italic'}}> { props.player.className } </Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={ styles.headerStats }>
              <Icon name='shield-outline' size={20} />
              <Text style={{ fontSize: 18 }}> Armor Class: { props.player.stats.ac } </Text>
            </View>
            <View style={ styles.headerStats }>
              <Icon name='dice-d20' size={20} />
              <Text style={{ fontSize: 18 }}> Initiative: +{ props.player.initiativeBonus } </Text>
            </View>
            <View style={ styles.headerStats }>
              <Icon name='heart-outline' size={20} />
              <Text style={{ fontSize: 18 }}> HP: { props.player.stats.hp }/{ props.player.stats.maxHp} </Text>
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
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Str: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Dex: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Con: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
            </View>

            <View style={ styles.abilityScoreContainer}>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Int: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Wis: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
              <View style={ styles.abilityScoreItem }>
                <Text style={{ fontSize: 18 }} > Cha: _ </Text>
                <Badge style={{color: 'white', backgroundColor: 'grey'}}>+2</Badge>
              </View>
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
          <Button onPress={() => props.onDismiss }>Dismiss</Button>
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

export default PlayerDetailModal;
