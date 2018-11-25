import React from 'react';
import { Container } from 'unstated';

export default class StateContainer extends Container {
  state = {
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
  };

  getState = () => { return this.state };
  getBooleanMetricState = () => { return this.state.booleanMetricState; }
  getKeywordsState = () => { return this.state.keywordsState; }
  getEntryMetricState = () => { return this.state.entryMetricState; }
  getDateState = () => { return this.state.dateState; }
  getTextState = () => { return this.state.textState; }

  dateStateUpdate(newDateState) {
    this.setState({
      dateState: newDateState
    })
  }

  booleanMetricUpdate = (key) => {
    var newState = this.state.booleanMetricState;
    newState[key] = !newState[key];

    this.setState(state => {
      return newState;
    });
  }

  entryMetricStateUpdate(newEntryMetricState) {
    this.setState({
      entryMetricState: newEntryMetricState
    })
  }

  keywordsStateUpdate(newKeywordsState) {
    this.setState({
      keywordsState: newKeywordsState
    })
  }

  textStateUpdate(newTextState) {
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

  reset = () => {
    console.log("in the reset function");
    let freshState = {
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

    this.setState(freshState);
    // this.dateStateUpdate({
    //   date: this.currentDate()
    // });
    // this.booleanMetricStateUpdate({
    //   happy: false,
    //   sad: false,
    //   sick: false,
    //   lonely: false,
    //   stress: false,
    //   overate: false,
    //   dance: false,
    //   gym: false
    // });
    // this.entryMetricStateUpdate({
    //   weight: ""
    // });
    // this.keywordsStateUpdate({
    //   keywords: [],
    //   text: ""
    // });
    // this.textStateUpdate({
    //   data: ""
    // });
  }
}
