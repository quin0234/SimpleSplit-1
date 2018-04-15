import React, { Component} from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, CardItem, Body, Text, Button, Spinner, Container, Content } from 'native-base';
import firebase from 'firebase';
import { isNullOrUndefined } from 'util';


class SummaryAmount extends Component {
    constructor (props) {
        super (props);

        this.state = {
            expenses: this.props.items || [],
            partnerID: this.props.partnerID || null,
            partnerUsername: null,
            partnerSalary: null,
            partnerExpenses: null,
            currentUsername: null,
            currentSalary: null,
            currentExpenses: null,
            amountOwed: null,
            totalExpense: null,
            loaded: false,
            connected: this.props.partnerID ? true : false,
        }
    }

    _getUserInfo () {
        const { currentUser } = firebase.auth();
        let partnerUserInfo = {};
        let currentUserInfo = {};

        if (this.state.connected) {
            if (this.state.connected && this.state.partnerID != null) {
                firebase.database().ref(`/users/${this.state.partnerID}/`).on('value', (snapshot) => {
                    if (snapshot.hasChild("username")) {
                        partnerUserInfo.username = snapshot.child("username").val();
                    }

                    if (snapshot.hasChild("salary")) {
                        partnerUserInfo.salary = snapshot.child("salary").val();
                    }
                });
            }
        }

        firebase.database().ref(`/users/${currentUser.uid}/`).on('value', (snapshot) => {
            if (snapshot.hasChildren()) {
                if (snapshot.hasChild("username")) {
                    currentUserInfo.username = snapshot.child("username").val();
                }

                if (snapshot.hasChild("salary")) {
                    currentUserInfo.salary = snapshot.child("salary").val();
                }
            }

            if (this.state.connected) {
                this.setState({
                    currentUsername: isNullOrUndefined(currentUserInfo.username) ? "You" : currentUserInfo.username,
                    currentSalary: currentUserInfo.salary ? currentUserInfo.salary : 0,
                    partnerSalary: partnerUserInfo.salary ? partnerUserInfo.salary : 0,
                    partnerUsername: partnerUserInfo.username ? partnerUserInfo.username : "Partner",
                }, () => {
                    this._calculateExpenses();
                })
            } else {
                this.setState({
                    currentUsername: currentUserInfo.username ? currentUserInfo.username : "You",
                    currentSalary: currentUserInfo.salary ? currentUserInfo.salary : "Partner",
                }, () => {
                    this._calculateExpenses();
                })
            }
        });
    }

    async componentDidMount(){
        await this._getUserInfo();
    }

    _calculateExpenses () {
        if (this.state.expenses.length >= 0) { 
            let userExpenses = 0;
            let partnerExpenses = 0;
            let expenses = this.state.expenses;

            for (var i = 0; i < expenses.length; i++) {
                let currentExpense = expenses[i];
                if (currentExpense.amount != null && currentExpense.amount != "") {
                    if (currentExpense.creator.username == this.state.partnerUsername) { 
                        partnerExpenses += currentExpense.amount;
                    } else {
                        userExpenses += currentExpense.amount;
                    }
                }
            }

            let totalExpenses = userExpenses + partnerExpenses;
            this.setState({currentExpenses: userExpenses, partnerExpenses: partnerExpenses, totalExpense: totalExpenses, loaded: true}, () => {
                this.calculateSharing();
            });
        }
    }

    calculateSharing () {
        if (this.state.loaded && this.state.connected) {
            let userSalary = this.state.currentSalary || 0;
            let partnerSalary = this.state.partnerSalary || 0;

            let userSplitAmount = userSalary / (userSalary + partnerSalary);
            
            let totalExpenses = this.state.totalExpense || 0;
            
            let amountOwed = totalExpenses * userSplitAmount;

            if (this.state.amountOwed == null) {
                this.setState({
                    amountOwed: amountOwed,
                });
            }
        }
    }

    _makePayment = () => {
        Linking.openURL('scotiabank://*');
    }

    _renderPayButton () {
        return (
            <Button onPress={this._makePayment} transparent style={{alignSelf:'center', fontSize:'16'}}>
                <Text style={{color:'#239b97'}}>MAKE A PAYMENT</Text>
            </Button>
        )
    }

    renderSharing() {
        if (this.state.loaded) {
            
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{alignSelf:'center'}}>You owe </Text> 
                            <Text style={styles.amountOwed}>${isNaN(this.state.amountOwed) ? 0 : this.state.amountOwed}</Text>
                            <Text style={{alignSelf:'center'}}>Total Expenses  ${isNaN(this.state.totalExpense) ? 0 : this.state.totalExpense}</Text>
                            {this.state.amountOwed > 0 ? this._renderPayButton() : <View/>}
                        </Body>
                    </CardItem>
                </Card>
            )

        } else {
            return (
                <View/>
            )
        }
    }

    render() {

        if (this.state.totalExpense != null || this.state.totalExpense <= 0 || this.state.connected) {
            return (
                <Content padder scrollEnabled={false} style={{maxHeight: 200}}>
                    {this.renderSharing()}
                </Content>
            )
        } else {
            return (
                <Content scrollEnabled={false} />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        //height:200,
        //flex: 1,
        //flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    amountOwed:{

        fontSize: 25,
        color: '#4f3e62',
        alignSelf:'center'


    },
});

export default SummaryAmount;
