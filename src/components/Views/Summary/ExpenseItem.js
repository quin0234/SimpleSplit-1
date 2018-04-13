import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MainHeader, { HeaderSide } from '../../UI/Header/MainHeader';

class ExpenseItem extends Component {

  _onBack = () => {
    Actions.pop();
  }

  render() {
    return(
      <Container>
        <MainHeader title={this.props.title}>
          <HeaderSide title="Back" onPress={this._onBack} />
        </MainHeader>
        <Content>
      <Card style={{flex: 0}}>
      <CardItem>
        <Left>
        <Icon name="plane" />
          <Body>
            <Text>{this.props.title}</Text>
            <Text note>{this.props.amount}</Text>
            <Text note>{this.props.createdOn}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
      <Text>
            {this.props.des}
          </Text>
      </CardItem>
      <CardItem>
      <Body>
      <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/simplesplit-5d7ab.appspot.com/o/IMG_20180314_082225632.jpg?alt=media&token=72a8518d-9124-4e2b-a538-f2587d8f936d'}} style={{height: 200, width: 200, flex: 1}}/>
    </Body>
      </CardItem>
    </Card>
        </Content>
    </Container>
    );
  }
}

export default ExpenseItem;