import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import BankItem from './BankItem';
import { BankData } from '../../../../Data/index';
import firebase from 'firebase';

export default class BankList extends Component {
    constructor (props) {
        super (props);

        this.state = {
            selectedBank: 1,
        }
    }

    async fetchBank () {
        const { currentUser } = firebase.auth(); 
        const userBankRef = firebase.database().ref(`/users/${currentUser.uid}/`);

        userBankRef.on("value", (snapshot) => {
            this.setState({selectedBank: snapshot.child("bank").val()})
        });
    }

    async componentDidMount () {
        await this.fetchBank();
    }

    _pressItem = (data) => {
        // Firebase connection
        let  { currentUser } = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/`)
        .update({bank: data.state.id})
        .then(() => {
            this.setState({selectedBank: data.state.id});
        })
    };

    _renderBankList () {
        return BankData.map((bank) => {

            return (<BankItem key={bank.key} selected={this.state.selectedBank === bank.key} id={bank.key} onPress={(data) => this._pressItem(data)} name={bank.name} />);
        });

    }

    render () {
        return (
            <View style={styles.container}>
                {this._renderBankList()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        padding: 10,
        margin: 5,
        backgroundColor: '#D0D0D0',
        borderColor: '#B2B2B2',
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
})