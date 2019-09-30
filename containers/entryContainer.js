
import { Container } from 'unstated';

export default class EntryContainer extends Container {
  state = {
    first: "",
    last: "",
  };

  needsToBeFetched = () => { return this.state.first === ""}

  getFirst = () => {return this.state.first;}
  getLast = () => {return this.state.last;}

  update = (first, last) => {
    console.log("updating:", first, last);
    this.setState(state => {
      state.first = first;
      state.last = last;

      return state;
    });
  }
}
