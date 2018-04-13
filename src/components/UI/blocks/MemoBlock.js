import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// TODO: Expense and memo block

export default class MemoBlock extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            title: !!this.props.title ? this.props.title : "No Title",
            description: !!this.props.description ? this.props.description : "No Description",
            duration: !!this.props.duration ? this.props.duration : "No Duration",
            date: !!this.props.date ? this.props.date : "No Date",
            onPress: !!this.props.onPress ? this.props.onPress : null,
        }
    }

    onPress (data) {
        if (typeof data === "function") {
            data();
        }
    }

    render () {
        return (
            <View>
                <ListItem icon onPres={() => this.onPress(this.state.onPress)}>
                    <Left>
                        <Icon name={"play"} />
                    </Left>
                    <Body>
                        <Text>{this.state.title}</Text>
                        <Text note>{this.state.duration}</Text>
                    </Body>
                    <Right>
                        <Text>{this.state.date}</Text>
                        <Icon name={"ellipsis-v"} />
                    </Right>
                </ListItem>
            </View>
        )
    }
}