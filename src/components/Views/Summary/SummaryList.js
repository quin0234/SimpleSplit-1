import React, { Component } from 'react';
import { FlatList } from "react-native";
import { TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Spinner, Button } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


class SummaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items || [],
    }
  }

  onRowPress(item) {
    Actions.expenseItem(item)
  }

  renderItem = ({item}) => {
    return (
      <ListItem
      onPress={() => {this.onRowPress(item)}}
      style={{width: '100%', 
      marginLeft: 0, 
      paddingLeft: 10, 
      paddingRight: 10, 
      marginRight: 0, 
      height: 80,
      borderBottomWidth: 1,
      padding: 10,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#7c6990',}}>
      <Left>
      <Icon name="md-radio-button-off" style={{color:"red"}} />
      </Left>
      <Body style={{
        paddingLeft: 0,
        borderBottomWidth: 0}}>
      <Text>{item.title}</Text>
        <Text note>Created by {item.createdBy}</Text>
      </Body>
      <Body style={{borderBottomWidth: 0}}>
      <Text style={{textAlign: 'right'}}>-35.00</Text>
      <Text note style={{textAlign: 'right'}}>total {item.amount}</Text>
      </Body>
      </ListItem>
    )
  }
  render(){
    if(this.state.items == null || this.state.items.length == 0){
      return(
        <Container padder>
          <Text style={{textAlign: "center", margin: 10}}>You have no expenses</Text>
          <Button block onPress={() => Actions.newexpenseModal()}>
            <Text>Create an Expense</Text>
          </Button>
        </Container>
      )
    }
    if (this.state.items != null){
      return (
        <FlatList
        data={this.state.items}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        />
          )
    }
    
  }
}

export default SummaryList;
