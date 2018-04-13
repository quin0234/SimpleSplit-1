import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../../actions/index';
import { View, Image } from 'react-native';
import { Content, Card, Text, Item, Icon, Input, Button, Thumbnail, Footer, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }
    onButtonPress(){
        const {email, password} = this.props;
        this.props.loginUser({ email, password });
    }
    renderError(){
        if (this.props.error) {
            return(
                <Item>
                    <Text style={{fontSize: 20, alignSelf: 'center', color: 'red'}}>
                        {this.props.error}
                    </Text>
                </Item>
            );
        }
    }
    renderButton(){
        return (
            <Button 
                            style={{
                                width:280,
                                marginTop:20,
                                backgroundColor:'#7C6990'
                            }}
                            full 
                            onPress={this.onButtonPress.bind(this)}> 
                                <Text>Login</Text>
                            </Button>
        );
    }

    render(){
        return (
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
                    <Image
                    style={{width: 183, height: 110}}
                        source={require('../../../../assets/logo.png')}
                    />
                        <Item>
                            <Input
                                label="Email"
                                placeholder="Email"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                                />
                        </Item>
                        <Item>
                            <Input
                                label="Password"
                                placeholder="Password"
                                secureTextEntry
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}
                                />
                        </Item>
                        <Item>
                        {this.renderError()}
                        </Item>
                        <Item>
                        {this.renderButton()}
                            
                        </Item>
                        <Button style={{
                            width:280,
                            marginTop:20,
                        }}
                            transparent dark
                            onPress={Actions.forgottenPW}>
                        <Text>Forgot your password? Get Help</Text>
                        </Button>
                    </Card> 
                   
                </Content>
                <Footer style={{
                    backgroundColor: '#239B97',
                    borderColor: '#239B97'
                }}>
                <Item style={{
                    borderColor:'#239B97',
                    justifyContent:'center',
                    flex:1
                }}>
                <Button 
                transparent dark
                onPress={Actions.signUp}
                >
                    <Text>Don't have an account? Sign Up</Text>
                    </Button>
                    </Item>
                </Footer>
            </View>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    const {email, password, error, loading } = auth;
  
    return {email, password, error, loading};
  };
  export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);