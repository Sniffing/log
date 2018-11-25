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
          <Text style={styles.entryKey}> {key} </Text>
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
    flexDirection: 'row',
    height: '5%',
    width: '100%',
  },
  entry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  entryKey: {
    textAlign: 'right',
    paddingTop: 4,
    width: '18%',
  },
  entryInput: {
    borderWidth: 1,
    width: '75%',
    height: 30,
    marginRight: 20,
    borderRadius: 6,
    borderColor: '#67A54D'
  }
});
