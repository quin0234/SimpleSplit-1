import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Card, Text, Item, Icon, Input, Button, Spinner } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class NewConnection extends Component {

    state = { inviteCode: ''};
    onButtonPress(){
    const uid = firebase.auth().currentUser.uid;
        const updates = {};
        updates['/follow/' + uid + "/" + this.state.inviteCode] = true;
        return firebase.database().ref().set(updates);
        Actions.main();
    }
    renderButton(){
        return (
            <Button style={{
                width:280,
                marginTop:20,
                marginBottom:20,
                backgroundColor:'#7C6990'
            }}
            full
            onPress={this.onButtonPress.bind(this)}>
                <Text>Make Connection</Text>
            </Button>
        );
    }
   
    render(){
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 75,
                backgroundColor: '#239B97'
            }}>
                <Content>
                    <Card style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 300,
                        height: 400,
                        padding: 20,
                        borderWidth: 1,
                        borderRadius: 2,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 1,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10
                    }}>
                        <Item style={{
                            marginTop:20}}>
                            <Input
                                label="Invitation Code"
                                placeholder="Invitation Code"
                                onChangeText={inviteCode => this.setState({ inviteCode })}
                                value={this.props.inviteCode}
                                />
                        </Item>
                        <Item style={{
                            borderColor:"#ffffff"
                        }}>
                        {this.renderButton()}
                            
                            </Item>
                    </Card>
                </Content>
            </View>
        )
    }
}

export default NewConnection;