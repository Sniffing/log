import React from 'react';
import { StyleSheet, Text, View, TextInput,
         Button, Switch } from 'react-native';
import BooleanMetricsComponent from 'log/components/booleanMetrics';
import EntryMetricsComponent from 'log/components/entryMetrics';
import LargeTextEntryComponent from 'log/components/largeTextEntry';
import DatePickerComponent from 'log/components/datePicker';
import CustomKeywordsListComponent from 'log/components/customKeywordsList';
// const Datastore = require('@google-cloud/datastore');
// const datastore = Datastore();

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
    // console.log("datastore key", datastore.key('hello'));
    console.log("logging state", this.state);
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
        <DatePickerComponent
          state={this.state.dateState}
          handler={this.dateStateHandler.bind(this)}/>
        <EntryMetricsComponent
          state={this.state.entryMetricState}
          handler={this.entryMetricStateHandler.bind(this)}/>
        <BooleanMetricsComponent
          state={this.state.booleanMetricState}
          handler={this.booleanMetricStateHandler.bind(this)}/>
        <CustomKeywordsListComponent
          state={this.state.keywordsState}
          handler={this.keywordsStateHandler.bind(this)}/>
        <LargeTextEntryComponent
          state={this.state.textState}
          handler={this.textStateHandler.bind(this)}/>
        <Button
          color="#66A7A7"
          onPress={this.submit}
          title="Submit"
          accessibilityLabel="Send to third eye"
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
    marginTop: 50
  },
  filler: {

  }
});
