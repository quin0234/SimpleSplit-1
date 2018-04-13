import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, Text, Left, Right, Button, Form, Label, Item, Input, Icon, Title, Header, Body, Container } from 'native-base';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import BaseImage from '../../../UI/Image/BaseImage';

export default class NewMessageInfo extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: "",
            description: "",
            image: this.props.image,
        };
    }

    onChangeTitle (text) {
        this.setState({title: text});
    }

    onChangeDescription (text) {
        this.setState({description: text});
    }

    _onNextPress = () => {
        let props = {title, description, image} = this.state;
        Actions.newMessagePreview(props);
    }

    _onCancelPress = () => {
        Actions.pop();
    }

    render(){
        return(
            <Container>
                <MainHeader title="New Message">
                    <HeaderSide icon="close" onPress={this._onCancelPress} />
                    <HeaderSide title="Next" onPress={this._onNextPress} />
                </MainHeader>
                <Form>
                    <Item floatingLabel>
                        <Label style={{marginBottom:10}}>Subject</Label>
                        <Input onChangeText={ (text) => this.onChangeTitle(text) } value={this.state.title} />
                    </Item>
                    <Item floatingLabel style={{marginBottom:30}}>
                        <Label style={{marginBottom: 10}}>Message</Label>
                        <Input onChangeText={ (text) => this.onChangeDescription(text) } value={this.state.description} />
                    </Item>
                    <Item>
                        <BaseImage style={{width: 340, height: 340}} image={this.state.image} />
                    </Item>
                </Form>
            </Container>
        )
    }
};