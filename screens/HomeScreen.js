import React from 'react';
import { StyleSheet, Text, View, TextInput,
         Button, Switch, Image, Alert, Keyboard,
         TouchableWithoutFeedback } from 'react-native';
import { Provider, Subscribe } from 'unstated';
import BooleanMetricsComponent from 'log/components/booleanMetrics';
import EntryMetricsComponent from 'log/components/entryMetrics';
import LargeTextEntryComponent from 'log/components/largeTextEntry';
import DatePickerComponent from 'log/components/datePicker';
import CustomKeywordsListComponent from 'log/components/customKeywordsList';
import StateContainer from 'log/containers/stateContainer';
import * as constants from 'log/constants/constants';
import console from 'console';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.nextDate = this.nextDate.bind(this);
  }

  showAlert(result, callback, callbackParam = undefined) {
    Alert.alert(
      result ? 'Entry saved!' : 'Key exists or error saving stats',
      undefined,
      [
        {text: 'OK', onPress: () => callback(callbackParam)},
      ],
      { cancelable: false }
    )
  }

  submit(state, callback, callbackParam) {
    // console.log("Submitting", state);
    // this.showAlert(true, callback);
    fetch(constants.DATABASE_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
          }).then((response) => response.json())
            .then((success) => {
              this.showAlert(success, callback, callbackParam);
            })
            .catch((error) => {
              this.showAlert(false, () => {});
            });
  }

  currentDate() {
    let today = new Date();
    return this.getDateFromObject(today);
  }

  getDateFromObject(date) {
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if (dd<10) {
      dd='0'+dd;
    }
    if (mm<10) {
      mm='0'+mm;
    }

    return dd + "-" + mm + "-" + yyyy;
  }

  nextDate(state) {
    const dateComponents = state.dateState.date.split('-');
    const date = new Date(`${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`);
    
    date.setDate(date.getUTCDate() + 1);
    date.setMonth(date.getUTCMonth());
    return this.getDateFromObject(date);
  }

  render() {
    return (
      <Provider>
        <Subscribe to={[StateContainer]}>
          {stateContainer => (
            <DismissKeyboard>
            <View style={styles.container}>
              <Image style={styles.eye}
                source={require('log/assets/eye.gif')} />
              <BooleanMetricsComponent
                stateContainer={() => stateContainer.getBooleanMetricState()}/>
              <CustomKeywordsListComponent/>
              <LargeTextEntryComponent/>
              <DatePickerComponent/>
              <EntryMetricsComponent
                stateContainer={() => stateContainer.getEntryMetricState()}/>
              <Button
                style={styles.button}
                color="#67A54D"
                onPress={() => this.submit(stateContainer.getState(), 
                                           stateContainer.reset, 
                                           this.nextDate(stateContainer.getState()),
                                           )}
                title="Submit"
              />
            </View>
            </DismissKeyboard>
          )}
      </Subscribe>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    height: '100%',
  },
  eye: {
    height: '10%',
    resizeMode: 'contain',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    height: '10%',
  },
});
