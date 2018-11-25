import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class DatePickerComponent extends Component {
  constructor(props){
    super(props)
    this.state = this.props.stateContainer();

    this.shadowState = this.state;
  }

  handleChange(date) {
    let newState = {date: date}
    this.shadowState.date = date;
    this.props.handler(newState)
  }

  render(){
    return (
      <Subscribe to={[StateContainer]}>
        {stateContainer => (
          <DatePicker
            style={styles.container}
            date={this.shadowState.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="2016-05-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 2,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                height: '90%'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(newDate) => this.handleChange(newDate)}
          />
      )}
      </Subscribe>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
  }
});
