import React, { Component } from 'react';
import { View, StyleSheet, Slider, Share } from 'react-native';
import { Label, Input, Container, Header, Body, Left, Right, Title, Content, Item, Switch, Text, List, ListItem, Button, Icon, SwipeRow } from 'native-base';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export default class ProfileSharing extends Component {
    constructor (props) {
        super (props);

        this.state = {
            userID: null,
            partnerID: null,
        }
    }

    _onBack = () => {
        Actions.pop();
    }

    _connectPartner = () => {
        Actions.ProfileSharingConfirmation({partnerID: this.state.partnerID});
    }
    
    _onChangePartnerID (text) {
        this.setState({partnerID: text});
    }

    async _getUserName () {
        const { currentUser } = firebase.auth(); 
        const usernameRef = firebase.database().ref(`/users/${currentUser.uid}/profile/username/`);

        usernameRef.on("value", (snapshot) => {
            this.setState({username: snapshot.val() || "No Username"})
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
                <MainHeader title="Sharing">
                    <HeaderSide onPress={this._onBack} icon="md-arrow-back" />
                </MainHeader>
                <Container padder style={{marginTop: 10, marginLeft: 10}}>
                        <Text>Your ID is:</Text>
                        <Text style={{fontWeight:'bold', alignSelf:'center', marginTop: 5}}>  {this.state.userID} </Text>
                        <Item floatingLabel style={{borderBottomWidth:0}}>
                            <Label>Partner ID</Label>
                            <Input onChangeText={ (text) => this._onChangePartnerID(text) } value={this.state.partnerID} />
                        </Item>
                        <Button transparent style={{alignSelf:'center', marginTop: 15}} onPress={this._connectPartner}>
                            <Text>CONNECT</Text>
                        </Button>
                </Container>
            </Container>
        )
    }
}

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
    }
});