import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import isFirstLaunch, { setAppLaunched, setAppNotLaunched } from '../../../Utils/isFirstLaunch';

export default class SkipButton extends Component {
    pressButton () {
        setAppLaunched();
        Actions.auth();
    }

    render () {
        return (
            <Button transparent light onPress={() => {this.pressButton()}}>
                <Text>{!!this.props.title ? this.props.title : "Skip Tutorial"}</Text>
            </Button>
        )
    }
}