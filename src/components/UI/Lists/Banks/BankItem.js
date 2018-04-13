import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text} from 'native-base';

export default class BankItem extends Component {
    constructor (props) {
        super (props);

        this.state = {
            id: this.props.id,
            name: !!this.props.name ? this.props.name : "Undefined",
        }
    }

    _onPress = () => {
        this.props.onPress(this);
    }

    render () {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.item, !!this.props.selected ? styles.selected : null]}
                onPress={this._onPress}
            >
                <Text>{this.state.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        alignSelf: "center",
        height: 75,
        width: 75,
        margin: 10,
        backgroundColor: '#FFF',
        borderColor: '#bbb',
        borderWidth: StyleSheet.hairlineWidth,
    },
    selected: {
        backgroundColor: '#E6FFEA',
        borderColor: '#82D88F',
    }
});