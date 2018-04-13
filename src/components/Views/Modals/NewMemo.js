import React, { Component } from 'react';
import { Content, Text} from 'native-base';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';
import { Actions } from 'react-native-router-flux';

class NewMemo extends Component {

    _onBack = () => {
        Actions.pop();
    }

    render(){
        return(
            <Content>
                <MainHeader title="Memos">
                    <HeaderSide title="Back" onPress={this._onBack} />
                </MainHeader>
                <Text>
                    NewMemo Page
                </Text>
            </Content>
        )
    }
}

export default NewMemo;