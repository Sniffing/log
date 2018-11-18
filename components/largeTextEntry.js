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
      <View style={styles.parent}>
        <TextInput
          style={styles.entryInput}
          value={this.state.data}
          editable={true}
          numberOfLines={10}
          multiline={true}
          onChangeText={text => this.handleChange(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    height: '25%',
    backgroundColor: '#D0E3CC',
    margin: 4,
    borderRadius: 12,
    padding: 4,
  },
  entryInput: {
    height:'99%'
  }
});
