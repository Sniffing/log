import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class EntryMetricsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.stateContainer();
  }

  render() {
    let items = Object.entries(this.state).map(([key, value]) => {
      return (
        <Subscribe to={[StateContainer]} key={key}>
          {stateContainer => (
            <View key={key} style={styles.entry}>
              <Text style={styles.entryKey}> {key} </Text>
              <TextInput
                style={styles.entryInput}
                value={stateContainer.getEntryMetricState()[key]}
                onChangeText={(v) => stateContainer.entryMetricUpdate(key,v)}
              />
            </View>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '5%',
    width: '99%',
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
