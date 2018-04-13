import React, { Component } from 'react';
import { Container, Content, Header, Title, Text, List, ListItem, Body, Button, Card, Left, Right, Icon, Item, Input} from 'native-base';
import firebase from 'firebase';
import MessageBlock from './MessageBlock';
import { Actions } from 'react-native-router-flux';

export default class MessageList extends Component {
    constructor (props) {
        super (props);

        this.state = {
            items: !!this.props.items ? this.props.items : [],
        }
    }

    _renderList () {
        return this.props.items.map( (item) => {
            return (
                <MessageBlock key={item.key} status={item.status} image={item.image} creator={item.creator} title={item.title} description={item.description} />
            );
        });
    }

    render () {
        if (this.state.items.length == 0 || this.state.items == null) {
            return (
                <Container>
                    <Container padder>
                        <Text style={{textAlign: "center", margin: 10}}>You have no messages</Text>
                        <Button block onPress={() => Actions.newMessage()}>
                            <Text>Create a Message</Text>
                        </Button>
                    </Container>
                </Container>
            )
        } else {
            return(
                <Container style={{backgroundColor:'#fff'}}>
                    <Content>
                        <List>
                            {this._renderList()}
                        </List>
                    </Content>
                </Container>
            )   
        }
    }
}