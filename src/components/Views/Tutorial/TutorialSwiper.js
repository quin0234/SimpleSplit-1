import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import isFirstLaunch, { setAppLaunched, setAppNotLaunched } from '../../../Utils/isFirstLaunch';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import SkipButton from './SkipButton';
import EndTutorialButton from './EndTutorialButton';
import { Font } from 'expo';

export default class TutorialSwiper extends Component {
    constructor (props) {
        super(props);
    }

    _renderSwiper () {
        return (
            <Swiper showsButtons={true} loop={false} bounces={true}>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>An Overview of Expenses and Requests</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Expenses Listed in Sequential Order</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Easily Create new Expenses</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Send Messages to Partner for Requests</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Record Voice Memos for Reminders</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Respond to Requests from your Lock Screen</Text>
                </View>
                <View style={styles.slide}>
                    <SkipButton />
                    <Text style={styles.text}>Keep Track of Expenses</Text>
                    <EndTutorialButton />
                </View>
            </Swiper>
        )
    }

    render () {
        return (
            <View style={styles.slide}>
                <SkipButton />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    slide: {
        flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#62CBC9",
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})