import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Summary from './Views/Summary/Summary';
import Messages from './Views/Messages/Messages';
import Memos from './Views/Memos/Memos';
import Settings from './Views/Settings/Settings';

class FooterNav extends Component {

    constructor(){
        super()
        this.state = {
            page: "HomeScreen"

        }
    }

    render(){
        return(
          <View style={{
              flex: 1
          }}>
            {this.state.page === "HomeScreen" && <Summary navigation={this.props.navigation}></Summary>}
            {this.state.page === "MessageScreen" && <Messages navigation={this.props.navigation}></Messages>}
            {this.state.page === "MemosScreen" && <Memos navigation={this.props.navigation}></Memos>}
            {this.state.page === "Settings" && <Settings navigation={this.props.navigation}></Settings>}
    
            <Tabbar
             tabbarBgColor="#fff"
             iconColor="#7C6990"
             selectedIconColor="#4F3E62"
             type="button"
             rippleColor="#000000"
             tabbarBorderTopColor="#e4e4e4"
              stateFunc={(tab) => {
                this.setState({page: tab.page})
                //#643184 Purple
                //#18A298 Green
                //this.props.navigation.setParams({tabTitle: tab.title})
              }}
              activePage={this.state.page}
              tabs={[
                {
                  page: "HomeScreen",
                  icon: "md-pie",
                  iconColor: "#000000"
                },
                {
                  page: "MessageScreen",
                  icon: "ios-chatbubbles",
                },
                {
                  
                },
                {
                  page: "MemosScreen",
                  icon: "ios-mic",
                },
                {
                  page: "Settings",
                  icon: "ios-person",
                },
              ]}
            />
            <ActionButton buttonColor="rgba(35,155,151,100)" position="center" offsetY={20}>
          <ActionButton.Item buttonColor='#239B97' onPress={() => Actions.newexpenseModal()}>
            <Icon name="ios-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#239B97' onPress={() => Actions.newmemoModal()}>
            <Icon name="ios-mic" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#239B97' onPress={() => Actions.newMessage()}>
            <Icon name="ios-chatbubbles" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 24,
    height: 26,
    color: 'white',
  },
});

export default FooterNav;