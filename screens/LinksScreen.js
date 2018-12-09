import React from 'react';
import { Provider, Subscribe } from 'unstated';
import EntryContainer from 'log/containers/entryContainer';
import Entries from 'log/components/entries';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <Provider>
        <Subscribe to={[EntryContainer]}>
          {entryContainer => (
            <Entries
              stateContainer = {entryContainer}/>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
