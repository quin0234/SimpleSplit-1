import React, { Component } from 'react';
import { Container, Content, Card, Header, Title, Text, List, ListItem, Body, Left, Right, Icon} from 'native-base';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';


class Memos extends Component {
    render(){
        return(
            <Container>
              <MainHeader title="Memos" />
            <Content>
            <Card>
            <List>
            <ListItem icon>
            <Left>
            <Icon name="md-play" />
          </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note>Its time to build a difference . .</Text>
            </Body>
            <Right>
            <Icon name="md-more" />
            </Right>
            </ListItem>
           </List>
           </Card>
            </Content>
            </Container>
        )
    }
}

export default Memos;