import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Spinner } from 'native-base';

export default class AsyncImage extends Component {
    constructor (props) {
        super (props);

        this.state = {
            loaded: false,
            source: this.props.source,
            style: this.props.style,
        }
    }

    _onLoad = () => {
        this.setState({loaded: true});
    }

    render () {
        return (
            <View>
                {!this.state.loaded && <Spinner />}
                <Image
                style={this.state.style}
                source={{uri: this.state.source}}
                onLoad={this._onLoad}
                />
            </View>
        )
    }
}