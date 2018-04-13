import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { displayNameChanged, connectEmailChanged, bankNameChanged, salaryChanged, saveUser } from '../../../actions/index';
import { Content, Card, Text, Item, Icon, Input, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import BankList from '../../UI/Lists/Banks/BankList';


class CreateUserProfile extends Component {


    onDisplayNameChange(text){
        this.props.displayNameChanged(text)
    }
    onBankNameChange(text){
        this.props.bankNameChanged(text)
    }
    onSalaryChange(text){
        this.props.salaryChanged(text)
    }

    onButtonPress(){
        const { displayName, salary} = this.props;
        const bank = 0;
        this.props.saveUser({ displayName, bank, salary });
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
                <Text>Save Account</Text>
            </Button>
        );
    }


    render(){
        return (
            <View style={styles.mainContainer}>
                <Content>
                    <Card style={styles.mainCard}>
                        <Item>
                            <Input
                                label="DisplayName"
                                placeholder="First Name"
                                onChangeText={this.onDisplayNameChange.bind(this)}
                                value={this.props.displayName}
                                />
                        </Item>
                        <Item>
                            <BankList />
                        </Item>
                        <Item>
                            <Input
                                label="Gross Income"
                                placeholder="Gross Income"
                                onChangeText={this.onSalaryChange.bind(this)}
                                value={this.props.salary}
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

const styles = {
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
        backgroundColor: '#239B97'
    },
    mainCard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 600,
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
    },
}

const mapStateToProps = ({ auth }) => {
    const {displayName, bank, salary, error, loading } = auth;
  
    return {displayName, bank, salary, error, loading};
  };
  export default connect(mapStateToProps, {displayNameChanged, bankNameChanged, salaryChanged, saveUser })(CreateUserProfile);