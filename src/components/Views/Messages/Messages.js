import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Item, Input, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, DeckSwiper, List, ListItem, Spinner, } from 'native-base';
import MessageList from '../../UI/Messages/MessageList';
import MainHeader, { HeaderSide, Sides } from '../../UI/Header/MainHeader';
import SearchBar from '../../UI/Search/SearchBar';
import firebase from 'firebase';


class Messages extends Component {

    constructor (props) {
        super (props);

        this.state = {
            loaded: false,
            showSearch: false,
            searchResults: [],
            searchItems: [],
            username: "",
            followedUsername: "",
        }
    }

    _toggleSearchBar = () => {
        this.setState(previousState => {
            return { showSearch: !previousState.showSearch };
        });
    }

    async _getUsernames () {
        let username;
        let followedUsername;

        const { currentUser } = firebase.auth();

        // Get Username
        firebase.database().ref(`/users/${currentUser.uid}/`).once("value", (snapshot) => {
            this.setState({username: snapshot.child("username").val()});
        });

        // Get Partner Username
        let followedID;
        firebase.database().ref(`/follow/${currentUser.uid}/`).once("value", (snapshot) => {
            snapshot.forEach((child) => {
                followedID = child.key;
            })
        }).then( () => {
            firebase.database().ref(`/users/${followedID}/`).once("value", (snapshot) => {
                this.setState({followedUsername: snapshot.child("username").val()});
            }).then( () => {
                this._getMessages();
            })
        })
    }

    async _getMessages () {
        const { currentUser } = firebase.auth(); 
        let messages = [];
        
        // Get user messages
        firebase.database().ref(`/messages/${currentUser.uid}/`).orderByChild("date").on("value", (snapshot) => {
            snapshot.forEach((child) => { 
                messages.push({
                    key: child.key,
                    creator: this.state.username || "You",
                    image: child.child('image').val(),
                    date: child.child('date').val(),
                    title: child.child('title').val(),
                    description: child.child('description').val()
                })
            });
        });

        // Get followed user messages
        let followedID = null;
        firebase.database().ref(`/follow/${currentUser.uid}/`).once("value", (snapshot) => {
            snapshot.forEach((child) => {
                followedID = child.key;
            })
        }).then(() => {
            firebase.database().ref(`/messages/${followedID}/`).orderByChild("date").on("value", (snapshot) => {
                snapshot.forEach((child) => { 
                    messages.push({
                        key: child.key,
                        creator: this.state.followedUsername || "Partner",
                        image: child.child('image').val(),
                        date: child.child('date').val(),
                        title: child.child('title').val(),
                        description: child.child('description').val()
                    })
                });
                this.setState({searchItems: messages, searchResults: messages, loaded: true});
            });
        });

    };

    async componentDidMount () {
        await this._getUsernames();
    }

    _handleSearchChange (results) {
        this.setState({searchResults: results});
    }

    _renderBody () {
        if (this.state.loaded) {
            return (
                <Container>
                    <SearchBar onChange={(changes) => {this._handleSearchChange(changes)}} items={this.state.searchItems} show={this.state.showSearch}/>
                    <MessageList items={this.state.searchResults} />
                </Container>
            )
        } else {
            return (
                <Spinner />
            )
        }
    }

    render(){
        return (
            <Container>
                <MainHeader title="Messages">
                    <HeaderSide side={Sides.Right} icon="md-search" onPress={this._toggleSearchBar}/> 
                </MainHeader>
                {this._renderBody()}
            </Container>
        )
    }
}

export default Messages;