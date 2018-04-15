import React, { Component} from 'react';
import { Stylesheet, Image } from 'react-native';
import { Container, Content, Text, Form, Button, Icon, Item, View, Spinner } from 'native-base';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import { ExpenseStatuses } from '../../../Data/StatusData';
import CategoryData from '../../../Data/';
import AsyncImage from '../../UI/Image/AsyncImage';

// TODO: StyleSheet

export default class ExpenseInfo extends Component {
    constructor (props) {
        super (props);

        this.state = {
            item: this.props.item
        }
    }

    _onBack = () => { 
        Actions.pop();
    }

    render () {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <MainHeader title={this.state.item.title}>
                    <HeaderSide icon="close" onPress={this._onBack} />
                </MainHeader>
                <Content padder style={{backgroundColor:'#fff'}}>
                    <Item style={{marginBottom: 20}}><Text style={{fontWeight:'bold', fontSize:16, margin: 5, marginBottom: 5, marginTop: 10}}>{this.state.item.title}</Text></Item>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                        <Text>Status...</Text>
                        <Text style={{color: '#696969', marginBottom: 0}}>{ExpenseStatuses[this.state.item.status].title}</Text>   
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                        <Text>Amount...</Text>
                        <Text style={{color: '#3e3e38'}}>${this.state.item.amount}.00</Text>     
                    </View>
                    <Item style={{borderBottomWidth:0}}><Text style={{marginBottom: 0, color:'#3e3e38'}}>{this.state.item.description}</Text></Item>
                    <AsyncImage style={{width: 340, height: 340, marginTop: 10, marginBottom: 10}} source={this.state.item.image} />
                    <Button bordered disabled={true} style={{borderRadius: 100, backgroundColor:'#1485ff'}}><Text style={{color:'#fff'}}>{CategoryData[this.state.item.category].title}</Text></Button>
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
