import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class BooleanMetricsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state
  }

  toggle(key) {
    this.state[key] = !this.state[key];
    this.props.handler(this.state);
  }

  render() {
    let items = Object.entries(this.state).map(([key, value]) => {
      return (
        <View key={key} style={styles.switcher}>
        <Text> {key} </Text>
        <Switch
          style={styles.switcherSwitch}
          value={value}
          onValueChange={value => this.toggle(key)}
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switcher: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '49%',
    height: 35,
    borderWidth: 1,
    borderColor: 'red'
  },
  switcherSwitch: {

  }
});
