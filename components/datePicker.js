import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DatePickerComponent extends Component {
  constructor(props){
    super(props)
    this.state = this.props.state;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    let newState = {date: date}
    this.state.date = date;
    this.props.handler(newState)
  }

  render(){
    return (
      <DatePicker
        style={styles.container}
        date={this.state.date}
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
  }
});
