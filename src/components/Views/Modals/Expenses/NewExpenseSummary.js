import React, { Component } from 'react';
import { Image} from 'react-native';
import { Content, Text, Card, CardItem, Body, Container, Header, Left, Title, Right, Button, Icon, View} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import firebase from 'firebase';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import BaseImage from '../../../UI/Image/BaseImage';

  class NewExpenseSummary extends Component {
    constructor (props) {
      super (props);

      this.state = {
          title: this.props.title,
          description: this.props.description,
          creator: 0,
          amount: this.props.amount == NaN ? 0 : this.props.amount,
          category: this.props.selected,
          date: 0,
          status: 0,
          image: this.props.image
      };
  }

    getUsername () {
        const { currentUser } = firebase.auth();
        this.setState({creator: currentUser.uid});
    }

    componentDidMount () {
        this.getUsername();
        this.setState({date: +Moment()});
    }

    _onNext = () => {
        const { currentUser } = firebase.auth(); 
        let expense = { date, status } = this.state;
        expense.title = this.state.title != null ? this.state.title : "No Title";
        expense.description = this.state.description != null ? this.state.description : "No Description";
        expense.creator = this.state.creator != null ? this.state.creator : 0;
        expense.amount = this.state.amount != null ? this.state.amount : 0;
        expense.category = this.state.category != null ? this.state.category : 0;
        expense.image = this.state.image != null ? this.state.image : "";

        firebase.database().ref(`/expenses/${currentUser.uid}`)
        .push(expense)
        .then(() => {
            Actions.popTo("main")
        });
    }

    _onBack = () => {
        Actions.pop();
    }

    render(){
        return (
            <Container>
                <MainHeader title="Summary">
                        <HeaderSide icon="arrow-back" onPress={this._onBack}/>
                        <HeaderSide icon="md-checkmark" onPress={this._onNext} />
                </MainHeader>
            <Content>
            <Card>
            <CardItem header>
                <Body>
                    <Text>{this.state.title}</Text>
                    <Text>{this.state.amount}</Text>
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>{this.state.description}</Text>
                    <Text>{this.state.category}</Text>
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                    <BaseImage style={{width: 250, height: 250}} image={this.state.image} />
                </Body>
            </CardItem>
        </Card>
            </Content>
            </Container>
        )
    }
  }

 export default NewExpenseSummary;