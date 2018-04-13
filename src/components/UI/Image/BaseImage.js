import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';

export default class BaseImage extends Component {
    constructor (props) {
        super (props);
        this.state = {
            image: props.image,
        }
    }
    render () {
        return (
            <Image style={this.props.style} source={{uri: "data:image/jpeg;base64," + this.state.image}} />
        )
    }
}