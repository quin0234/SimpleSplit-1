import React, { Component } from 'React';
import { Container, Text } from 'native-base';
import FooterNav from './FooterNav';
import Expo from 'expo';
import firebase from 'firebase';

async function register() {
    // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
    let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server

    let currentUser = firebase.auth().currentUser
    firebase.database().ref(`/token/${currentUser.uid}/`).set({token: value});
}

class Main extends Component{
    componentWillMount(){
        register()
        this.listener = Expo.Notifications.addListener(this.handleNotification);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
      }
    
      handleNotification = ({ origin, data }) => {
        console.log(
          `Push notification ${origin} with data: ${JSON.stringify(data)}`,
        );
      };

    render(){
        return(
            <Container>
                <FooterNav/>
            </Container>
        )
    }
}

export default Main