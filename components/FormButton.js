import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const FormButton = props => {
    return (
      <View>
        <TouchableWithoutFeedback { ...props } onPress={ props.onPress } >
          { props.iconPosition == "right"?
            <View style={ [styles.button, styles.right, { backgroundColor: `${props.color}`}] }>
              <Text style={ styles.buttonText}> { props.text }</Text>
              <Icon name={ props.icon } color="white" size={20} />
            </View>
            :
            <View style={ [styles.button, styles.left, { backgroundColor: `${props.color}`}] }>
              <Icon name={ props.icon } color="white" size={20} />
              <Text style={ styles.buttonText}> { props.text }</Text>
            </View>

          }
        </TouchableWithoutFeedback>
      </View>
  );

};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  right: {
    borderLeftWidth: 1,
  },
  left: {
    borderRightWidth: 1,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default FormButton;
