import React, { Component } from 'react';
import { Text, Container, Header, Left, Button, Icon, Body, Right, Title, Content,  } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BankList from '../../../UI/Lists/Banks/BankList';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';


export default class ProfileBankSelector extends Component {
    constructor (props) {
        super (props);

    }

    _onBack = () => {
        Actions.pop();
    }

    render () {
        return (
            <Container>
                <MainHeader title="Select a Bank">
                    <HeaderSide icon="arrow-back" onPress={this._onBack} />
                </MainHeader>
               <Content>   
                <BankList />
                </Content> 
            </Container>
        )
    }
}
