import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export default class LargeTextEntryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  handleChange(text) {
    let newState = {data: text};
    this.setState(newState);
    this.props.handler(newState);
  }

  render() {
    return (
      <View>
      <TextInput
        style={styles.entryInput}
        value={this.state.data}
        onChangeText={text => this.handleChange(text)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  entry: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'blue'
  },
  entryInput: {
    borderWidth: 1,
    borderColor: 'green'
  }
});
