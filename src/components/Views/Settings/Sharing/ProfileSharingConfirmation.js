import React, { Component } from 'react';
import { View, StyleSheet, Slider, Share } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import MainHeader, { HeaderSide, Colors } from '../../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export default class ProfileSharingConfirmation extends Component {
    constructor (props) {
        super (props);

        this.state = {
            userID: null,
            partnerID: !!this.props.partnerID ? this.props.partnerID : null,
            partnerUsername: null,
        }
    }

    _onBack = () => {
        Actions.pop();
    }
    
    _onConnect = () => {
        const partnerID = this.state.partnerID;
        const userID = this.state.userID;

        firebase.database().ref(`/follow/${userID}/`)
        .update({[partnerID]: true})
    }

    async _getUserName () {
        const partner = this.props.partnerID;
        const usernameRef = firebase.database().ref(`/users/${partner}/profile/username/`);

        usernameRef.on("value", (snapshot) => {
            this.setState({partnerUsername: snapshot.val() || "No Username"})
        });
    }

    async componentDidMount () {
        const { currentUser } = firebase.auth();
        await this._getUserName();

        this.setState({userID: currentUser.uid});
    }

    render () {
        return (
            <Container>
                <MainHeader color={Colors.Purple} title="Sharing">
                    <HeaderSide onPress={this._onBack} icon="md-arrow-back" />
                </MainHeader>
                <Content padder scrollEnabled={false}>
                    <Text style={styles.title}>Are you sure you want to connect with</Text>
                    <Card>
                        <CardItem header>
                            <Text>{this.state.partnerUsername}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>ID: {this.state.partnerID}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button style={styles.mainButton} onPress={this._onConnect} block>
                        <Text>Connect</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#7C6990"
    },
    title: {
        color: '#2b2b2b',
        textAlign: 'center',
        margin: 10,
    },
    slider: {
        flex: 1,
        width: "100%",
        flexWrap: "wrap",
    },
    mainButton: {
        margin: 10,
    }
});