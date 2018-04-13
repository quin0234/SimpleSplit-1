import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Button, Text } from 'native-base';

export default class LoadingButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            title: !!this.props.title ? this.props.title : "Loading",
            onPress: !!this.props.onPress ? this.props.onPress : null,
            loading: !!this.props.loading ? this.props.loading : false,
        }
    }
    onPress (data) {
        if (typeof data === "function") {
            data();
        }
    }
    
    render () {
        if (this.state.loading) {
            return  (
                <Spinner color='green' />
            );
        } else {
            return (
                <Button style={styles.button} full onPress={() => { this.onPress(this.state.onPress) }}> 
                    <Text>{this.state.title}</Text>
                </Button>
            );
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: 280,
        marginTop: 20,
        backgroundColor: '#7C6990',
    }
})