import React, { Component } from 'react';
import { Image} from 'react-native';
import { Content, Text, Card, CardItem, Body, Container, Header, Left, Title, Right, Button, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import firebase from 'firebase';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';

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
        };
    }

    _onBackPress = () => {
        Actions.pop();
    }

    _onNextPress = () => {
        const { currentUser } = firebase.auth(); 
        let message = {title, description, date, creator, image, status } = this.state;
        
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
                        {/* <CardItem>
                         <Body>
                            <BaseImage style={{width: 250, height: 250}} image={this.state.image} />
                        </Body>
                    </CardItem> */}
                    </Card>
                </Content>
            </Container>
        )
    }
}

export default NewMessagePreview;