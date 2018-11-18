import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default class BooleanMetricsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state
  }

  toggle(key) {
    this.state[key] = !this.state[key];
    this.props.handler(this.state);
  }

  buttonColour(key) {
    return this.state[key] ? styles.selected : styles.unselected;
  }

  textColour(key) {
    return this.state[key] ? styles.textSelected: styles.textUnselected;
  }

  render() {
    let items = Object.entries(this.state).map(([key, value]) => {
      return (
        <TouchableHighlight
          key={key}
          style={[this.buttonColour(key), styles.rbutton]}
          underlayColor={'#4CAF50'}
          onPress={() => this.toggle(key)}>
          <Text style={[this.textColour(key), styles.buttonText]}> {key.toUpperCase()} </Text>
        </TouchableHighlight>
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '25%',
  },
  selected: {
    backgroundColor: '#67A54D', /* Green */
  },
  unselected: {
    backgroundColor: '#F56476', /* White */
  },
  textSelected: {

  },
  textUnselected: {

  },
  buttonText: {
    paddingTop: 8,
    textAlign:'center',
    color: '#FFFFFF',
    width: '100%',
  },
  rbutton: {
    margin: 4,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
    height: 35,  
  },
});
