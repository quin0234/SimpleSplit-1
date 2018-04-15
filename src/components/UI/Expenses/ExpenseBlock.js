import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class ExpenseBlock extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            item: this.props.item,
        }
    }

    _onPress = () => {
        Actions.ExpenseInfo({item: this.state.item});
    }

    render () {
        console.log(this.state);
        return (
            <View style={{marginBottom: 5}}>
                <ListItem onPress={this._onPress} >
                    <Body>
                        
                        <Text style={{fontSize: 16}}>{this.state.item.title}</Text>
                       
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14, color:'#b4b4b4'}} note>{this.state.item.description}</Text>
                        <Text>${this.state.item.amount}</Text>
                        </View>
                    </Body>
                </ListItem>
            </View>
        )
    }
}