import React from "react";
import { Text, Switch as RNSwitch } from "react-native-paper";
import { withFormikControl } from "react-native-formik";

class Switch extends React.PureComponent {
  render() {
    const { errors, value, setFieldValue, input } = this.props;
    console.log("SWITCH VALUE: ", this.props.input.name, this.props.value);
    return (
      <React.Fragment>
        <Text>{this.props.input.label}</Text>
        <RNSwitch name={this.props.input.name} value={ this.props.value } onValueChange={ (value) => setFieldValue(this.props.input.name, value) } />
      </React.Fragment>
    );
  }
}

export default withFormikControl(Switch);
