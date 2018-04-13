import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Content, Card, Item, Icon, Title, Spinner, Input, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Constants, Camera, FileSystem, Permissions } from 'expo';
import isIPhoneX from 'react-native-is-iphonex';
import MainHeader, { HeaderSide, Sides } from '../../../UI/Header/MainHeader';
import CameraCapture from '../../../UI/Camera/CameraCapture';

class NewExpense extends Component {
  constructor (props) {
    super (props);
    this.state = {
      image: "",
    };
  }

  _onPicture (data) {
    this.setState({image: data.base64});
    Actions.newexpenseform(this.state);
  }
  
  render() {
    return (
      <Container>
            <MainHeader title="Capture Image">
                <Icon name="close" style={{color:'#fff'}} onPress={() => {Actions.popTo("main")}}/>
                <HeaderSide title="Skip" onPress={Actions.newexpenseform} />
            </MainHeader>
            <CameraCapture onPicture={(data) => {this._onPicture(data)}}/>
        </Container> 
      );
  }     
}
  
      const styles = StyleSheet.create({

        closeIcon:{

            color: "#fff",
            padding: 5,

        },
       
      });
      
  
  export default NewExpense;