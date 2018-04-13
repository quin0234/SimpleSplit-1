import React, { Component } from 'React';
import { Container, Text } from 'native-base';
import FooterNav from './FooterNav';

class Main extends Component{
    render(){
        return(
            <Container>
                <FooterNav/>
            </Container>
        )
    }
}

export default Main