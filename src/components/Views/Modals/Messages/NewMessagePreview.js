import React, { Component } from 'react';
import { Image} from 'react-native';
import { Content, Text, Card, CardItem, Body, Container, Header, Left, Title, Right, Button, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import firebase from 'firebase';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import BaseImage from '../../../UI/Image/BaseImage';

class NewMessagePreview extends Component {
    
    constructor (props) {
        super (props);
        
        this.state = {
            title: this.props.title,
            description: this.props.description,
            date: "",
            image: this.props.image,
            creator: null,
            status: 0,
            saved: false,
        };
    }

    _onBackPress = () => {
        Actions.pop();
    }

    _onNextPress = () => {
        const { currentUser } = firebase.auth(); 
        let message = { date, status } = this.state;
        message.title = this.state.title != null ? this.state.title : "No Title";
        message.description = this.state.description != null ? this.state.description : "No Description";
        message.creator = this.state.creator != null ? this.state.creator : 0;
        message.category = this.state.category != null ? this.state.category : 0;
        message.image = this.state.image != null ? this.state.image : "";

        
        firebase.database().ref(`/messages/${currentUser.uid}/`)
        .push(message)
        .then(() => {
            this.setState({saved: true});
        })
        .then(() => {
            Actions.popTo("main")
        });
    }
    async componentDidMount () {
        const { currentUser } = firebase.auth();

        this.setState({date: +Moment(), creator: currentUser.uid});
    }

    render(){
      
        return(
            <Container>
                <MainHeader title="Confirm Message">
                    <HeaderSide icon="arrow-back" onPress={this._onBackPress}/>
                    <HeaderSide title="Send" onPress={this._onNextPress}/>
                </MainHeader>
                <Content padder>
                    <Card>
                        <CardItem header>
                            <Body>
                                <Text>{this.state.title}</Text>
                                <Text note>{Moment(this.state.date).format("MMMM Do, YYYY")}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{this.state.description}</Text>
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

export default NewMessagePreview;