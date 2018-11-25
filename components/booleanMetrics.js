import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class BooleanMetricsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.stateContainer();
    this.shadowState = this.state;
  }

  buttonColour(selected) {
    return selected ? styles.selected : styles.unselected;
  }

  render() {
    let items = Object.entries(this.state).map(([key, value]) => {
      return (
        <Subscribe to={[StateContainer]} key={key}>
          {stateContainer => (
            <TouchableHighlight
              style={[this.buttonColour(stateContainer.getBooleanMetricState()[key]), styles.rbutton]}
              underlayColor={'#4CAF50'}
              onPress={() => stateContainer.booleanMetricUpdate(key)}>
              <Text style={[styles.buttonText]}> {key.toUpperCase()} </Text>
            </TouchableHighlight>
          )}
        </Subscribe>
      );
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
  buttonText: {
    paddingTop: 6,
    textAlign:'center',
    color: '#FFFFFF',
    width: '100%',
    fontSize: 18
  },
  rbutton: {
    margin: 3,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
    height: 35,
  },
});
