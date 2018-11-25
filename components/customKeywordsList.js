import React from 'react';
import { StyleSheet, View} from 'react-native';
import TagInput from 'react-native-tag-input';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class CustomKeywordsListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {stateContainer => (
          <View style={styles.keywords}>
            <TagInput
              value={stateContainer.getKeywordsState().keywords}
              onChange={(item) => stateContainer.keywordUpdate(item)}
              labelExtractor={(keyword) => keyword}
              tagContainerStyle={styles.tagContainerStyle}
              tagTextStyle={styles.tagTextStyle}
              text={stateContainer.getKeywordsState().text}
              onChangeText={(text) => stateContainer.keywordTextUpdate(text)}
            />
          </View>
        )}
      </Subscribe>
    );
  }
}

const styles = StyleSheet.create({
  keywords: {
    height: '15%',
    width: '98%',
    backgroundColor: '#D0E3CC',
    margin: 4,
    borderRadius: 12,
    padding: 4,
  },
  tagTextStyle: {
    fontSize: 18,
    color: 'black'
  },
  tagContainerStyle: {
    height: 40
  }
});
