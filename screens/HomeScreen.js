import React from 'react';
import { StyleSheet, Text, View, TextInput,
         Button, Switch, Image, Alert} from 'react-native';
import { Provider, Subscribe } from 'unstated';
import BooleanMetricsComponent from 'log/components/booleanMetrics';
import EntryMetricsComponent from 'log/components/entryMetrics';
import LargeTextEntryComponent from 'log/components/largeTextEntry';
import DatePickerComponent from 'log/components/datePicker';
import CustomKeywordsListComponent from 'log/components/customKeywordsList';
import StateContainer from 'log/containers/stateContainer';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert(result, container) {
    Alert.alert(
      result ? 'Entry saved!' : 'Key exists or error saving stats',
      undefined,
      [
        {text: 'OK', onPress: () => container.reset()},
      ],
      { cancelable: false }
    )
  }

  submit(container) {
    console.log("Submitting", this.state);
    this.showAlert(true, container);
    // fetch('http://c11ba659.ngrok.io', {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(this.state),
    //       }).then((response) => response.json())
    //         .then((success) => {
    //           this.showAlert(success);
    //         })
    //         .catch((error) => {
    //           this.showAlert(false);
    //         });
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
            <View style={styles.container}>
              <Image style={styles.eye}
                source={require('log/assets/eye.gif')} />
              <BooleanMetricsComponent
                stateContainer={() => stateContainer.getBooleanMetricState()}
                handler={stateContainer.booleanMetricStateUpdate.bind(this)}/>
              <CustomKeywordsListComponent
                stateContainer={() => stateContainer.getKeywordsState()}
                handler={stateContainer.keywordsStateUpdate.bind(this)}/>
              <DatePickerComponent
                stateContainer={() => stateContainer.getDateState()}
                handler={stateContainer.dateStateUpdate.bind(this)}/>
              <EntryMetricsComponent
                stateContainer={() => stateContainer.getEntryMetricState()}
                handler={stateContainer.entryMetricStateUpdate.bind(this)}/>
              <Button
                style={styles.button}
                color="#67A54D"
                onPress={() => this.submit(stateContainer)}
                title="Submit"
              />
            </View>
          )}
      </Subscribe>
    </Provider>
    );
  }
}
// <LargeTextEntryComponent
//   state={() => stateContainer.getState().textState}
//   handler={stateContainer.textStateUpdate}/>

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
