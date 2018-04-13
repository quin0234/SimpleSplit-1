import React, { Component } from 'react';
import firebase from 'firebase';
import { StyleSheet, Slider } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Body, Title, Content, Text, Label, Input, Button, Icon, Left, Right, Item, Form } from 'native-base';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';

export default class ProfileUserSettings extends Component {
    constructor (props) {
        super (props);

        this.state = {
            displayName: "",
            salary: "",
            value: 50,
        }
    }

    _onBack = () => {
        Actions.pop();
    }

    async _fetchUserData () {
        const { currentUser } = firebase.auth(); 
        const userBankRef = firebase.database().ref(`/users/${currentUser.uid}/`);

        userBankRef.on("value", (snapshot) => {
            let displayName = currentUser.displayName
            let salary = snapshot.child("salary").val();

            let newState = {
                displayName: displayName,
                salary: salary,
            };

            this.setState(newState);
        });
    }

        _save = () => {
        let  { currentUser } = firebase.auth();
        let data = {displayName, } = this.state;


        firebase.database().ref(`/users/${currentUser.uid}/`)
        .update(data)
        .then(() => {

        })
    }

    _onChangeUsername (text) {
        this.setState({username: text})
    }

    _onChangeIncome (text) {
        this.setState({income: text})
    }

    async componentDidMount () {
        await this._fetchUserData();
    }

    _valueChanged(text) {
        this.setState({value: text});
    }

    render () {
        return (
            <Container>
                <MainHeader title="Select a Bank">
                    <HeaderSide icon="arrow-back" onPress={this._onBack} />
                </MainHeader>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(text) => {this._onChangeUsername(text)}} value={this.state.username}/>
                        </Item>
                        <Item floatingLabel last style={{marginBottom: 20}}>
                            <Label>Income</Label>
                            <Input onChangeText={(text) => {this._onChangeIncome(text)}} value={this.state.income} />
                        </Item>
                    </Form>
                    <Text style={{marginLeft: 10}}>Select a Bank</Text>
                    <Item style={{marginBottom: 20}}>
                        <Button  transparent style={{alignSelf:'center'}} onPress={() => {Actions.profileBanks()}}>
                            <Text> choose Bank</Text>
                        </Button>
                    </Item>
                    <Item style={{borderBottomWidth: 0}}>
                        <Text style={{marginLeft: 10, marginTop: 10}}>Set your share amount</Text>
                    </Item>
                    
                        <Slider value={this.state.value} onValueChange={(value) => {this.setState({value: value})}} step={1} maximumValue={100} style={{width: "100%"}}/>
                    
                    <Item style={{alignSelf:'center'}}>
                    <Text style={{alignSelf:'center'}}>{this.state.value}%</Text>
                    </Item>
                    <Item style={{alignSelf:'center', marginTop: 20}}>
                    <Button primary  onPress={this._save}>
                            <Text>Save</Text>
                        </Button>
                        </Item>
                </Content>
            </Container>
        )
    }
}
