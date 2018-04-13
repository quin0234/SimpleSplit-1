import React, { Component } from 'react';
import { Container, Icon } from 'native-base';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import CameraCapture from '../../../UI/Camera/CameraCapture';

export default class NewMessage extends Component {
    constructor (props) {
        super (props);

        this.state = {
            image: "",
        }
    }

    _onPicture (data) {
        this.setState({image: data.base64}, () => {
            Actions.newMessageInfo({image: this.state.image});
        });
    }

    render () {
        return (
            <Container>
                <MainHeader title="Capture Image">
                    <HeaderSide title="Close" onPress={ () => { Actions.popTo("main")}} />
                    <HeaderSide title="Skip" onPress={Actions.newMessageInfo} />
                </MainHeader>
                <CameraCapture onPicture={(data) => {this._onPicture(data)}}/>
            </Container> 
        )
    }
}