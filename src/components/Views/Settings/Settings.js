import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, CardItem, Container, Header, Body, Title, Left, Right, Icon, Thumbnail, Button, Grid, Col, Row, Item, Content, Label, Input, List, ListItem, ActionSheet } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';

export default class ProfileSettings extends Component {
    constructor (props) {
        super (props);

        this.state = {
            partner: {
                username: null,
                uid: null,
            },
        }
    }

    onChangePassword = () => {

    };

    onLogOut = () => {
        firebase.auth().signOut().then(function() {
            Actions.reset("auth");
          }, function(error) {
            console.log("Failed to logout");
          });
    }

    onPressUserSettings = () => {
        Actions.profileUserSettings();
    }

    onPressSharingSettings = () => {
        Actions.ProfileSharing();
    }

    async _fetchPartnerUsername () {
        let  { currentUser } = firebase.auth();

        let partner = {
            username: null,
            uid: null,
        };

        let partnerRef = firebase.database().ref(`/follow/${currentUser.uid}`);
        partnerRef.once("value", (snapshot) => {
            snapshot.forEach(function(childSnapshot) {
              console.log(childSnapshot);
                partner.uid = childSnapshot.key;
            });

            let partnerNameRef = firebase.database().ref(`/users/${partner.uid}/profile/username/`);
            partnerNameRef.once("value", (snapshot) => {
                partner.username = snapshot.val() || null;
            });
        });
        console.log(partner);
        if (partner.username == null) {
          partner.username = "Paul";
        }
        this.setState({partner: partner});
    }

    async componentDidMount () {
        await this._fetchPartnerUsername();
    }

    render () {
        return (
            <Container>
                <MainHeader title="Profile Settings" />
                <Container>
                    <Content padder>
                        <List>
                            <ListItem itemDivider>
                                <Text>User Settings</Text>
                            </ListItem>  
                            <ListItem>
                                <Button onPress={this.onPressUserSettings}>
                                    <Text>Change User Settings</Text>
                                </Button>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Sharing Options</Text>
                            </ListItem>
                            <ListItem>
                                <Card>
                                    <CardItem header>
                                        <Text>Linked Account</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Text>Username: {this.state.partner.username}</Text>
                                        <Text>ID: {this.state.partner.uid}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </ListItem>
                            <ListItem>
                                <Button block onPress={this.onPressSharingSettings}>
                                    <Text>Manage Sharing</Text>
                                </Button>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Payment</Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Account</Text>
                            </ListItem>
                            <ListItem>
                                <Button transparent info onPress={this.onChangePassword}>
                                    <Text>Change Password</Text>
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button transparent dark onPress={this.onLogOut}>
                                    <Text>Log Out</Text>
                                </Button>
                            </ListItem>
                        </List>
                    </Content>
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
        color: '#FFF'
    }
});