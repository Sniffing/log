import React, { Component } from 'react'
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
        style={{width: 200}}
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
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(newDate) => this.handleChange(newDate)}
      />
    )
  }
}
