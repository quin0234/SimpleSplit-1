import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

// TODO: Expense and memo block

export default class ExpenseBlock extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            title: !!this.props.title ? this.props.title : "No Title",
            description: !!this.props.description ? this.props.description : "No Description",
            // Temporary fix for showcase cause doesnt work
            amount: !!this.props.amount ? this.props.amount : 40,
            status: !!this.props.status ? this.props.status : 0,
            onPress: !!this.props.onPress ? this.props.onPress : null,
            image: !!this.props.image ? this.props.image : null,
        }
    }

    _onPress = () => {
        const props = { title, description, status, image, creator, amount } = this.state;
        Actions.ExpenseInfo(props);
    }

    render () {
        return (
            <View style={{marginBottom: 5}}>
                <ListItem onPress={this._onPress} >
                    <Body>
                        
                        <Text style={{fontSize: 16}}>{this.state.title}</Text>
                       
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14, color:'#b4b4b4'}} note>{this.state.description}</Text>
                        <Text>${this.state.amount}.00</Text>
                        </View>
                    </Body>
                </ListItem>
            </View>
        )
    }
}