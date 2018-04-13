import React, { Component} from 'react';
// import {Stylesheet} from 'react-native';
import { Container, Content, Text, Form, Button, Icon, Item, View } from 'native-base';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import { ExpenseStatuses } from '../../../Data/StatusData';
import BaseImage from '../../UI/Image/BaseImage';

export default class ExpenseInfo extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: this.props.title || "No Title",
            description: this.props.description || "No Description",
            creator: this.props.creator || "Unknown Creator",
            status: this.props.status || 0,
            amount: this.props.amount || 40,  // Temporary fix for showcase - was '0'
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
                    <HeaderSide icon="close" onPress={this._onBack} />
                </MainHeader>
                <Content padder style={{backgroundColor:'#fff'}}>
                {/* Style properties will move into stylesheet. Getting trouble with import Stylesheet atm */}
                    <Item style={{marginBottom: 20}}><Text style={{fontWeight:'bold', fontSize:16, margin: 5, marginBottom: 5, marginTop: 10}}>{this.state.title}</Text></Item>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                        <Text>Status...</Text>
                        <Text style={{color: '#696969', marginBottom: 0}}>{ExpenseStatuses[this.state.status].title}</Text>   
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                        <Text>Amount...</Text>
                        <Text style={{color: '#3e3e38'}}>${this.state.amount}.00</Text>     
                    </View>
                    <Item style={{borderBottomWidth:0}}><Text style={{marginBottom: 0, color:'#3e3e38'}}>{this.state.description}</Text></Item>
                    <BaseImage style={{width: 340, height: 340, marginTop: 10, marginBottom: 10}} image={this.state.image} />
                    <Button bordered disabled={true} style={{borderRadius: 100, backgroundColor:'#1485ff'}}><Text style={{color:'#fff'}}>My Category</Text></Button>
                </Content>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     item: {
//         padding: 10,
//         margin: 10
//     },
// });
