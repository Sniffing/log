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
      state.booleanMetricState = newState;
      return state;
    });
  }

  keywordUpdate = (words) => {
    var newState = this.state.keywordsState;
    newState.keywords = words;

    this.setState(state => {
      state.keywordsState = newState;
      return newState;
    });
  }

  keywordTextUpdate = (text) => {
    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      var newState = {
        keywords: [...this.state.keywordsState.keywords, this.state.keywordsState.text],
        text: "",
      }
      
      this.setState(state => {
        state.keywordsState = newState;
        return state;
      });
    } else {
      var newState = this.state.keywordsState;
      newState.text = text;
      this.setState(state => {
        state.keywordsState = newState;
        return state;
      });
    }
  }

  keywordStateUpdate = (newState) => {
    this.setState(state => {
      state.keywordsState = newState;
      return state;
    });
  }

  entryMetricStateUpdate(newEntryMetricState) {
    this.setState({
      entryMetricState: newEntryMetricState
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
  }
}
