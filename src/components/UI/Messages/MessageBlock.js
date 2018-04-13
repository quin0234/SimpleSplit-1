import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Body, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { MessageStatuses } from '../../../Data/StatusData';

export default class MessageBlock extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            title: !!this.props.title ? this.props.title : "No Title",
            description: !!this.props.description ? this.props.description : "No Description",
            status: !!this.props.status ? this.props.status : 0,
            creator: !!this.props.creator ? this.props.creator : "No Username",
            image: !!this.props.image ? this.props.image : null,
        }
    }

    _onPress = () => {
        const props = { title, description, status, image, creator } = this.state;
        Actions.MessageInfo(props);
    }

    render () {
        return (
            <View>
                <ListItem onPress={this._onPress}>
                    <Body> 
                       
                        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>{this.state.title}</Text>
                        <Text style={{fontSize:15, color:'#696969'}} note>{this.state.description}</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
                            <Text style={{fontSize:15, color:'#696969'}}>Sent by: {this.state.creator}</Text>
                            <Text style={{fontSize: 14, color:'#b4b4b4'}} note>{MessageStatuses[this.state.status]}</Text>
                        </View>
                       
                       
                        
                        
                    </Body>
                </ListItem>
            </View>
        )
    }
}