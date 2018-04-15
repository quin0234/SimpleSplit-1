import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Spinner, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, DeckSwiper, List, ListItem, } from 'native-base';
import SummaryAmount from './SummaryAmount';
import ExpenseList from '../../UI/Expenses/ExpenseList';
import MainHeader, { HeaderSide, Sides } from '../../UI/Header';
import SearchBar from '../../UI/Search/SearchBar';
import firebase from 'firebase';


class Summary extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showSearch: false,
            username: "You",
            followedUsername: "Partner",
            followedUID: 0,
            searchItems: [],
            searchResults: [],
            loaded: false,
        }
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
                this.setState({followedUsername: snapshot.child("username").val(), followedUID: followedID});
            }).then( () => {
                this._getExpenses();
            })
        })
    }

    async _getExpenses () {
        const { currentUser } = firebase.auth(); 
        let expenses = [];
        
        // Get user messages
        firebase.database().ref(`/expenses/${currentUser.uid}/`).orderByChild("date").on("value", (snapshot) => {
            snapshot.forEach((child) => { 
                expenses.push({
                    key: child.key,
                    creator: {
                        username: this.state.username || "You",
                        uid: currentUser.uid,
                    },
                    image: child.child('image').val(),
                    date: child.child('date').val(),
                    title: child.child('title').val(),
                    status: child.child('status').val(),
                    description: child.child('description').val(),
                    amount: child.child('amount').val(),
                    category: child.child('category').val(),
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
            firebase.database().ref(`/expenses/${followedID}/`).orderByChild("date").on("value", (snapshot) => {
                snapshot.forEach((child) => { 
                    expenses.push({
                        key: child.key,
                        creator: {
                            username: this.state.followedUsername || "You",
                            uid: followedID,
                        },
                        image: child.child('image').val(),
                        date: child.child('date').val(),
                        title: child.child('title').val(),
                        status: child.child('status').val(),
                        description: child.child('description').val(),
                        amount: child.child('amount').val(),
                        category: child.child('category').val(),
                    })
                });
                this.setState({searchItems: expenses, searchResults: expenses, loaded: true});
            });
        });
    };

    _handleSearchChange (results) {
        this.setState({searchResults: results});
    }

    _renderBody () {
        if (this.state.loaded) {
            return (
                <Content scrollEnabled={false}>
                    <SearchBar onChange={(changes) => {this._handleSearchChange(changes)}} items={this.state.searchItems} show={this.state.showSearch}/>
                    <SummaryAmount items={this.state.searchItems} partnerID={this.state.followedUID} />
                    <ExpenseList items={this.state.searchResults} />
                </Content>
            )
        } else {
            return (
                <Spinner />
            )
        }
    }

    _toggleSearchBar = () => {
        this.setState(previousState => {
            return { showSearch: !previousState.showSearch };
        });
    }

    async componentDidMount () {
        await this._getUsernames();
    }

    render(){
        return(
            <Container>
                <MainHeader title="Expenses">
                    <HeaderSide side={Sides.Right} icon="md-search" onPress={this._toggleSearchBar}/> 
                </MainHeader>
                <Content style={{backgroundColor:'#fff'}}>
                    {this._renderBody()}
                </Content>
            </Container>
        )
    }
}

export default Summary;