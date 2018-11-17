import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export default class EntryMetricsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    this.state[key] = value;
    this.props.handler(this.state);
  }

  render() {
    let items = Object.entries(this.state).map(([key, value]) => {
      return (
        <View key={key} style={styles.entry}>
        <Text> {key} </Text>
        <TextInput
          style={styles.entryInput}
          value={value}
          onChangeText={(v) => this.handleChange(key,v)}
        />
        </View>
      )
    });

    return (
      <View style={styles.parent}>
        {items}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  entry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '49%',
    borderWidth: 1,
    borderColor: 'blue'
  },
  entryInput: {
    borderWidth: 1,
    width: '60%',
    height: 30,
    borderColor: 'green'
  }
});
