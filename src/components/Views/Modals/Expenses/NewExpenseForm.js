import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Text, Content, Card, Item, Title, Spinner, Input, Thumbnail, Label, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
// import Icon from 'react-native-vector-icons/FontAwesome';
import MainHeader, { HeaderSide } from '../../../UI/Header/MainHeader';
import BaseImage from '../../../UI/Image/BaseImage';

const options = [
    <Text style={{color:'#000'}}>None</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>ChildCare</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Health and Medical (Insured)</Text>,
    <Text style={{color:'#1485ff', fontSize: 16}}>Health and Medical (Uninsured)</Text>,
    <Text style={{color:'#1485ff', fontSize: 16}}>School</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>School (post-secondary)</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Birthday Gifts</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Electronics</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Clothing and Grooming</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Transportation</Text>, 
    <Text style={{color:'#1485ff', fontSize: 16}}>Other</Text>, 
  ]

  class NewExpenseForm extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: "",
            description: "",
            amount: 0,
            selected: null,
            image: this.props.image
        };
    }

    showActionSheet = () => {
        this.ActionSheet.show()
      }

      handlePressActionSheet = (buttonIndex) => {
        this.setState({ selected: buttonIndex })
      }

      
    onTitleChange(text){
        this.setState({title: text});
    }

    onAmountChange(text){
        let amount = parseInt(text, 10);
        if (amount === NaN) {
            this.setState({amount: 0});
        } else {
            this.setState({amount: amount});
        }
    }

    onDesChange(text){
        this.setState({description: text});
    }


    onNextPress = () => {
        let props = {title, description, amount, selected, image} = this.state;

        Actions.newexpensesum(props);
    }

    onCancelPress = () => {
        Actions.pop();
    }

        render(){
            return (
                <Container>
                    <MainHeader title="New Expense">
                        <Icon style={styles.backIcon} name="arrow-back" onPress={this.onCancelPress}> </Icon>
                        {/* <HeaderSide title="Back" name="arrow-back" /> */}
                        <HeaderSide title="Next" onPress={this.onNextPress}/>
                    </MainHeader>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20
            }}>
                <Content style={{ background: "#fff"}}>
                    <Card style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 350,
                        padding: 20
                    }}>
                    <Item floatingLabel> 
                    <Label>Expense Title</Label>
                    <Input
                        onChangeText={ (text) => this.onTitleChange(text) } 
                        value={this.state.title} />
                </Item>
                <Item floatingLabel>
                <Label>Total Amount</Label>
                <Input
                    onChangeText={ (text) => this.onAmountChange(text) } 
                    value={this.state.amount}
                    />
            </Item>
            <Item floatingLabel>
            <Label>Description</Label>
                <Input
                    multiline = {true}
                    numberOfLines={6}
                    maxLength = {155}
                    style={{height: 80, padding: 5}}
                    onChangeText={ (text) => this.onDesChange(text) } 
                    value={this.state.description}
                    />
            </Item>
            <Item style={{borderBottomWidth:0, marginBottom: 10}}>
                <BaseImage style={{width: 340, height: 340, marginTop: 10}} image={this.props.image}/>
            </Item>
            <Item style={{borderBottomWidth:0}}>
            <View style={styles.wrapper}>
            <Text>{options[this.state.selected] || ''}</Text>
            <Text style={styles.button} onPress={this.showActionSheet}>PICK A CATEGORY</Text>
            

            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={<Text style={{color: '#000', fontSize: 22}}>Category</Text>}
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              onPress={this.handlePressActionSheet}
              value={this.props.expenseCat}
            />

          </View>
            </Item>
           
            <Item>
                    
            </Item>
                    </Card>
                </Content>
                </View>
                </Container>
            )
        }
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   
    },
    labels:{

        color: '#b6b6b6',
        fontSize: 14,
        margin: 2

    },
    categoryLabel:{

        marginBottom: 0, 
        color:'#b4b4b4',
        // alignSelf: 'left'

    },
    button: {
    width:280,
    marginTop:10,
    // backgroundColor:'#7C6990',
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#7C6990',
    },
    backIcon:{
        color: "#fff",
        padding: 5

    }, 
  })
  

 export default NewExpenseForm;