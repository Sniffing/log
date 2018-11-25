import React from 'react';
import { StyleSheet, View} from 'react-native';
import TagInput from 'react-native-tag-input';
import StateContainer from 'log/containers/stateContainer';
import { Subscribe } from 'unstated';

export default class CustomKeywordsListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.stateContainer();
  }

  onChangeKeywords(stateContainer, keywords) {
    let newState = {
      keywords: keywords
    }
    this.setState(newState);
    this.props.handler(newState);
  }

  onChangeText(text) {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      let newState = {
        keywords: [...this.state.keywords, this.state.text],
        text: "",
      }

      this.setState(newState);
      this.props.handler(newState);
    }
  }

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {stateContainer => (
          <View style={styles.keywords}>
            <TagInput
              value={this.state.keywords || []}
              onChange={(item) => this.onChangeKeywords(stateContainer, item)}
              labelExtractor={(keyword) => keyword}
              tagContainerStyle={styles.tagContainerStyle}
              tagTextStyle={styles.tagTextStyle}
              text={this.state.text}
              onChangeText={this.onChangeText.bind(this)}
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
