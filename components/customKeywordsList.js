import React from 'react';
import { StyleSheet, View} from 'react-native';
import TagInput from 'react-native-tag-input';

export default class CustomKeywordsListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      text: ""
    }
  }

  onChangeKeywords(keywords) {
    this.setState({
      keywords: keywords
    });
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
      <View style={styles.keywords}>
        <TagInput
          value={this.state.keywords}
          onChange={this.onChangeKeywords.bind(this)}
          labelExtractor={(keyword) => keyword}
          text={this.state.text}
          onChangeText={this.onChangeText.bind(this)}
        />
      </View>
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
  }
});
