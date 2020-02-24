import React, { useState } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar, } from 'react-native-paper';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo, ...props}) => {

    return(
      <Snackbar
          style={{ width: '75%' }}
          visible={ props.visible }
          duration={true}
          onDismiss={() => props.onDismiss }
          action={{
            label: 'Undo',
            onPress: () => {props.handlePress}
          }}>
          {props.text}
        </Snackbar>
    )
};


const mapStateToProps = state => {
  state.encounters.past? console.log(state.encounters.present.encounters[0].state) : null;
  return {
    canUndo: state.encounters.past.length > 0,
    canRedo: state.encounters.future.length > 0
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)

export default UndoRedo;
