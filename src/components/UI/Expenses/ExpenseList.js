import React, { Component } from 'react';
import { Container, Content, Header, Title, Text, List, ListItem, Body, Button, Card, Left, Right, Icon, Item, Input} from 'native-base';
import firebase from 'firebase';
import ExpenseBlock from './ExpenseBlock';
import { Actions } from 'react-native-router-flux';

export default class ExpenseList extends Component {
    constructor (props) {
        super (props);

        this.state = {
            items: !!this.props.items ? this.props.items : [],
        }
    }

    _renderList () {
        return this.props.items.map( (item) => {
            return (
                <ExpenseBlock key={item.key} item={item}/>
            );
        });
    }

    render () {
        if (this.state.items.length == 0 || this.state.items == null) {
            return (
                <Container padder>
                    <Text style={{textAlign: "center", margin: 10}}>You have no expenses</Text>
                    <Button block onPress={() => Actions.newexpenseModal()}>
                        <Text>Create a expense</Text>
                    </Button>
                </Container>
            )
        } else {
            return(
                <Container>
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