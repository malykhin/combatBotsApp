/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  View
} from 'react-native';

import Button from './Button';
import config from './config';

import './'
import Contols from './controlsSrv';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.controls = new Contols()
    this.buttons = {
    }
    this.state = {}
  }

  static styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f1f1f'
    },
    backgroundVideo: {
      marginTop: 20,
      marginLeft: 10,
      width: 472,
      height: 354
    },
    wasdButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wsButtonsContainer: {
      padding: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlsContainer: {
      marginRight: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    ledRed: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 40,
      backgroundColor: '#DC143C'
    },
    ledBlue: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 40,
      backgroundColor: '#4169E1'
    }
  });

  handleButtonIn (command, color, uuid) {
    this.buttons[command] = true;
    this.controls.processControlCommand(uuid, color, command)
  }

  handleButtonOut (command, color, uuid) {
    delete this.buttons[command];
    if (command === 'fire') {
      this.controls.processControlCommand(uuid, color, 'steady')
    } else {
      this.controls.processControlCommand(uuid, color, 'stop')
    }
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({...this.controls.bot})
    } , 50)
  }

  render() {
    const { styles } = App;
    const {uuid, color} = this.state
    return (
      <View style={styles.container}>
          <WebView
              style={styles.backgroundVideo}
              source={{uri: config.videoUri}}
              scrollEnabled={false}
          />
        { uuid ? <View style={styles.controlsContainer}>
            <View style={color === 'red' ? styles.ledRed : styles.ledBlue}/>
            <Button
              onPressIn={() => {this.handleButtonIn('fire', color, uuid)}}
              onPressOut={() => {this.handleButtonOut('fire', color, uuid)}}
              title='Fire'
            />
            <View style={styles.wasdButtonsContainer}>
              <Button
                onPressIn={() => {this.handleButtonIn('left', color, uuid)}}
                onPressOut={() => {this.handleButtonOut('left', color, uuid)}}
                title='A'
              />
              <View style={styles.wsButtonsContainer}>
                <Button
                  onPressIn={() => {this.handleButtonIn('forward', color, uuid)}}
                  onPressOut={() => {this.handleButtonOut('forward', color, uuid)}}
                  title='W'
                />
                <Button
                  onPressIn={() => {this.handleButtonIn('backward', color, uuid)}}
                  onPressOut={() => {this.handleButtonOut('backward', color, uuid)}}
                  title='S'
                />
              </View>
              <Button
                onPressIn={() => {this.handleButtonIn('right', color, uuid)}}
                onPressOut={() => {this.handleButtonOut('right', color, uuid)}}
                title='D'
              />
            </View>
          </View> : null }
      </View>
    );
  }
}


