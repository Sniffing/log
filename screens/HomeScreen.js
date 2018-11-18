import React from 'react';
import { StyleSheet, Text, View, TextInput,
         Button, Switch, Image } from 'react-native';
import BooleanMetricsComponent from 'log/components/booleanMetrics';
import EntryMetricsComponent from 'log/components/entryMetrics';
import LargeTextEntryComponent from 'log/components/largeTextEntry';
import DatePickerComponent from 'log/components/datePicker';
import CustomKeywordsListComponent from 'log/components/customKeywordsList';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dateState: {
        date: this.currentDate()
      },
      booleanMetricState: {
        happy: false,
        sad: false,
        sick: false,
        lonely: false,
        stress: false,
        overate: false,
        dance: false,
        gym: false
      },
      entryMetricState: {
        weight: ""
      },
      keywordsState: {
        keywords: [],
        text: ""
      },
      textState: {
        data: ""
      }
    }

    this.submit = this.submit.bind(this);
  }

  submit() {
    console.log("Sending state back to server: ", this.state);
    console.log("Sending state back to server: ", JSON.stringify(this.state));
    fetch('http://1baa7656.ngrok.io', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
          }).then((response) => response.json())
              .then((success) => {
                console.log("is success? ", success);
              })
              .catch((error) => {
                console.error(error);
              });
  }

  dateStateHandler(newDateState) {
    this.setState({
      dateState: newDateState
    })
  }

  booleanMetricStateHandler(newBooleanMetricState) {
    this.setState({
      booleanMetricState: newBooleanMetricState
    })
  }

  entryMetricStateHandler(newEntryMetricState) {
    this.setState({
      entryMetricState: newEntryMetricState
    })
  }

  keywordsStateHandler(newKeywordsState) {
    this.setState({
      keywordsState: newKeywordsState
    })
  }

  textStateHandler(newTextState) {
    this.setState({
      textState: newTextState
    })
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
      <View style={styles.container}>
        <Image style={styles.eye}
          source={require('log/assets/eye.gif')} />
        <BooleanMetricsComponent
          state={this.state.booleanMetricState}
          handler={this.booleanMetricStateHandler.bind(this)}/>
        <CustomKeywordsListComponent
          state={this.state.keywordsState}
          handler={this.keywordsStateHandler.bind(this)}/>
        <LargeTextEntryComponent
          state={this.state.textState}
          handler={this.textStateHandler.bind(this)}/>
        <DatePickerComponent
          state={this.state.dateState}
          handler={this.dateStateHandler.bind(this)}/>
        <EntryMetricsComponent
          state={this.state.entryMetricState}
          handler={this.entryMetricStateHandler.bind(this)}/>
        <Button
          style={styles.button}
          color="#67A54D"
          onPress={this.submit}
          title="Submit"
        />
      </View>
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
  }
});
