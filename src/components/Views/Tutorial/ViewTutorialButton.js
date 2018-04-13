import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import isFirstLaunch, { setAppLaunched, setAppNotLaunched } from '../../../Utils/isFirstLaunch';

export default class ViewTutorialButton extends Component {
    pressButton () {
        setAppNotLaunched();
        Actions.tutorial();
    }

    render () {
        return (
            <Button transparent light onPress={() => {this.pressButton()}}>
                <Text>{!!this.props.title ? this.props.title : "View Tutorial"}</Text>
            </Button>
        )
    }
}