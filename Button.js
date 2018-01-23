import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';


export default class Button extends Component<{}> {
  static styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
      backgroundColor: 'whitesmoke',
      marginBottom: 20,
      borderRadius: 4
    },
    text: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    }
  });

  render() {
    const { styles } = Button
    return (
      <TouchableOpacity
        onPressIn={this.props.onPressIn}
        onPressOut={this.props.onPressOut}
        style={styles.button}
      >
        <Text
          style={styles.text}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

