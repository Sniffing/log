import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import EntryContainer from 'log/containers/entryContainer';
import { Provider, Subscribe } from 'unstated';
import * as constants from 'log/constants/constants';

export default class Entries extends Component {
  constructor(props){
    super(props);
    this.stateContainer = this.props.stateContainer;
  }

  getEntries = () => {
    fetch(constants.DATABASE_URL + '/entries', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((response) => response.json())
            .then((success) => {
              this.stateContainer.update(success.first, success.last);
            })
            .catch((error) => {
              console.log(error);
            });
  }

  render(){
    if (this.stateContainer.needsToBeFetched()) {
      this.getEntries();
    }
    return (
      <Provider>
        <Subscribe to={[EntryContainer]}>
          {entryContainer => (
            <View>
              <Text>Last Entry: {entryContainer.getLast()}</Text>
              <Text>First Entry: {entryContainer.getFirst()}</Text>
              <Button
                onPress={this.getEntries}
                title="Refresh"
              />
            </View>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
