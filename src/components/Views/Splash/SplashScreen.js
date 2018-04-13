import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'native-base';
import isFirstLaunch from '../../../Utils/isFirstLaunch';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends Component {
    constructor (props) {
        super (props);
    }

    async componentWillMount() {
        const theFirstLaunch = await isFirstLaunch();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.reset("main");
            } else {
                if (!theFirstLaunch) {
                    Actions.reset("auth");
                } else {
                    Actions.reset("tutorial");
                }
            }
        })
    }

    render () {
        return (
            <View style={{backgroundColor:'#239b97', flex:1, justifyContent:'center'}}>
                <Text style={{alignSelf:'center', fontWeight:'bold', color:'#fff', fontSize: 30}}>Loading...</Text>
            </View>
        )
    }
}