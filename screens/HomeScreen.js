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
  }

  showAlert(result, callback) {
    Alert.alert(
      result ? 'Entry saved!' : 'Key exists or error saving stats',
      undefined,
      [
        {text: 'OK', onPress: () => callback()},
      ],
      { cancelable: false }
    )
  }

  submit(state, callback) {
    // console.log("Submitting", state);
    // this.showAlert(true, callback);
    fetch('http://b873da56.ngrok.io', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
          }).then((response) => response.json())
            .then((success) => {
              this.showAlert(success, callback);
            })
            .catch((error) => {
              this.showAlert(false, () => {});
            });
  }

  currentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if (dd<10) {
      dd='0'+dd;
    }
    if (mm<10) {
      mm='0'+mm;
    }

    return dd + "-" + mm + "-" + yyyy;
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
                onPress={() => this.submit(stateContainer.getState(), stateContainer.reset)}
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
