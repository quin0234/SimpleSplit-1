import React, { Component } from 'react';
import { Container, Content, Text, Form, Button, Icon, Item, Right, Footer, View } from 'native-base';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import { MessageStatuses } from '../../../Data/StatusData';
import BaseImage from '../../UI/Image/BaseImage';

export default class MessageInfo extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: this.props.title || "No Title",
            description: this.props.description || "No Description",
            creator: this.props.creator || "Unknown Creator",
            status: this.props.status || 0,
            image: this.props.image || null,
        }
    }

    _onBack = () => {
        Actions.pop();
    }

    render () {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <MainHeader title={this.state.title}>
                    <HeaderSide icon="arrow-back" onPress={this._onBack} />
                </MainHeader>
                <Content padder>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontSize: 20, margin: 4, marginBottom: 10}}>{this.state.title}</Text> 
                    <Button style={{borderWidth: 5, backgroundColor:'#e8e2e2', borderColor:'#e8e2e2' ,height: 20, marginTop: 10}}>
                        <Text style={{fontWeight:'bold', color:'#000',  fontSize: 10,}}>{MessageStatuses[this.state.status]}</Text>
                    </Button>
                    </View>
               
                
                    <Item style={{borderBottomWidth:0, marginTop: 40}}><Text style={{marginBottom: 5}} >{this.state.description}</Text></Item>
                    <BaseImage style={{width: 350, height: 350,marginTop: 10, marginBottom: 60}} image={this.state.image} />
                    <Text style={{color: '#696969'}}>From: {this.props.creator}</Text>
                    <Text style={{color:'#696969'}}>Date: April 13th, 2018, 07:25am</Text>
                </Content>
            </Container>
        )
    }
}