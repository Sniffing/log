import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class LargeTextEntryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.stateContainer();

    this.shadowState = this.state
  }

  handleChange(stateContainer, text) {
    let newState = {data: text};
    this.shadowState = newState;
    this.props.handler(newState);
  }

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {stateContainer => (
          <View style={styles.parent}>
            <TextInput
              style={styles.entryInput}
              value={this.shadowState.data}
              editable={true}
              maxLength={500}
              multiline={true}
              onChangeText={text => this.handleChange(stateContainer, text)}
            />
          </View>
        )}
      </Subscribe>
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
    height:'99%',
    fontSize: 20,
  }
});
